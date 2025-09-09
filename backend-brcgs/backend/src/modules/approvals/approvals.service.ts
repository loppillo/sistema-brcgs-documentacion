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
    @InjectRepository(User)
    private userRepository: Repository<User>,
  


  ) {}

  // Iniciar proceso de aprobación
async startApprovalProcess(approvalRequest: ApprovalRequest, user: User) {
  const { document_version_id, workflow_id } = approvalRequest;

  const workflow = await this.workflowsRepository.findOne({
    where: { id: workflow_id },
    relations: ['steps', 'steps.approvers'],
  });

  if (!workflow) {
    throw new BadRequestException(`Workflow con ID ${workflow_id} no existe`);
  }

  const firstStep = workflow.steps.find(s => s.step_order === 1);

  if (!firstStep) {
    throw new BadRequestException(`El workflow no tiene pasos configurados`);
  }

  // ✅ Verificar si tiene aprobadores directos
  let approver: User | null = firstStep.approvers?.[0] ?? null;

  // ✅ Si no hay aprobadores pero tiene rol requerido → buscar uno
  if (!approver && firstStep.required_role) {
    approver = await this.getDefaultApproverByRole(firstStep.required_role);
  }

  // ✅ Si tampoco hay → error
  if (!approver) {
    throw new BadRequestException(
      `El paso "${firstStep.step_name}" no tiene asignado un aprobador ni rol válido`,
    );
  }

  // ✅ Crear registro en Approval
  const approval = this.approvalsRepository.create({
    document_version_id,
    workflow_id,
    step: firstStep,
    approver_id: approver.id,
    status: ApprovalStatus.PENDING, // 👈 clave
    created_at: new Date(),
  });

  await this.approvalsRepository.save(approval);

  return {
    message: 'Proceso de aprobación iniciado correctamente',
    workflow_id,
    document_version_id,
    assigned_approver: approver.username,
    current_step: firstStep.step_name,
  };
}




  // Procesar aprobación
async processApproval(id: number, approve: boolean, user: User): Promise<Approval> {
  const approval = await this.approvalsRepository.findOne({ 
    where: { id },
    relations: ['approver']  // Para que se pueda devolver el usuario
  });

  if (!approval) {
    throw new NotFoundException(`No se encontró la aprobación con ID ${id}`);
  }

  // Actualizar estado y fecha
  approval.status = approve ? ApprovalStatus.APPROVED : ApprovalStatus.REJECTED;
  approval.approved_at = new Date();

  // Registrar quién hizo la aprobación
  approval.approver = user;

  // Guardar cambios
  return this.approvalsRepository.save(approval);
}



  // Obtener aprobaciones pendientes para un usuario
 async getPendingApprovals(user: User): Promise<Approval[]> {
  const query = this.approvalsRepository.createQueryBuilder('approval')
    .leftJoinAndSelect('approval.step', 'step')
    .leftJoinAndSelect('approval.workflow', 'workflow')
    .leftJoinAndSelect('approval.document_version', 'document_version')
    .leftJoinAndSelect('document_version.document', 'document')
    .leftJoinAndSelect('approval.approver', 'approver') // 👈 aquí unimos con User
    .where('approval.status = :status', { status: ApprovalStatus.PENDING });

  if (user.role !== UserRole.ADMIN) {
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
    relations: ['step', 'workflow', 'approver', 'document_version', 'document_version.document'],
    order: { created_at: 'ASC' }
  });
  }

  // Gestión de flujos de trabajo
async getWorkflows(): Promise<ApprovalWorkflow[]> {
  return this.workflowsRepository.find({
    where: { is_active: true },
    relations: ['steps', 'steps.approvers'], // <-- incluimos los approvers
    order: { created_at: 'DESC' },
  });
}

   async createWorkflow(workflowData: Partial<ApprovalWorkflow>): Promise<ApprovalWorkflow> {
    const workflow = this.workflowsRepository.create(workflowData);
    return this.workflowsRepository.save(workflow);
  }

async addStepToWorkflow(workflowId: number, stepData: CreateApprovalStepDto) {
  if ((!stepData.approvers || stepData.approvers.length === 0) && !stepData.role_required) {
    throw new BadRequestException(
      `El paso "${stepData.step_name}" no tiene asignado un aprobador ni rol válido`,
    );
  }

  const workflow = await this.workflowsRepository.findOne({ where: { id: workflowId } });
  if (!workflow) throw new NotFoundException('Workflow no encontrado');

  // Convertir IDs de usuarios en entidades User
  const approvers: User[] = stepData.approvers
    ? await this.userRepository.findByIds(stepData.approvers)
    : [];

  const lastStepOrder =
    (await this.stepsRepository.find({ where: { workflow_id: workflowId } }))
      .reduce((max, s) => (s.step_order > max ? s.step_order : max), 0) || 0;

  const step = this.stepsRepository.create({
    step_name: stepData.step_name,
    step_order: lastStepOrder + 1,
    required_role: stepData.role_required,
    workflow,
    workflow_id: workflow.id,
    approvers,
  });

  return this.stepsRepository.save(step);
}




  // Métodos auxiliares privados
private async getDefaultApproverByRole(role: UserRole): Promise<User | null> {
  return this.userRepository.findOne({
    where: { role, is_active: true },
  });
}

  private canUserApproveStep(user: User, step: ApprovalStep): boolean {
    // Verificar si el usuario puede aprobar este paso basado en su rol
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (step.required_role && user.role === step.required_role) {
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

async getHistoryByDocument(documentId: number): Promise<Approval[]> {
  return this.approvalsRepository.find({
    where: { 
      document_version: { document: { id: documentId } }
    },
    relations: [
      'workflow',
      'step',
      'approver',
      'document_version',
      'document_version.document',
    ],
    order: { created_at: 'ASC' }, // historial cronológico
  });
}


}
