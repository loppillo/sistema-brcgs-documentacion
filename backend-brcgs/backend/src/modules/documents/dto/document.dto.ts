import { IsString, IsEnum, IsOptional, IsNumber, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DocumentType, DocumentStatus } from '@entities/document.entity';
import { Transform } from 'class-transformer';
import { DocumentVersion } from '@/entities';

export class CreateDocumentDto {
  @ApiProperty({ description: 'Título del documento' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción del documento', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    enum: DocumentType, 
    description: 'Tipo de documento' 
  })
  @IsEnum(DocumentType)
  document_type: DocumentType;

  @ApiProperty({ description: 'ID de la categoría', required: false })
  @IsOptional()
  category_id?: number;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @ApiProperty({ 
    enum: DocumentStatus, 
    description: 'Estado del documento',
    required: false 
  })
  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;
}

export class UploadVersionDto {
  @ApiProperty({ description: 'Resumen de cambios en esta versión' })
  @IsString()
  change_summary: string;

  @ApiProperty({ 
    description: 'Si es una versión mayor (incrementa el número principal)',
    default: false 
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  is_major_version: boolean;
}

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción de la categoría', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class AddTagDto {
  @ApiProperty({ description: 'Etiqueta a agregar' })
  @IsString()
  tag: string;
}

export class SearchDocumentsDto {
  @ApiProperty({ description: 'Texto a buscar', required: false })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({ 
    enum: DocumentType, 
    description: 'Tipo de documento a filtrar',
    required: false 
  })
  @IsEnum(DocumentType)
  @IsOptional()
  type?: DocumentType;

  @ApiProperty({ description: 'ID de categoría a filtrar', required: false })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ 
    enum: DocumentStatus, 
    description: 'Estado a filtrar',
    required: false 
  })
  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;
}

export class DocumentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: DocumentType })
  document_type: DocumentType;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  current_version_id: number;

  @ApiProperty({ enum: DocumentStatus })
  status: DocumentStatus;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  category: any;

  @ApiProperty()
  current_version: any;

  @ApiProperty()
  created_by_user: any;

  @ApiProperty()
  tags: any[];
}

export class DocumentVersionResponseDto {
  file_path: string;
  constructor(entity: DocumentVersion) {
    this.id = entity.id;
    this.version_number = entity.version_number;
    this.file_name = entity.file_name;
    this.file_path = entity.file_path;
    this.status = entity.status;
    this.created_at = entity.created_at;
    // agrega más campos si es necesario
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  document_id: number;

  @ApiProperty()
  version_number: string;

  @ApiProperty()
  file_name: string;

  @ApiProperty()
  file_size: number;

  @ApiProperty()
  mime_type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  change_summary: string;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  approved_by: number;

  @ApiProperty()
  approved_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  created_by_user: any;

  @ApiProperty()
  approved_by_user: any;
  
}

export class PaginatedDocumentsDto {
  data: DocumentResponseDto[];
  total: number;
}