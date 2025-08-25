import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum EntityType {
  DOCUMENT = 'document',
  DOCUMENT_VERSION = 'document_version',
  APPROVAL = 'approval',
  USER = 'user',
}

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  REJECT = 'reject',
  DOWNLOAD = 'download',
}

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['user', 'document', 'document_version', 'approval', 'approval_workflow']
  })
  entity_type: EntityType;

  @Column()
  entity_id: number;

  @Column({
    type: 'enum',
    enum: ['create', 'update', 'delete', 'view', 'download', 'approve', 'reject']
  })
  action: AuditAction;

  @Column('json', { nullable: true })
  old_values: any;

  @Column('json', { nullable: true })
  new_values: any;

  @Column()
  user_id: number;

  @Column({ length: 45, nullable: true })
  ip_address: string;

  @Column('text', { nullable: true })
  user_agent: string;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => User, user => user.audit_logs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
