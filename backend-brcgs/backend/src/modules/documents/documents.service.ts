import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { createHash } from 'crypto';


import { Document, DocumentStatus, DocumentType } from '@entities/document.entity';
import { DocumentVersion, DocumentVersionStatus } from '@entities/document-version.entity';
import { DocumentCategory } from '@entities/document-category.entity';
import { DocumentPermission, PermissionType } from '@entities/document-permission.entity';
import { DocumentTag } from '@entities/document-tag.entity';
import { User, UserRole } from '@entities/user.entity';
import * as fs from 'node:fs/promises';
import * as path from 'path';
import { CreateDocumentDto, DocumentVersionResponseDto, UpdateDocumentDto, UploadVersionDto } from './dto/document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
    @InjectRepository(DocumentVersion)
    private versionsRepository: Repository<DocumentVersion>,
    @InjectRepository(DocumentCategory)
    private categoriesRepository: Repository<DocumentCategory>,
    @InjectRepository(DocumentPermission)
    private permissionsRepository: Repository<DocumentPermission>,
    @InjectRepository(DocumentTag)
    private tagsRepository: Repository<DocumentTag>,
  ) {}

  // Documentos principales
async findAll(user: User, page = 1, limit = 10): Promise<{ data: Document[]; total: number }> {
  const query = this.documentsRepository.createQueryBuilder('document')
    .leftJoinAndSelect('document.category', 'category')
    .leftJoinAndSelect('document.current_version', 'current_version')
    .leftJoinAndSelect('document.created_by_user', 'created_by_user')
    .leftJoinAndSelect('document.tags', 'tags')
    .orderBy('document.updated_at', 'DESC');

  // Filtros de permisos
  if (user.role === UserRole.VIEWER || user.role === UserRole.EDITOR) {
    query.leftJoin('document.permissions', 'permission')
      .where('document.created_by = :userId', { userId: user.id })
      .orWhere('permission.user_id = :userId', { userId: user.id })
      .orWhere('permission.role = :userRole', { userRole: user.role })
      .orWhere('document.status = :approvedStatus', { approvedStatus: DocumentStatus.APPROVED });
  }

  // Agregar paginación
  const [data, total] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return { data, total };
}



  async findOne(id: number, user: User): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ['category', 'current_version', 'created_by_user', 'versions', 'tags', 'permissions'],
    });

    if (!document) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    // Verificar permisos
    await this.checkDocumentPermission(document, user, PermissionType.READ);

    return document;
  }

  async create(createDocumentDto: CreateDocumentDto,file: Express.Multer.File, user: User): Promise<Document> {
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      created_by: user.id,
      file_path: file.filename,
      status: DocumentStatus.DRAFT,
    });

    const savedDocument = await this.documentsRepository.save(document);

    // Crear permiso de administrador para el creador
   

    return this.findOne(savedDocument.id, user);
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto, user: User): Promise<Document> {
    const document = await this.findOne(id, user);
    
    // Verificar permisos de escritura
    await this.checkDocumentPermission(document, user, PermissionType.WRITE);

    Object.assign(document, updateDocumentDto);
    await this.documentsRepository.save(document);

    return this.findOne(id, user);
  }

  async remove(id: number, user: User): Promise<void> {
    const document = await this.findOne(id, user);
    
    // Solo administradores o el creador pueden eliminar
    if (user.role !== UserRole.ADMIN && document.created_by !== user.id) {
      throw new ForbiddenException('No tienes permisos para eliminar este documento');
    }

    await this.documentsRepository.remove(document);
  }

  // Versiones de documentos
  async uploadVersion(
    documentId: number,
    uploadVersionDto: UploadVersionDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<DocumentVersion> {
    const document = await this.findOne(documentId, user);
    
    // Verificar permisos de escritura
    await this.checkDocumentPermission(document, user, PermissionType.WRITE);

    // Calcular checksum del archivo
    const fileBuffer = await fs.readFile(file.path);
    const checksum = createHash('sha256').update(fileBuffer).digest('hex');

    // Generar número de versión
    const lastVersion = await this.versionsRepository.findOne({
      where: { document_id: documentId },
      order: { created_at: 'DESC' },
    });

    let versionNumber = '1.0';
    if (lastVersion) {
      const [major, minor] = lastVersion.version_number.split('.').map(Number);
      versionNumber = uploadVersionDto.is_major_version ? `${major + 1}.0` : `${major}.${minor + 1}`;
    }

    const version = this.versionsRepository.create({
      document_id: documentId,
      version_number: versionNumber,
      file_name: file.originalname,
      file_path: file.path,
      file_size: file.size,
      mime_type: file.mimetype,
      checksum,
      change_summary: uploadVersionDto.change_summary,
      created_by: user.id,
      status: DocumentVersionStatus.DRAFT,
    });

    const savedVersion = await this.versionsRepository.save(version);

    // Actualizar la versión actual del documento si es aprobada
    if (savedVersion.status === DocumentVersionStatus.APPROVED) {
      document.current_version_id = savedVersion.id;
      await this.documentsRepository.save(document);
    }

    return savedVersion;
  }

async getDocumentVersions(documentId: number, user: User): Promise<DocumentVersionResponseDto[]> {
  // 1. Buscar el documento para validar existencia y permisos
  const document = await this.documentsRepository.findOne({ where: { id: documentId } });
  if (!document) {
    throw new NotFoundException(`Documento con ID ${documentId} no encontrado`);
  }

  // 2. Validar permisos del usuario para leer el documento
  await this.checkDocumentPermission(document, user, PermissionType.READ);

  // 3. Obtener las versiones ordenadas por fecha de creación descendente
  const versions = await this.versionsRepository.find({
    where: { document_id: documentId },
    order: { created_at: 'DESC' },
  });

  if (!versions.length) {
    console.warn(`No hay versiones para el documento ID ${documentId}`);
    return [];
  }

  console.log(`Se encontraron ${versions.length} versiones para el documento ID ${documentId}`);

  // 4. Mapear las versiones a DTOs
  return versions.map((version) => new DocumentVersionResponseDto(version));
}



  async downloadVersion(versionId: number, user: User): Promise<{ filePath: string; fileName: string }> {
    const version = await this.versionsRepository.findOne({
      where: { id: versionId },
      relations: ['document'],
    });

    if (!version) {
      throw new NotFoundException(`Versión con ID ${versionId} no encontrada`);
    }

    // Verificar permisos de lectura del documento
    await this.checkDocumentPermission(version.document, user, PermissionType.READ);

    return {
      filePath: version.file_path,
      fileName: version.file_name,
    };
  }

  // Categorías
  async getCategories(): Promise<DocumentCategory[]> {
    return this.categoriesRepository.find();
  }

  async createCategory(name: string, description?: string): Promise<DocumentCategory> {
    const category = this.categoriesRepository.create({ name, description });
    return this.categoriesRepository.save(category);
  }

  // Etiquetas
  async addTag(documentId: number, tag: string, user: User): Promise<DocumentTag> {
    const document = await this.findOne(documentId, user);
    
    // Verificar permisos de escritura
    await this.checkDocumentPermission(document, user, PermissionType.WRITE);

    const documentTag = this.tagsRepository.create({
      document_id: documentId,
      tag: tag.toLowerCase(),
    });

    return this.tagsRepository.save(documentTag);
  }

  async removeTag(documentId: number, tagId: number, user: User): Promise<void> {
    const document = await this.findOne(documentId, user);
    
    // Verificar permisos de escritura
    await this.checkDocumentPermission(document, user, PermissionType.WRITE);

    await this.tagsRepository.delete({ id: tagId, document_id: documentId });
  }

  // Permisos
  async createPermission(
    documentId: number,
    userId: number | null,
    role: UserRole | null,
    permissionType: PermissionType,
    grantedBy: number,
  ): Promise<DocumentPermission> {
    const permission = this.permissionsRepository.create({
      document_id: documentId,
      user_id: userId,
      role,
      permission_type: permissionType,
      granted_by: grantedBy,
    });

    return this.permissionsRepository.save(permission);
  }

  async getDocumentPermissions(documentId: number, user: User): Promise<DocumentPermission[]> {
    const document = await this.findOne(documentId, user);
    
    // Solo admins y managers pueden ver permisos
    if (![UserRole.ADMIN, UserRole.MANAGER].includes(user.role) && document.created_by !== user.id) {
      throw new ForbiddenException('No tienes permisos para ver los permisos de este documento');
    }

    return this.permissionsRepository.find({
      where: { document_id: documentId },
      relations: ['user', 'granted_by_user'],
    });
  }

  // Búsqueda y filtros
  async searchDocuments(
    query: string,
    type?: DocumentType,
    categoryId?: number,
    status?: DocumentStatus,
    user?: User,
  ): Promise<Document[]> {
    const queryBuilder = this.documentsRepository.createQueryBuilder('document')
      .leftJoinAndSelect('document.category', 'category')
      .leftJoinAndSelect('document.current_version', 'current_version')
      .leftJoinAndSelect('document.created_by_user', 'created_by_user')
      .leftJoinAndSelect('document.tags', 'tags');

    // Búsqueda por texto
    if (query) {
      queryBuilder.where('document.title LIKE :query OR document.description LIKE :query', {
        query: `%${query}%`,
      });
    }

    // Filtros
    if (type) {
      queryBuilder.andWhere('document.document_type = :type', { type });
    }

    if (categoryId) {
      queryBuilder.andWhere('document.category_id = :categoryId', { categoryId });
    }

    if (status) {
      queryBuilder.andWhere('document.status = :status', { status });
    }

    // Aplicar filtros de permisos si se proporciona usuario
    if (user) {
      if (user.role === UserRole.VIEWER || user.role === UserRole.EDITOR) {
        queryBuilder.leftJoin('document.permissions', 'permission')
          .andWhere('(document.created_by = :userId OR permission.user_id = :userId OR permission.role = :userRole OR document.status = :approvedStatus)', {
            userId: user.id,
            userRole: user.role,
            approvedStatus: DocumentStatus.APPROVED,
          });
      }
    }

    return queryBuilder.orderBy('document.updated_at', 'DESC').getMany();
  }

  // Métodos auxiliares
  private async checkDocumentPermission(
    document: Document,
    user: User,
    requiredPermission: PermissionType,
  ): Promise<void> {
   if (user.role === UserRole.ADMIN) {
  console.log('Acceso total: usuario ADMIN');
  return;
}

if (document.created_by === user.id) {
  console.log('Acceso total: creador del documento');
  return;
}

console.log('Buscando permiso en BD para:', { documentId: document.id, userId: user.id, role: user.role, requiredPermission });

const permission = await this.permissionsRepository
  .createQueryBuilder('perm')
  .where('perm.document_id = :docId', { docId: document.id })
  .andWhere(new Brackets(qb => {
    qb.where('(perm.user_id = :userId AND perm.permission_type = :permType)')
      .orWhere('(perm.role = :role AND perm.permission_type = :permType)')
      .orWhere('(perm.user_id = :userId AND perm.permission_type = :adminPerm)')
      .orWhere('(perm.role = :role AND perm.permission_type = :adminPerm)');
  }))
  .setParameters({
    userId: user.id,
    role: user.role,
    permType: requiredPermission,
    adminPerm: PermissionType.ADMIN,
  })
  .getOne();

console.log('Resultado permiso:', permission);

if (requiredPermission === PermissionType.READ && document.status === DocumentStatus.APPROVED) {
  console.log('Permiso implícito para lectura en documento aprobado');
  return;
}

if (!permission) {
  console.log('Permiso denegado');
  throw new ForbiddenException('No tienes permisos para realizar esta acción en este documento');
}

   
  }

async createDocumentVersion(
  documentId: number,
  file: Express.Multer.File,
  changeSummary: string,
  isMajorVersion: boolean,
  user: User,
): Promise<DocumentVersion> {
  const document = await this.documentsRepository.findOne({ where: { id: documentId } });
  if (!document) throw new NotFoundException('Documento no encontrado');

  await this.checkDocumentPermission(document, user, PermissionType.EDIT);

  const uploadDir = path.join(__dirname, '..', 'uploads', 'documents', String(documentId));
  await fs.mkdir(uploadDir, { recursive: true });

  // Nueva ruta donde quieres dejar el archivo
  const fileName = `${Date.now()}-${file.originalname}`;
  const newFilePath = path.join(uploadDir, fileName);

  // Mover archivo desde file.path a newFilePath
  await fs.rename(file.path, newFilePath);

  const newVersion = this.versionsRepository.create({
    document_id: documentId,
    version_number: await this.getNextVersionNumber(documentId, isMajorVersion),
    file_name: file.originalname,
    file_path: path.join('uploads', 'documents', String(documentId), fileName),
    file_size: file.size,
    mime_type: file.mimetype,
    change_summary: changeSummary,
    status: DocumentVersionStatus.PENDING_APPROVAL,
    created_by: user.id,
  });

  await this.versionsRepository.save(newVersion);

  return newVersion;
}

  
async getNextVersionNumber(documentId: number, isMajorVersion: boolean): Promise<string> {
  const lastVersion = await this.versionsRepository.findOne({
    where: { document_id: documentId },
    order: { created_at: 'DESC' },
  });

  if (!lastVersion) {
    return '1.0';
  }

  const [majorStr, minorStr] = lastVersion.version_number.split('.');
  let major = parseInt(majorStr, 10);
  let minor = parseInt(minorStr ?? '0', 10);

  if (isMajorVersion) {
    major++;
    minor = 0;
  } else {
    minor++;
  }

  return `${major}.${minor}`;
}




}
