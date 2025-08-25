import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Approval, ApprovalStatus } from '@entities/approval.entity';
import { ApprovalWorkflow } from '@entities/approval-workflow.entity';
import { ApprovalStep } from '@entities/approval-step.entity';
import { DocumentVersion, DocumentVersionStatus } from '@entities/document-version.entity';
import { User, UserRole } from '@entities/user.entity';
import { CreateApprovalStepDto } from './dto/CreateApprovalStepDto.dto';
import { ApprovalRequest } from './dto/ApprovalRequest.dto';



export interface ApprovalAction {
  status: ApprovalStatus;
  comments?: string;
}

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(Approval)
    private approvalsRepository: Repository<Approval>,
    @InjectRepository(ApprovalWorkflow)
    private workflowsRepository: Repository<ApprovalWorkflow>,
    @InjectRepository(ApprovalStep)
    private stepsRepository: Repository<ApprovalStep>,
    @InjectRepository(DocumentVersion)
    private versionsRepository: Repository<DocumentVersion>,
  ) {}

  // Iniciar proceso de aprobación
 async startApprovalProcess(
  approvalRequest: ApprovalRequest,
  user: User
): Promise<Approval[]> {
  // 1. Obtener versión del documento
  const version = await this.versionsRepository.findOne({
    where: { id: approvalRequest.document_version_id },
    relations: ['document'],
  });
  if (!version) {
    throw new NotFoundException('Versión de documento no encontrada');
  }

  // 2. Obtener workflow con pasos
  const workflow = await this.workflowsRepository.findOne({
    where: { id: approvalRequest.workflow_id },
    relations: ['steps'],
  });
  if (!workflow || !workflow.is_active) {
    throw new NotFoundException('Flujo de aprobación no encontrado o inactivo');
  }

  // 3. Verificar permisos del usuario
  if (![UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR].includes(user.role)) {
    throw new ForbiddenException(
      'No tienes permisos para iniciar procesos de aprobación'
    );
  }

  // 4. Ordenar pasos
  const sortedSteps = workflow.steps.sort((a, b) => a.step_order - b.step_order);
  if (sortedSteps.length === 0) {
    throw new BadRequestException('El workflow no tiene pasos definidos');
  }

  // 5. Crear aprobaciones
  const approvals = await Promise.all(
    sortedSteps.map(async (step) => {
      const approverId = step.required_user_id || this.getDefaultApproverByRole(step.required_role);
      if (!approverId) {
        throw new BadRequestException(
          `El paso "${step.step_name}" no tiene asignado un aprobador ni rol válido`
        );
      }

      const approval = this.approvalsRepository.create({
        document_version_id: approvalRequest.document_version_id,
        workflow_id: approvalRequest.workflow_id,
        step_id: step.id,
        approver_id: approverId,
        status: ApprovalStatus.PENDING,
      });

      return this.approvalsRepository.save(approval);
    })
  );

  // 6. Actualizar estado de la versión
  version.status = DocumentVersionStatus.PENDING_APPROVAL;
  await this.versionsRepository.save(version);

  return approvals;
}


  // Procesar aprobación
  async processApproval(approvalId: number, action: ApprovalAction, user: User): Promise<Approval> {
    const approval = await this.approvalsRepository.findOne({
      where: { id: approvalId },
      relations: ['step', 'workflow', 'document_version', 'document_version.document'],
    });

    if (!approval) {
      throw new NotFoundException('Aprobación no encontrada');
    }

    // Verificar que el usuario puede aprobar
    if (approval.approver_id !== user.id && !this.canUserApproveStep(user, approval.step)) {
      throw new ForbiddenException('No tienes permisos para procesar esta aprobación');
    }

    // Verificar que la aprobación está pendiente
    if (approval.status !== ApprovalStatus.PENDING) {
      throw new BadRequestException('Esta aprobación ya fue procesada');
    }

    // Actualizar la aprobación
    approval.status = action.status;
    approval.comments = action.comments;
    approval.approved_at = new Date();

    const updatedApproval = await this.approvalsRepository.save(approval);

    // Verificar si se completa el flujo de aprobación
    await this.checkWorkflowCompletion(approval.workflow_id, approval.document_version_id);

    return updatedApproval;
  }

  // Obtener aprobaciones pendientes para un usuario
  async getPendingApprovals(user: User): Promise<Approval[]> {
    const query = this.approvalsRepository.createQueryBuilder('approval')
      .leftJoinAndSelect('approval.step', 'step')
      .leftJoinAndSelect('approval.workflow', 'workflow')
      .leftJoinAndSelect('approval.document_version', 'document_version')
      .leftJoinAndSelect('document_version.document', 'document')
      .where('approval.status = :status', { status: ApprovalStatus.PENDING });

    // Filtrar por usuario específico o por rol
    if (user.role === UserRole.ADMIN) {
      // Los administradores pueden ver todas las aprobaciones pendientes
    } else {
      query.andWhere('(approval.approver_id = :userId OR step.required_role = :userRole)', {
        userId: user.id,
        userRole: user.role,
      });
    }

    return query.orderBy('approval.created_at', 'ASC').getMany();
  }

  // Obtener historial de aprobaciones de un documento
  async getDocumentApprovalHistory(documentVersionId: number): Promise<Approval[]> {
    return this.approvalsRepository.find({
      where: { document_version_id: documentVersionId },
      relations: ['step', 'workflow', 'approver'],
      order: { created_at: 'ASC' },
    });
  }

  // Gestión de flujos de trabajo
  async getWorkflows(): Promise<ApprovalWorkflow[]> {
    return this.workflowsRepository.find({
      where: { is_active: true },
      relations: ['steps'],
      order: { created_at: 'DESC' },
    });
  }

   async createWorkflow(workflowData: Partial<ApprovalWorkflow>): Promise<ApprovalWorkflow> {
    const workflow = this.workflowsRepository.create(workflowData);
    return this.workflowsRepository.save(workflow);
  }

