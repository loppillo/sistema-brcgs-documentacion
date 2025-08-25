import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export class CreateApprovalStepDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Nombre del paso de aprobación

  @IsString()
  @IsOptional()
  description?: string; // Descripción opcional

  @IsNumber()
  @IsNotEmpty()
  order: number; // Orden del paso (1, 2, 3...)

  @IsEnum(['admin', 'editor', 'revisor', 'lector'])
  roleRequired: 'admin' | 'editor' | 'revisor' | 'lector'; // Rol requerido para aprobar

  @IsBoolean()
  @IsOptional()
  autoApprove?: boolean; // Si se aprueba automáticamente
}
