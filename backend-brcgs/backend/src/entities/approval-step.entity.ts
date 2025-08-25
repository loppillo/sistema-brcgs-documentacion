import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApprovalWorkflow } from './approval-workflow.entity';
import { User, UserRole } from './user.entity';

@Entity('approval_steps')
export class ApprovalStep {
  @PrimaryGeneratedColumn()
  id: number;


@Column({ default: 1 })
  step_order: number;

  @Column({ length: 100 })
  step_name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'editor', 'viewer'],
    default: 'viewer'
  })
  required_role: UserRole;

  @Column({ nullable: true })
  required_user_id: number;

  @Column({ default: false })
  is_parallel: boolean;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => ApprovalWorkflow, workflow => workflow.steps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow: ApprovalWorkflow;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'required_user_id' })
  required_user: User;

  @Column()
workflow_id: number;
}
