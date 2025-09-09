import { UserRole } from '@/entities/user.entity';
import { IsString, IsArray, ArrayNotEmpty, IsInt, IsOptional, IsEnum } from 'class-validator';


export class CreateApprovalStepDto {
  @IsString()
  step_name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsOptional()
  approvers?: number[];

  @IsEnum(UserRole)
  @IsOptional()
  role_required?: UserRole;
}