import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from './document.entity';
import { User, UserRole } from './user.entity';

export enum PermissionType {
  READ = 'read',
  WRITE = 'write',
  APPROVE = 'approve',
  ADMIN = 'admin',
  EDIT = "EDIT",
}

@Entity('document_permissions')
export class DocumentPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'editor', 'viewer'],
    nullable: true
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: ['read', 'write', 'delete', 'approve']
  })
  permission_type: PermissionType;

  @Column()
  granted_by: number;

  @CreateDateColumn()
  granted_at: Date;

  @Column({ nullable: true })
  expires_at: Date;

  // Relaciones
  @ManyToOne(() => Document, document => document.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'granted_by' })
  granted_by_user: User;
}
