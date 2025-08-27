import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { ApprovalsService, ApprovalAction } from './approvals.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { UserRole } from '@entities/user.entity';
import { CreateApprovalWorkflowDto } from './dto/create-approval-workflow.dto';
import { CreateApprovalStepDto } from './dto/CreateApprovalStepDto.dto';
import { ApprovalRequest } from './dto/ApprovalRequest.dto';

@ApiTags('aprobaciones')
@Controller('approvals')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Get()
  getAll() { return ['item1','item2']; }

  @Post('start')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @ApiOperation({ summary: 'Iniciar proceso de aprobación' })
  @ApiResponse({ status: 201, description: 'Proceso de aprobación iniciado' })
  async startApproval(@Body() approvalRequest: ApprovalRequest, @Request() req) {
    return this.approvalsService.startApprovalProcess(approvalRequest, req.user);
  }

  @Patch(':id/process')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @ApiOperation({ summary: 'Procesar aprobación (aprobar/rechazar)' })
  @ApiResponse({ status: 200, description: 'Aprobación procesada' })
  async processApproval(
    @Param('id', ParseIntPipe) id: number,
    @Body() action: ApprovalAction,
    @Request() req,
  ) {
    return this.approvalsService.processApproval(id, action, req.user);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Obtener aprobaciones pendientes del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de aprobaciones pendientes' })
  async getPendingApprovals(@Request() req) {
    return this.approvalsService.getPendingApprovals(req.user);
  }

  @Get('document-version/:versionId/history')
  @ApiOperation({ summary: 'Obtener historial de aprobaciones de una versión' })
  @ApiResponse({ status: 200, description: 'Historial de aprobaciones' })
  async getApprovalHistory(@Param('versionId', ParseIntPipe) versionId: number) {
    return this.approvalsService.getDocumentApprovalHistory(versionId);
  }

  @Get('workflows')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener flujos de trabajo disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de flujos de trabajo' })
  async getWorkflows() {
    return this.approvalsService.getWorkflows();
  }

  @Post('workflows')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear nuevo flujo de trabajo' })
  @ApiResponse({ status: 201, description: 'Flujo de trabajo creado correctamente' })
  async createWorkflow(@Body() workflowData: CreateApprovalWorkflowDto) {
    return this.approvalsService.createWorkflow(workflowData);
  }

  @Post('workflows/:id/steps')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Agregar paso a flujo de trabajo' })
  @ApiResponse({ status: 201, description: 'Paso agregado al flujo' })
  async addWorkflowStep(@Param('id', ParseIntPipe) id: number, @Body() stepData: CreateApprovalStepDto) {
    return this.approvalsService.addStepToWorkflow(id, stepData);
  }
}
