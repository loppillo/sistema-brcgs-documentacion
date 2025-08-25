import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { DocumentType } from './document.entity';
import { ApprovalStep } from './approval-step.entity';


@Entity('approval_workflows')
export class ApprovalWorkflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['POE', 'policy', 'manual', 'instruction', 'other'],
    nullable: true
  })
  document_type: DocumentType;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @OneToMany(() => ApprovalStep, step => step.workflow)
  steps: ApprovalStep[];
}
