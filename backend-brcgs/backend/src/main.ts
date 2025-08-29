import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as express from 'express';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurar CORS
app.enableCors({ origin: true, credentials: true });

  // Configurar prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

MulterModule.register({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max per file
});
app.use(express.json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));


  // Configurar Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión Documental')
    .setDescription('API para la gestión de documentos, versiones y aprobaciones')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
const port = configService.get<number>('PORT', 4000);
await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  
}

bootstrap();
