import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { DocumentsModule } from '@modules/documents/documents.module';
import { ApprovalsModule } from '@modules/approvals/approvals.module';
import { AuditModule } from '@modules/audit/audit.module';

import { 
  User, Document, DocumentVersion, DocumentCategory, DocumentTag, 
  DocumentPermission, ApprovalWorkflow, ApprovalStep, Approval, AuditLog 
} from './entities';

@Module({
  imports: [
    // Configuración
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
 ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // ruta absoluta a carpeta uploads
      serveRoot: '/uploads', // ruta base para acceder por URL
    }),
    // Base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User, Document, DocumentVersion, DocumentCategory, DocumentTag,
          DocumentPermission, ApprovalWorkflow, ApprovalStep, Approval, AuditLog
        ],
        synchronize: true, // Cambiar a false en producción y usar migraciones
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    // Servir archivos estáticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // Módulos de funcionalidad
    AuthModule,
    UsersModule,
    DocumentsModule,
    ApprovalsModule,
    AuditModule,
  ],
})
export class AppModule {}