async addStepToWorkflow(workflowId: number, dto: CreateApprovalStepDto): Promise<ApprovalStep> {
  const workflow = await this.workflowsRepository.findOne({ where: { id: workflowId }, relations: ['steps'] });
  if (!workflow) {
    throw new NotFoundException('Flujo de trabajo no encontrado');
  }

  const lastStep = workflow.steps?.reduce((max, s) => s.step_order > max ? s.step_order : max, 0) || 0;
  const nextOrder = lastStep + 1;

  const step = this.stepsRepository.create({
    ...dto,
    workflow_id: workflowId,
  
    // usa el enviado o calcula
  });

  return this.stepsRepository.save(step);
}


  // Métodos auxiliares privados
  private getDefaultApproverByRole(role: UserRole): number {
    // En una implementación real, esto buscaría usuarios apropiados por rol
    // Por ahora retornamos null para que sea asignado manualmente
    return null;
  }

  private canUserApproveStep(user: User, step: ApprovalStep): boolean {
    // Verificar si el usuario puede aprobar este paso basado en su rol
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (step.required_role && user.role === step.required_role) {
      return true;
    }

    if (step.required_user_id && user.id === step.required_user_id) {
      return true;
    }

    return false;
  }

  private async checkWorkflowCompletion(workflowId: number, documentVersionId: number): Promise<void> {
    const allApprovals = await this.approvalsRepository.find({
      where: {
        workflow_id: workflowId,
        document_version_id: documentVersionId,
      },
      relations: ['step'],
    });

    const pendingApprovals = allApprovals.filter(a => a.status === ApprovalStatus.PENDING);
    const rejectedApprovals = allApprovals.filter(a => a.status === ApprovalStatus.REJECTED);

    const version = await this.versionsRepository.findOne({
      where: { id: documentVersionId },
      relations: ['document'],
    });

    if (!version) return;

    // Si hay rechazos, marcar como rechazado
    if (rejectedApprovals.length > 0) {
      version.status = DocumentVersionStatus.REJECTED;
      await this.versionsRepository.save(version);
      return;
    }

    // Si no hay pendientes, el flujo está completo
    if (pendingApprovals.length === 0) {
      version.status = DocumentVersionStatus.APPROVED;
      version.approved_at = new Date();
      
      // Actualizar la versión actual del documento
      version.document.current_version_id = version.id;
      version.document.status = 'approved' as any;
      
      await this.versionsRepository.save(version);
    }
  }
}
