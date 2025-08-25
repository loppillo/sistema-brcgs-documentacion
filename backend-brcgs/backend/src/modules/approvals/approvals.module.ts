import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalsController } from './approvals.controller';
import { ApprovalsService } from './approvals.service';
import { Approval } from '@entities/approval.entity';
import { ApprovalWorkflow } from '@entities/approval-workflow.entity';
import { ApprovalStep } from '@entities/approval-step.entity';
import { DocumentVersion } from '@entities/document-version.entity';

@Module({
  imports: [
     TypeOrmModule.forFeature([ApprovalWorkflow]),
    TypeOrmModule.forFeature([
      Approval,
      ApprovalStep,
      DocumentVersion,
    ]),
  ],
  controllers: [ApprovalsController],
  providers: [ApprovalsService],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}
