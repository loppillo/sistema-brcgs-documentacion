import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ApprovalWorkflow } from './approval-workflow.entity';
import { User } from './user.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Entity('approval_steps')
export class ApprovalStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  step_order: number;

  @Column()
  step_name: string;

  @Column({
    type: 'enum',
    enum: UserRole, // enum de TypeScript
    nullable: true, // permite NULL
  })
  required_role?: UserRole;

  @Column({ default: false })
  is_parallel: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => ApprovalWorkflow, (workflow) => workflow.steps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow: ApprovalWorkflow;

  @Column()
  workflow_id: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'approval_step_approvers', // tabla pivote
    joinColumn: { name: 'step_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  approvers: User[];
}
