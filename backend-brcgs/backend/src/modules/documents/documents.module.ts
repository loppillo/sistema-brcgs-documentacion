import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Document } from '@entities/document.entity';
import { DocumentVersion } from '@entities/document-version.entity';
import { DocumentCategory } from '@entities/document-category.entity';
import { DocumentPermission } from '@entities/document-permission.entity';
import { DocumentTag } from '@entities/document-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Document,
      DocumentVersion,
      DocumentCategory,
      DocumentPermission,
      DocumentTag,
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get('UPLOAD_PATH', './uploads'),
          filename: (req, file, callback) => {
            const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
        limits: {
          fileSize: configService.get('MAX_FILE_SIZE', 10485760), // 10MB por defecto
        },
        fileFilter: (req, file, callback) => {
          const allowedTypes = configService.get('ALLOWED_FILE_TYPES', 'pdf,doc,docx,txt,xlsx,xls').split(',');
          const fileExtension = extname(file.originalname).toLowerCase().slice(1);
          
          if (allowedTypes.includes(fileExtension)) {
            callback(null, true);
          } else {
            callback(new Error(`Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`), false);
          }
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
