import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentVersion } from './document-version.entity';
import { ApprovalWorkflow } from './approval-workflow.entity';
import { ApprovalStep } from './approval-step.entity';
import { User } from './user.entity';

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELEGATED = 'delegated',
}

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_version_id: number;

  @Column()
  workflow_id: number;

  @Column()
  step_id: number;

  @Column()
  approver_id: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'delegated'],
    default: 'pending'
  })
  status: ApprovalStatus;

  @Column('text', { nullable: true })
  comments: string;

  @Column({ nullable: true })
  approved_at: Date;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => DocumentVersion, version => version.approvals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_version_id' })
  document_version: DocumentVersion;

  @ManyToOne(() => ApprovalWorkflow)
  @JoinColumn({ name: 'workflow_id' })
  workflow: ApprovalWorkflow;

  @ManyToOne(() => ApprovalStep)
  @JoinColumn({ name: 'step_id' })
  step: ApprovalStep;

  @ManyToOne(() => User, user => user.approvals)
  @JoinColumn({ name: 'approver_id' })
  approver: User;
}
