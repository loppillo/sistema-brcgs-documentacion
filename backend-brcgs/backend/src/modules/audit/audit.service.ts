import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog, EntityType, AuditAction } from '@entities/audit-log.entity';
import { User } from '@entities/user.entity';

export interface CreateAuditLogData {
  entity_type: EntityType;
  entity_id: number;
  action: AuditAction;
  old_values?: any;
  new_values?: any;
  user_id: number;
  ip_address?: string;
  user_agent?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
  ) {}

  async createLog(data: CreateAuditLogData): Promise<AuditLog> {
    const auditLog = this.auditRepository.create(data);
    return this.auditRepository.save(auditLog);
  }

  async findAll(
    entityType?: EntityType,
    entityId?: number,
    userId?: number,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const query = this.auditRepository.createQueryBuilder('audit')
      .leftJoinAndSelect('audit.user', 'user')
      .orderBy('audit.created_at', 'DESC');

    if (entityType) {
      query.andWhere('audit.entity_type = :entityType', { entityType });
    }

    if (entityId) {
      query.andWhere('audit.entity_id = :entityId', { entityId });
    }

    if (userId) {
      query.andWhere('audit.user_id = :userId', { userId });
    }

    const [logs, total] = await query
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return { logs, total };
  }

  async findByEntity(entityType: EntityType, entityId: number): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: {
        entity_type: entityType,
        entity_id: entityId,
      },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async findByUser(userId: number, limit: number = 50): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: { user_id: userId },
      relations: ['user'],
      order: { created_at: 'DESC' },
      take: limit,
    });
  }

  // Métodos de conveniencia para crear logs específicos
  async logDocumentCreate(documentId: number, documentData: any, user: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.DOCUMENT,
      entity_id: documentId,
      action: AuditAction.CREATE,
      new_values: documentData,
      user_id: user.id,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }

  async logDocumentUpdate(documentId: number, oldData: any, newData: any, user: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.DOCUMENT,
      entity_id: documentId,
      action: AuditAction.UPDATE,
      old_values: oldData,
      new_values: newData,
      user_id: user.id,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }

  async logDocumentDelete(documentId: number, documentData: any, user: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.DOCUMENT,
      entity_id: documentId,
      action: AuditAction.DELETE,
      old_values: documentData,
      user_id: user.id,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }

  async logDocumentDownload(documentId: number, user: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.DOCUMENT,
      entity_id: documentId,
      action: AuditAction.DOWNLOAD,
      user_id: user.id,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }

  async logApproval(approvalId: number, action: AuditAction, data: any, user: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.APPROVAL,
      entity_id: approvalId,
      action,
      new_values: data,
      user_id: user.id,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }

  async logUserAction(userId: number, action: AuditAction, oldData?: any, newData?: any, actionUser?: User, req?: any): Promise<void> {
    await this.createLog({
      entity_type: EntityType.USER,
      entity_id: userId,
      action,
      old_values: oldData,
      new_values: newData,
      user_id: actionUser?.id || userId,
      ip_address: req?.ip,
      user_agent: req?.get('User-Agent'),
    });
  }
}
