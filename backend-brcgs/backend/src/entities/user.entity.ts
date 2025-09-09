import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Document } from './document.entity';
import { DocumentVersion } from './document-version.entity';
import { Approval } from './approval.entity';
import { AuditLog } from './audit-log.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  @Exclude()
  password: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'editor', 'viewer'],
    default: 'viewer'
  })
  role: UserRole;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @OneToMany(() => Document, document => document.created_by_user)
  created_documents: Document[];

  @OneToMany(() => DocumentVersion, version => version.created_by_user)
  created_versions: DocumentVersion[];

  @OneToMany(() => DocumentVersion, version => version.approved_by_user)
  approved_versions: DocumentVersion[];

  @OneToMany(() => Approval, approval => approval.approver)
  approvals: Approval[];

  @OneToMany(() => AuditLog, log => log.user)
  audit_logs: AuditLog[];

  @Column({ type: 'json', nullable: true })
  permissions: Record<string, boolean>; 

  // Método para obtener el nombre completo
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
