import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { DocumentCategory } from './document-category.entity';
import { DocumentVersion } from './document-version.entity';
import { DocumentPermission } from './document-permission.entity';
import { DocumentTag } from './document-tag.entity';

export enum DocumentType {
  POE = 'POE',
  POLICY = 'policy',
  MANUAL = 'manual',
  INSTRUCTION = 'instruction',
  OTHER = 'other',
}

export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['POE', 'policy', 'manual', 'instruction', 'other'],
    default: 'other'
  })
  document_type: DocumentType;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  current_version_id: number;

  @Column({
    type: 'enum',
    enum: ['draft', 'pending_approval', 'approved', 'rejected', 'archived'],
    default: 'draft'
  })
  status: DocumentStatus;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relaciones
  @ManyToOne(() => DocumentCategory, category => category.documents)
  @JoinColumn({ name: 'category_id' })
  category: DocumentCategory;

  @ManyToOne(() => User, user => user.created_documents)
  @JoinColumn({ name: 'created_by' })
  created_by_user: User;

  @OneToMany(() => DocumentVersion, version => version.document)
  versions: DocumentVersion[];

  @ManyToOne(() => DocumentVersion)
  @JoinColumn({ name: 'current_version_id' })
  current_version: DocumentVersion;

  @OneToMany(() => DocumentPermission, permission => permission.document)
  permissions: DocumentPermission[];

  @OneToMany(() => DocumentTag, tag => tag.document)
  tags: DocumentTag[];

  @Column({ nullable: true })
 file_path: string;
}
