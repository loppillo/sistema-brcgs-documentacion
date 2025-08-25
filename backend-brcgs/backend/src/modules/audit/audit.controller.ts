import { Controller, Get, Query, Param, UseGuards, ParseIntPipe, ParseEnumPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { AuditService } from './audit.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { UserRole } from '@entities/user.entity';
import { EntityType } from '@entities/audit-log.entity';

@ApiTags('auditoría')
@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener registros de auditoría' })
  @ApiResponse({ status: 200, description: 'Lista de registros de auditoría' })
  @ApiQuery({ name: 'entityType', enum: EntityType, required: false })
  @ApiQuery({ name: 'entityId', type: 'number', required: false })
  @ApiQuery({ name: 'userId', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Límite de resultados (default: 100)' })
  @ApiQuery({ name: 'offset', type: 'number', required: false, description: 'Offset para paginación (default: 0)' })
  async findAll(
    @Query('entityType') entityType?: EntityType,
    @Query('entityId', new ParseIntPipe({ optional: true })) entityId?: number,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    return this.auditService.findAll(
      entityType,
      entityId,
      userId,
      limit || 100,
      offset || 0,
    );
  }

  @Get('entity/:entityType/:entityId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener auditoría de una entidad específica' })
  @ApiResponse({ status: 200, description: 'Historial de auditoría de la entidad' })
  async findByEntity(
    @Param('entityType', new ParseEnumPipe(EntityType)) entityType: EntityType,
    @Param('entityId', ParseIntPipe) entityId: number,
  ) {
    return this.auditService.findByEntity(entityType, entityId);
  }

  @Get('user/:userId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener actividad de un usuario' })
  @ApiResponse({ status: 200, description: 'Actividad del usuario' })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Límite de resultados (default: 50)' })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.auditService.findByUser(userId, limit || 50);
  }
}
