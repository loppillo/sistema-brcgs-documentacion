import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ApprovalRequest {
  @ApiProperty({ example: 1, description: 'ID de la versión del documento' })
  @IsNumber()
  document_version_id: number;

  @ApiProperty({ example: 1, description: 'ID del flujo de aprobación' })
  @IsNumber()
  workflow_id: number;

  @ApiProperty({ example: 1, description: 'ID del aprobador' })
  @IsNumber()
  approverId: number;
}