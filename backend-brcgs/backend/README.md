# Sistema de Gestión Documental - Backend

Este es el backend del Sistema de Gestión Documental desarrollado con NestJS, TypeORM y MySQL.

## Características

- **Gestión de Documentos**: Subida, versionado y control de documentos (POE, políticas, manuales, instructivos)
- **Sistema de Aprobaciones**: Flujos de trabajo configurables para aprobación de documentos
- **Control de Acceso**: Sistema basado en roles (Admin, Manager, Editor, Viewer)
- **Auditoría**: Registro completo de todas las acciones del sistema
- **Versionado**: Control de versiones automático con metadatos
- **Permisos Granulares**: Control de acceso a nivel de documento

## Requisitos Previos

- Node.js 18+
- MySQL 8.0+
- npm o yarn

## Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
Copiar `.env.example` a `.env` y configurar:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=gestion_documental

JWT_SECRET=tu-secret-jwt-muy-seguro
JWT_EXPIRES_IN=24h

UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,xlsx,xls

PORT=3000
CORS_ORIGIN=http://localhost:4200
```

3. **Configurar base de datos**:
```bash
# Crear la base de datos ejecutando el archivo SQL
mysql -u root -p < ../database/schema.sql
```

4. **Crear directorio de uploads**:
```bash
mkdir uploads
```

## Ejecutar la aplicación

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/v1/users` - Listar usuarios
- `POST /api/v1/users` - Crear usuario
- `GET /api/v1/users/:id` - Obtener usuario
- `PATCH /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Documentos
- `GET /api/v1/documents` - Listar documentos
- `POST /api/v1/documents` - Crear documento
- `GET /api/v1/documents/:id` - Obtener documento
- `PATCH /api/v1/documents/:id` - Actualizar documento
- `DELETE /api/v1/documents/:id` - Eliminar documento
- `POST /api/v1/documents/:id/versions` - Subir nueva versión
- `GET /api/v1/documents/:id/versions` - Listar versiones
- `GET /api/v1/documents/versions/:versionId/download` - Descargar versión

### Aprobaciones
- `POST /api/v1/approvals/start` - Iniciar proceso de aprobación
- `PATCH /api/v1/approvals/:id/process` - Procesar aprobación
- `GET /api/v1/approvals/pending` - Aprobaciones pendientes
- `GET /api/v1/approvals/workflows` - Flujos de trabajo

### Auditoría
- `GET /api/v1/audit` - Registros de auditoría
- `GET /api/v1/audit/entity/:type/:id` - Auditoría de entidad
- `GET /api/v1/audit/user/:userId` - Actividad de usuario

## Documentación de la API

La documentación Swagger está disponible en:
```
http://localhost:3000/api/docs
```

## Estructura del Proyecto

```
src/
├── entities/                 # Entidades de TypeORM
│   ├── user.entity.ts
│   ├── document.entity.ts
│   ├── document-version.entity.ts
│   ├── approval.entity.ts
│   └── ...
├── modules/                  # Módulos de funcionalidad
│   ├── auth/                # Autenticación y autorización
│   ├── users/               # Gestión de usuarios
│   ├── documents/           # Gestión de documentos
│   ├── approvals/           # Sistema de aprobaciones
│   └── audit/               # Auditoría
├── app.module.ts            # Módulo principal
└── main.ts                  # Punto de entrada
```

## Roles y Permisos

### Admin
- Acceso completo a todas las funcionalidades
- Gestión de usuarios y configuración del sistema
- Configuración de flujos de aprobación

### Manager
- Gestión de documentos de su área
- Aprobación de documentos según flujos configurados
- Visualización de reportes y auditoría

### Editor
- Creación y edición de documentos
- Subida de nuevas versiones
- Inicio de procesos de aprobación

### Viewer
- Solo lectura de documentos aprobados
- Descarga de documentos con permisos

## Flujos de Aprobación

El sistema soporta flujos de aprobación configurables:

1. **Creación del flujo**: Define pasos secuenciales
2. **Asignación de roles**: Cada paso requiere un rol específico
3. **Procesamiento**: Los aprobadores procesan secuencialmente
4. **Finalización**: Documento se marca como aprobado/rechazado

## Versionado de Documentos

- **Versiones menores**: 1.1, 1.2, 1.3...
- **Versiones mayores**: 2.0, 3.0, 4.0...
- **Metadatos**: Checksum, tamaño, tipo MIME, resumen de cambios
- **Histórico**: Todas las versiones se mantienen

## Auditoría

El sistema registra automáticamente:
- Creación, modificación y eliminación de documentos
- Procesos de aprobación
- Descargas de documentos
- Cambios de usuario
- Información de IP y User-Agent

## Comandos Útiles

```bash
# Desarrollo
npm run start:dev          # Modo desarrollo con hot reload
npm run start:debug        # Modo debug

# Testing
npm run test              # Tests unitarios
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Coverage

# Producción
npm run build            # Compilar para producción
npm run start:prod       # Ejecutar en producción

# Linting
npm run lint             # Verificar código
npm run format           # Formatear código
```

## Configuración de Desarrollo

Para desarrollo local, asegúrate de:

1. Tener MySQL corriendo
2. Crear la base de datos con el schema proporcionado
3. Configurar las variables de entorno
4. Crear el directorio `uploads`

## Seguridad

- **JWT**: Tokens seguros para autenticación
- **Bcrypt**: Hash seguro de contraseñas
- **Validación**: Validación de entrada con class-validator
- **CORS**: Configuración de CORS para frontend
- **File Upload**: Validación de tipos y tamaños de archivo

## Contribución

1. Fork el repositorio
2. Crear una rama feature
3. Commit cambios
4. Push a la rama
5. Crear Pull Request

## Soporte

Para soporte técnico o preguntas sobre el sistema, contactar al equipo de desarrollo.
