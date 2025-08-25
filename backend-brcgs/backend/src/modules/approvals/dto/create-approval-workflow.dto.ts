import { IsString, IsOptional, IsBoolean, IsEnum, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DocumentType {
  POE = 'POE',
  POLICY = 'policy',
  MANUAL = 'manual',
  INSTRUCTION = 'instruction',
  OTHER = 'other'
}

export class CreateApprovalWorkflowDto {
  @ApiProperty({ example: 'Flujo de aprobación para POE', description: 'Nombre del flujo de trabajo' })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({ example: 'Revisión completa de documentos POE', description: 'Descripción del flujo de trabajo', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: DocumentType, required: false, description: 'Tipo de documento asociado' })
  @IsOptional()
  @IsEnum(DocumentType)
  document_type?: DocumentType;

  @ApiProperty({ example: true, description: 'Define si el flujo está activo' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
