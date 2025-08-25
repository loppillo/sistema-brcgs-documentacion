import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Document } from './document.entity';
import { User } from './user.entity';
import { Approval } from './approval.entity';

export enum DocumentVersionStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('document_versions')
@Index(['document_id', 'version_number'], { unique: true })
export class DocumentVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_id: number;

  @Column({ length: 20 })
  version_number: string;

  @Column({ length: 255 })
  file_name: string;

  @Column({ length: 500 })
  file_path: string;

  @Column('bigint')
  file_size: number;

  @Column({ length: 100 })
  mime_type: string;

  @Column({ length: 64, nullable: true })
  checksum: string;

  @Column({
    type: 'enum',
    enum: ['draft', 'pending_approval', 'approved', 'rejected'],
    default: 'draft'
  })
  status: DocumentVersionStatus;

  @Column('text', { nullable: true })
  change_summary: string;

  @Column()
  created_by: number;

  @Column({ nullable: true })
  approved_by: number;

  @Column({ nullable: true })
  approved_at: Date;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => Document, document => document.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @ManyToOne(() => User, user => user.created_versions)
  @JoinColumn({ name: 'created_by' })
  created_by_user: User;

  @ManyToOne(() => User, user => user.approved_versions)
  @JoinColumn({ name: 'approved_by' })
  approved_by_user: User;

  @OneToMany(() => Approval, approval => approval.document_version)
  approvals: Approval[];
}
