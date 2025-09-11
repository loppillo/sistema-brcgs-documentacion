import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  Request,
  Req,
  Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';

import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { User, UserRole } from '@entities/user.entity';

import {
  CreateDocumentDto,
  UpdateDocumentDto,
  UploadVersionDto,
  CreateCategoryDto,
  AddTagDto,
  SearchDocumentsDto,
  DocumentResponseDto,
  DocumentVersionResponseDto,
  PaginatedDocumentsDto,
} from './dto/document.dto';

interface AuthRequest extends Request {
  user: User; // agregamos la propiedad user
}


import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { DocumentVersion } from '@/entities';

@ApiTags('documentos')
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }


@Get('view/:filename')
@Header('Content-Type', 'application/pdf')
@Header('Content-Disposition', 'inline')
getPdf(@Param('filename') filename: string, @Res() res: Response) {
  const filePath = path.join(__dirname, '/uploads/', filename); // ajusta ruta
  const fileStream = createReadStream(filePath);
  fileStream.pipe(res);
}


@Post()
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads/documents', // ruta donde guardar
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    }
  }),
}))
@ApiOperation({ summary: 'Crear un documento con archivo adjunto' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      document_type: { type: 'string', enum: ['POE'] }, // según tu enum
      category_id: { type: 'number' },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() createDocumentDto: CreateDocumentDto,
  @Request() req
) {
  return this.documentsService.create(createDocumentDto, file, req.user);
}

@Get()
@ApiOperation({ summary: 'Obtener todos los documentos con paginación' })
@ApiQuery({ name: 'page', required: false, type: Number })
@ApiQuery({ name: 'limit', required: false, type: Number })
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Request() req
): Promise<{ data: DocumentResponseDto[]; total: number }> {
  return this.documentsService.findAll(req.user, page, limit);
}

  @Get('search')
  @ApiOperation({ summary: 'Buscar documentos' })
  @ApiResponse({ status: 200, description: 'Resultados de búsqueda', type: [DocumentResponseDto] })
  async search(@Query() searchDto: SearchDocumentsDto, @Request() req): Promise<DocumentResponseDto[]> {
    return this.documentsService.searchDocuments(
      searchDto.query,
      searchDto.type,
      searchDto.categoryId,
      searchDto.status,
      req.user,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener documento por ID' })
  @ApiResponse({ status: 200, description: 'Documento encontrado', type: DocumentResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<DocumentResponseDto> {
    return this.documentsService.findOne(id, req.user);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @ApiOperation({ summary: 'Actualizar documento' })
  @ApiResponse({ status: 200, description: 'Documento actualizado', type: DocumentResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @Request() req,
  ): Promise<DocumentResponseDto> {
    return this.documentsService.update(id, updateDocumentDto, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Eliminar documento' })
  @ApiResponse({ status: 200, description: 'Documento eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<{ message: string }> {
    await this.documentsService.remove(id, req.user);
    return { message: 'Documento eliminado exitosamente' };
  }

  // Versiones de documentos


@Post(':id/versions')
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Subir nueva versión del documento',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        change_summary: {
          type: 'string',
        },
        is_major_version: {
          type: 'boolean',
        },
      },
      required: ['file', 'change_summary', 'is_major_version'],
    },
  })
  @ApiOperation({ summary: 'Subir nueva versión del documento' })
  @ApiResponse({ status: 201, description: 'Versión subida exitosamente' })
  async uploadVersion(
  @Param('id', ParseIntPipe) id: number,
  @UploadedFile() file: Express.Multer.File,
  @Body('change_summary') changeSummary: string,
  @Body('is_major_version') isMajorVersion: boolean,
  @Request() req,
) {
  if (!file) {
    throw new Error('No file uploaded');
  }

  // Llama a tu servicio para crear la versión
  const newVersion = await this.documentsService.createDocumentVersion(
    id,
    file,
    changeSummary,
    isMajorVersion,
    req.user,
  );

  return {
    message: 'Versión subida exitosamente',
    data: newVersion,
  };
}



  @ApiOperation({ summary: 'Obtener versiones de un documento' })
  @ApiResponse({ status: 200, description: 'Lista de versiones', type: [DocumentVersionResponseDto] })
@Get(':id/versions')
async getVersions(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<any> {
  return this.documentsService.getDocumentVersions(id, req.user);
}

  @Get('versions/:versionId/download')
  @ApiOperation({ summary: 'Descargar versión de documento' })
  async downloadVersion(
    @Param('versionId', ParseIntPipe) versionId: number,
    @Res() res: Response,
    @Request() req,
  ): Promise<void> {
    const { filePath, fileName } = await this.documentsService.downloadVersion(versionId, req.user);

    const fileStream = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    fileStream.pipe(res);
  }

  // Categorías
  @Get('categories/all')
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  async getCategories() {
    return this.documentsService.getCategories();
  }

  @Post('categories')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Crear nueva categoría' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.documentsService.createCategory(createCategoryDto.name, createCategoryDto.description);
  }

  // Etiquetas
  @Post(':id/tags')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @ApiOperation({ summary: 'Agregar etiqueta a documento' })
  async addTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() addTagDto: AddTagDto,
    @Request() req,
  ) {
    return this.documentsService.addTag(id, addTagDto.tag, req.user);
  }

  @Delete(':id/tags/:tagId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR)
  @ApiOperation({ summary: 'Remover etiqueta de documento' })
  async removeTag(
    @Param('id', ParseIntPipe) id: number,
    @Param('tagId', ParseIntPipe) tagId: number,
    @Request() req,
  ): Promise<{ message: string }> {
    await this.documentsService.removeTag(id, tagId, req.user);
    return { message: 'Etiqueta removida exitosamente' };
  }

  // Permisos
  @Get(':id/permissions')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener permisos de documento' })
  async getPermissions(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.documentsService.getDocumentPermissions(id, req.user);
  }
 //Permisos crear
  @Post(':id/permissions')
async createPermission(
  @Param('id') id: number,
  @Body() body: any,
  @Req() req
) {
  return this.documentsService.createPermission(+id, body, req.user);
}

  @Get('permissions/me')
getMyPermissions(@Req() req: AuthRequest) {
  const user = req.user;
  return this.documentsService.getUserPermissions(user.id);
}

  // 🔹 Opcional: permisos de un documento específico
@Get(':documentId/permissions')
getDocumentPermissions(
  @Param('documentId', ParseIntPipe) documentId: number,
  @Req() req: any, // req.user viene del JWT guard
) {
  return this.documentsService.getDocumentPermissions(documentId, req.user);
}


}
