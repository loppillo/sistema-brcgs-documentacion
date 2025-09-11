/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const path_1 = __webpack_require__(/*! path */ "path");
const auth_module_1 = __webpack_require__(/*! @modules/auth/auth.module */ "./src/modules/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! @modules/users/users.module */ "./src/modules/users/users.module.ts");
const documents_module_1 = __webpack_require__(/*! @modules/documents/documents.module */ "./src/modules/documents/documents.module.ts");
const approvals_module_1 = __webpack_require__(/*! @modules/approvals/approvals.module */ "./src/modules/approvals/approvals.module.ts");
const audit_module_1 = __webpack_require__(/*! @modules/audit/audit.module */ "./src/modules/audit/audit.module.ts");
const entities_1 = __webpack_require__(/*! ./entities */ "./src/entities/index.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [
                        entities_1.User, entities_1.Document, entities_1.DocumentVersion, entities_1.DocumentCategory, entities_1.DocumentTag,
                        entities_1.DocumentPermission, entities_1.ApprovalWorkflow, entities_1.ApprovalStep, entities_1.Approval, entities_1.AuditLog
                    ],
                    synchronize: true,
                    logging: true,
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            documents_module_1.DocumentsModule,
            approvals_module_1.ApprovalsModule,
            audit_module_1.AuditModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/entities/approval-step.entity.ts":
/*!**********************************************!*\
  !*** ./src/entities/approval-step.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalStep = exports.UserRole = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const approval_workflow_entity_1 = __webpack_require__(/*! ./approval-workflow.entity */ "./src/entities/approval-workflow.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["EDITOR"] = "editor";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
let ApprovalStep = class ApprovalStep {
};
exports.ApprovalStep = ApprovalStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ApprovalStep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], ApprovalStep.prototype, "step_order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalStep.prototype, "step_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        nullable: true,
    }),
    __metadata("design:type", String)
], ApprovalStep.prototype, "required_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ApprovalStep.prototype, "is_parallel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ApprovalStep.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_workflow_entity_1.ApprovalWorkflow, (workflow) => workflow.steps, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'workflow_id' }),
    __metadata("design:type", typeof (_b = typeof approval_workflow_entity_1.ApprovalWorkflow !== "undefined" && approval_workflow_entity_1.ApprovalWorkflow) === "function" ? _b : Object)
], ApprovalStep.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApprovalStep.prototype, "workflow_id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User),
    (0, typeorm_1.JoinTable)({
        name: 'approval_step_approvers',
        joinColumn: { name: 'step_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], ApprovalStep.prototype, "approvers", void 0);
exports.ApprovalStep = ApprovalStep = __decorate([
    (0, typeorm_1.Entity)('approval_steps')
], ApprovalStep);


/***/ }),

/***/ "./src/entities/approval-workflow.entity.ts":
/*!**************************************************!*\
  !*** ./src/entities/approval-workflow.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalWorkflow = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
const approval_step_entity_1 = __webpack_require__(/*! ./approval-step.entity */ "./src/entities/approval-step.entity.ts");
let ApprovalWorkflow = class ApprovalWorkflow {
};
exports.ApprovalWorkflow = ApprovalWorkflow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ApprovalWorkflow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], ApprovalWorkflow.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ApprovalWorkflow.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['POE', 'policy', 'manual', 'instruction', 'other'],
        nullable: true
    }),
    __metadata("design:type", typeof (_a = typeof document_entity_1.DocumentType !== "undefined" && document_entity_1.DocumentType) === "function" ? _a : Object)
], ApprovalWorkflow.prototype, "document_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ApprovalWorkflow.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ApprovalWorkflow.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_entity_1.ApprovalStep, step => step.workflow),
    __metadata("design:type", Array)
], ApprovalWorkflow.prototype, "steps", void 0);
exports.ApprovalWorkflow = ApprovalWorkflow = __decorate([
    (0, typeorm_1.Entity)('approval_workflows')
], ApprovalWorkflow);


/***/ }),

/***/ "./src/entities/approval.entity.ts":
/*!*****************************************!*\
  !*** ./src/entities/approval.entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Approval = exports.ApprovalStatus = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_version_entity_1 = __webpack_require__(/*! ./document-version.entity */ "./src/entities/document-version.entity.ts");
const approval_workflow_entity_1 = __webpack_require__(/*! ./approval-workflow.entity */ "./src/entities/approval-workflow.entity.ts");
const approval_step_entity_1 = __webpack_require__(/*! ./approval-step.entity */ "./src/entities/approval-step.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
    ApprovalStatus["DELEGATED"] = "delegated";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
let Approval = class Approval {
};
exports.Approval = Approval;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Approval.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Approval.prototype, "document_version_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Approval.prototype, "workflow_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Approval.prototype, "step_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Approval.prototype, "approver_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected', 'delegated'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Approval.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Approval.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Approval.prototype, "approved_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Approval.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_version_entity_1.DocumentVersion, version => version.approvals, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'document_version_id' }),
    __metadata("design:type", typeof (_c = typeof document_version_entity_1.DocumentVersion !== "undefined" && document_version_entity_1.DocumentVersion) === "function" ? _c : Object)
], Approval.prototype, "document_version", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_workflow_entity_1.ApprovalWorkflow),
    (0, typeorm_1.JoinColumn)({ name: 'workflow_id' }),
    __metadata("design:type", typeof (_d = typeof approval_workflow_entity_1.ApprovalWorkflow !== "undefined" && approval_workflow_entity_1.ApprovalWorkflow) === "function" ? _d : Object)
], Approval.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => approval_step_entity_1.ApprovalStep),
    (0, typeorm_1.JoinColumn)({ name: 'step_id' }),
    __metadata("design:type", typeof (_e = typeof approval_step_entity_1.ApprovalStep !== "undefined" && approval_step_entity_1.ApprovalStep) === "function" ? _e : Object)
], Approval.prototype, "step", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.approvals),
    (0, typeorm_1.JoinColumn)({ name: 'approver_id' }),
    __metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], Approval.prototype, "approver", void 0);
exports.Approval = Approval = __decorate([
    (0, typeorm_1.Entity)('approvals')
], Approval);


/***/ }),

/***/ "./src/entities/audit-log.entity.ts":
/*!******************************************!*\
  !*** ./src/entities/audit-log.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = exports.AuditAction = exports.EntityType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
var EntityType;
(function (EntityType) {
    EntityType["DOCUMENT"] = "document";
    EntityType["DOCUMENT_VERSION"] = "document_version";
    EntityType["APPROVAL"] = "approval";
    EntityType["USER"] = "user";
})(EntityType || (exports.EntityType = EntityType = {}));
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "create";
    AuditAction["UPDATE"] = "update";
    AuditAction["DELETE"] = "delete";
    AuditAction["APPROVE"] = "approve";
    AuditAction["REJECT"] = "reject";
    AuditAction["DOWNLOAD"] = "download";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
let AuditLog = class AuditLog {
};
exports.AuditLog = AuditLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AuditLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['user', 'document', 'document_version', 'approval', 'approval_workflow']
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuditLog.prototype, "entity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['create', 'update', 'delete', 'view', 'download', 'approve', 'reject']
    }),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "old_values", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "new_values", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AuditLog.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "ip_address", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AuditLog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.audit_logs),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], AuditLog.prototype, "user", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, typeorm_1.Entity)('audit_log')
], AuditLog);


/***/ }),

/***/ "./src/entities/document-category.entity.ts":
/*!**************************************************!*\
  !*** ./src/entities/document-category.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentCategory = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
let DocumentCategory = class DocumentCategory {
};
exports.DocumentCategory = DocumentCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], DocumentCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DocumentCategory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DocumentCategory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, document => document.category),
    __metadata("design:type", Array)
], DocumentCategory.prototype, "documents", void 0);
exports.DocumentCategory = DocumentCategory = __decorate([
    (0, typeorm_1.Entity)('document_categories')
], DocumentCategory);


/***/ }),

/***/ "./src/entities/document-permission.entity.ts":
/*!****************************************************!*\
  !*** ./src/entities/document-permission.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentPermission = exports.PermissionType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
var PermissionType;
(function (PermissionType) {
    PermissionType["READ"] = "read";
    PermissionType["WRITE"] = "write";
    PermissionType["APPROVE"] = "approve";
    PermissionType["ADMIN"] = "admin";
    PermissionType["EDIT"] = "EDIT";
})(PermissionType || (exports.PermissionType = PermissionType = {}));
let DocumentPermission = class DocumentPermission {
};
exports.DocumentPermission = DocumentPermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentPermission.prototype, "document_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentPermission.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['admin', 'manager', 'editor', 'viewer'],
        nullable: true
    }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _a : Object)
], DocumentPermission.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['read', 'write', 'delete', 'approve', 'edit']
    }),
    __metadata("design:type", String)
], DocumentPermission.prototype, "permission_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentPermission.prototype, "granted_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DocumentPermission.prototype, "granted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], DocumentPermission.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, document => document.permissions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", typeof (_d = typeof document_entity_1.Document !== "undefined" && document_entity_1.Document) === "function" ? _d : Object)
], DocumentPermission.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_e = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _e : Object)
], DocumentPermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'granted_by' }),
    __metadata("design:type", typeof (_f = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _f : Object)
], DocumentPermission.prototype, "granted_by_user", void 0);
exports.DocumentPermission = DocumentPermission = __decorate([
    (0, typeorm_1.Entity)('document_permissions')
], DocumentPermission);


/***/ }),

/***/ "./src/entities/document-tag.entity.ts":
/*!*********************************************!*\
  !*** ./src/entities/document-tag.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentTag = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
let DocumentTag = class DocumentTag {
};
exports.DocumentTag = DocumentTag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentTag.prototype, "document_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], DocumentTag.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DocumentTag.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, document => document.tags, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", typeof (_b = typeof document_entity_1.Document !== "undefined" && document_entity_1.Document) === "function" ? _b : Object)
], DocumentTag.prototype, "document", void 0);
exports.DocumentTag = DocumentTag = __decorate([
    (0, typeorm_1.Entity)('document_tags'),
    (0, typeorm_1.Index)(['tag'])
], DocumentTag);


/***/ }),

/***/ "./src/entities/document-version.entity.ts":
/*!*************************************************!*\
  !*** ./src/entities/document-version.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentVersion = exports.DocumentVersionStatus = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
const approval_entity_1 = __webpack_require__(/*! ./approval.entity */ "./src/entities/approval.entity.ts");
var DocumentVersionStatus;
(function (DocumentVersionStatus) {
    DocumentVersionStatus["DRAFT"] = "draft";
    DocumentVersionStatus["PENDING_APPROVAL"] = "pending_approval";
    DocumentVersionStatus["APPROVED"] = "approved";
    DocumentVersionStatus["REJECTED"] = "rejected";
})(DocumentVersionStatus || (exports.DocumentVersionStatus = DocumentVersionStatus = {}));
let DocumentVersion = class DocumentVersion {
};
exports.DocumentVersion = DocumentVersion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentVersion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentVersion.prototype, "document_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "version_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], DocumentVersion.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64, nullable: true }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['draft', 'pending_approval', 'approved', 'rejected'],
        default: 'draft'
    }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DocumentVersion.prototype, "change_summary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentVersion.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DocumentVersion.prototype, "approved_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DocumentVersion.prototype, "approved_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DocumentVersion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, document => document.versions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", typeof (_c = typeof document_entity_1.Document !== "undefined" && document_entity_1.Document) === "function" ? _c : Object)
], DocumentVersion.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.created_versions),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], DocumentVersion.prototype, "created_by_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.approved_versions),
    (0, typeorm_1.JoinColumn)({ name: 'approved_by' }),
    __metadata("design:type", typeof (_e = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _e : Object)
], DocumentVersion.prototype, "approved_by_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_entity_1.Approval, approval => approval.document_version),
    __metadata("design:type", Array)
], DocumentVersion.prototype, "approvals", void 0);
exports.DocumentVersion = DocumentVersion = __decorate([
    (0, typeorm_1.Entity)('document_versions'),
    (0, typeorm_1.Index)(['document_id', 'version_number'], { unique: true })
], DocumentVersion);


/***/ }),

/***/ "./src/entities/document.entity.ts":
/*!*****************************************!*\
  !*** ./src/entities/document.entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Document = exports.DocumentStatus = exports.DocumentType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
const document_category_entity_1 = __webpack_require__(/*! ./document-category.entity */ "./src/entities/document-category.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! ./document-version.entity */ "./src/entities/document-version.entity.ts");
const document_permission_entity_1 = __webpack_require__(/*! ./document-permission.entity */ "./src/entities/document-permission.entity.ts");
const document_tag_entity_1 = __webpack_require__(/*! ./document-tag.entity */ "./src/entities/document-tag.entity.ts");
var DocumentType;
(function (DocumentType) {
    DocumentType["POE"] = "POE";
    DocumentType["POLICY"] = "policy";
    DocumentType["MANUAL"] = "manual";
    DocumentType["INSTRUCTION"] = "instruction";
    DocumentType["OTHER"] = "other";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["DRAFT"] = "draft";
    DocumentStatus["PENDING_APPROVAL"] = "pending_approval";
    DocumentStatus["APPROVED"] = "approved";
    DocumentStatus["REJECTED"] = "rejected";
    DocumentStatus["ARCHIVED"] = "archived";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['POE', 'policy', 'manual', 'instruction', 'other'],
        default: 'other'
    }),
    __metadata("design:type", String)
], Document.prototype, "document_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Document.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Document.prototype, "current_version_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['draft', 'pending_approval', 'approved', 'rejected', 'archived'],
        default: 'draft'
    }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Document.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Document.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Document.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_category_entity_1.DocumentCategory, category => category.documents),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", typeof (_c = typeof document_category_entity_1.DocumentCategory !== "undefined" && document_category_entity_1.DocumentCategory) === "function" ? _c : Object)
], Document.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.created_documents),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], Document.prototype, "created_by_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_version_entity_1.DocumentVersion, version => version.document),
    __metadata("design:type", Array)
], Document.prototype, "versions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_version_entity_1.DocumentVersion),
    (0, typeorm_1.JoinColumn)({ name: 'current_version_id' }),
    __metadata("design:type", typeof (_e = typeof document_version_entity_1.DocumentVersion !== "undefined" && document_version_entity_1.DocumentVersion) === "function" ? _e : Object)
], Document.prototype, "current_version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_permission_entity_1.DocumentPermission, permission => permission.document),
    __metadata("design:type", Array)
], Document.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_tag_entity_1.DocumentTag, tag => tag.document),
    __metadata("design:type", Array)
], Document.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "file_path", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents')
], Document);


/***/ }),

/***/ "./src/entities/index.ts":
/*!*******************************!*\
  !*** ./src/entities/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditAction = exports.EntityType = exports.ApprovalStatus = exports.PermissionType = exports.DocumentVersionStatus = exports.DocumentStatus = exports.DocumentType = exports.UserRole = exports.AuditLog = exports.Approval = exports.ApprovalStep = exports.ApprovalWorkflow = exports.DocumentPermission = exports.DocumentTag = exports.DocumentCategory = exports.DocumentVersion = exports.Document = exports.User = void 0;
var user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_entity_1.User; } }));
var document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
Object.defineProperty(exports, "Document", ({ enumerable: true, get: function () { return document_entity_1.Document; } }));
var document_version_entity_1 = __webpack_require__(/*! ./document-version.entity */ "./src/entities/document-version.entity.ts");
Object.defineProperty(exports, "DocumentVersion", ({ enumerable: true, get: function () { return document_version_entity_1.DocumentVersion; } }));
var document_category_entity_1 = __webpack_require__(/*! ./document-category.entity */ "./src/entities/document-category.entity.ts");
Object.defineProperty(exports, "DocumentCategory", ({ enumerable: true, get: function () { return document_category_entity_1.DocumentCategory; } }));
var document_tag_entity_1 = __webpack_require__(/*! ./document-tag.entity */ "./src/entities/document-tag.entity.ts");
Object.defineProperty(exports, "DocumentTag", ({ enumerable: true, get: function () { return document_tag_entity_1.DocumentTag; } }));
var document_permission_entity_1 = __webpack_require__(/*! ./document-permission.entity */ "./src/entities/document-permission.entity.ts");
Object.defineProperty(exports, "DocumentPermission", ({ enumerable: true, get: function () { return document_permission_entity_1.DocumentPermission; } }));
var approval_workflow_entity_1 = __webpack_require__(/*! ./approval-workflow.entity */ "./src/entities/approval-workflow.entity.ts");
Object.defineProperty(exports, "ApprovalWorkflow", ({ enumerable: true, get: function () { return approval_workflow_entity_1.ApprovalWorkflow; } }));
var approval_step_entity_1 = __webpack_require__(/*! ./approval-step.entity */ "./src/entities/approval-step.entity.ts");
Object.defineProperty(exports, "ApprovalStep", ({ enumerable: true, get: function () { return approval_step_entity_1.ApprovalStep; } }));
var approval_entity_1 = __webpack_require__(/*! ./approval.entity */ "./src/entities/approval.entity.ts");
Object.defineProperty(exports, "Approval", ({ enumerable: true, get: function () { return approval_entity_1.Approval; } }));
var audit_log_entity_1 = __webpack_require__(/*! ./audit-log.entity */ "./src/entities/audit-log.entity.ts");
Object.defineProperty(exports, "AuditLog", ({ enumerable: true, get: function () { return audit_log_entity_1.AuditLog; } }));
var user_entity_2 = __webpack_require__(/*! ./user.entity */ "./src/entities/user.entity.ts");
Object.defineProperty(exports, "UserRole", ({ enumerable: true, get: function () { return user_entity_2.UserRole; } }));
var document_entity_2 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
Object.defineProperty(exports, "DocumentType", ({ enumerable: true, get: function () { return document_entity_2.DocumentType; } }));
Object.defineProperty(exports, "DocumentStatus", ({ enumerable: true, get: function () { return document_entity_2.DocumentStatus; } }));
var document_version_entity_2 = __webpack_require__(/*! ./document-version.entity */ "./src/entities/document-version.entity.ts");
Object.defineProperty(exports, "DocumentVersionStatus", ({ enumerable: true, get: function () { return document_version_entity_2.DocumentVersionStatus; } }));
var document_permission_entity_2 = __webpack_require__(/*! ./document-permission.entity */ "./src/entities/document-permission.entity.ts");
Object.defineProperty(exports, "PermissionType", ({ enumerable: true, get: function () { return document_permission_entity_2.PermissionType; } }));
var approval_entity_2 = __webpack_require__(/*! ./approval.entity */ "./src/entities/approval.entity.ts");
Object.defineProperty(exports, "ApprovalStatus", ({ enumerable: true, get: function () { return approval_entity_2.ApprovalStatus; } }));
var audit_log_entity_2 = __webpack_require__(/*! ./audit-log.entity */ "./src/entities/audit-log.entity.ts");
Object.defineProperty(exports, "EntityType", ({ enumerable: true, get: function () { return audit_log_entity_2.EntityType; } }));
Object.defineProperty(exports, "AuditAction", ({ enumerable: true, get: function () { return audit_log_entity_2.AuditAction; } }));


/***/ }),

/***/ "./src/entities/user.entity.ts":
/*!*************************************!*\
  !*** ./src/entities/user.entity.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.UserRole = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const document_entity_1 = __webpack_require__(/*! ./document.entity */ "./src/entities/document.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! ./document-version.entity */ "./src/entities/document-version.entity.ts");
const approval_entity_1 = __webpack_require__(/*! ./approval.entity */ "./src/entities/approval.entity.ts");
const audit_log_entity_1 = __webpack_require__(/*! ./audit-log.entity */ "./src/entities/audit-log.entity.ts");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["EDITOR"] = "editor";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    get full_name() {
        return `${this.first_name} ${this.last_name}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['admin', 'manager', 'editor', 'viewer'],
        default: 'viewer'
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, document => document.created_by_user),
    __metadata("design:type", Array)
], User.prototype, "created_documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_version_entity_1.DocumentVersion, version => version.created_by_user),
    __metadata("design:type", Array)
], User.prototype, "created_versions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_version_entity_1.DocumentVersion, version => version.approved_by_user),
    __metadata("design:type", Array)
], User.prototype, "approved_versions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_entity_1.Approval, approval => approval.approver),
    __metadata("design:type", Array)
], User.prototype, "approvals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_log_entity_1.AuditLog, log => log.user),
    __metadata("design:type", Array)
], User.prototype, "audit_logs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], User.prototype, "permissions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./src/modules/approvals/approvals.controller.ts":
/*!*******************************************************!*\
  !*** ./src/modules/approvals/approvals.controller.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const approvals_service_1 = __webpack_require__(/*! ./approvals.service */ "./src/modules/approvals/approvals.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! @modules/auth/guards/roles.guard */ "./src/modules/auth/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! @modules/auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
const create_approval_workflow_dto_1 = __webpack_require__(/*! ./dto/create-approval-workflow.dto */ "./src/modules/approvals/dto/create-approval-workflow.dto.ts");
const CreateApprovalStepDto_dto_1 = __webpack_require__(/*! ./dto/CreateApprovalStepDto.dto */ "./src/modules/approvals/dto/CreateApprovalStepDto.dto.ts");
const ApprovalRequest_dto_1 = __webpack_require__(/*! ./dto/ApprovalRequest.dto */ "./src/modules/approvals/dto/ApprovalRequest.dto.ts");
let ApprovalsController = class ApprovalsController {
    constructor(approvalsService) {
        this.approvalsService = approvalsService;
    }
    async startApproval(approvalRequest, req) {
        return this.approvalsService.startApprovalProcess(approvalRequest, req.user);
    }
    async processApproval(id, approve, req) {
        return this.approvalsService.processApproval(id, approve, req.user);
    }
    async getPendingApprovals(req) {
        return this.approvalsService.getPendingApprovals(req.user);
    }
    async getHistoryByDocumentVersion(versionId) {
        return this.approvalsService.getHistoryByDocument(versionId);
    }
    async getWorkflows() {
        return this.approvalsService.getWorkflows();
    }
    async createWorkflow(workflowData) {
        return this.approvalsService.createWorkflow(workflowData);
    }
    async addWorkflowStep(id, stepData) {
        return this.approvalsService.addStepToWorkflow(id, stepData);
    }
};
exports.ApprovalsController = ApprovalsController;
__decorate([
    (0, common_1.Post)('start'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar proceso de aprobación' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Proceso de aprobación iniciado' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof ApprovalRequest_dto_1.ApprovalRequest !== "undefined" && ApprovalRequest_dto_1.ApprovalRequest) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "startApproval", null);
__decorate([
    (0, common_1.Patch)(':id/process'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Procesar aprobación (aprobar/rechazar)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Aprobación procesada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('approve')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Object]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "processApproval", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener aprobaciones pendientes del usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de aprobaciones pendientes' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getPendingApprovals", null);
__decorate([
    (0, common_1.Get)('document-version/:versionId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener historial de aprobaciones de una versión' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial de aprobaciones' }),
    __param(0, (0, common_1.Param)('versionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getHistoryByDocumentVersion", null);
__decorate([
    (0, common_1.Get)('workflows'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener flujos de trabajo disponibles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de flujos de trabajo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "getWorkflows", null);
__decorate([
    (0, common_1.Post)('workflows'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nuevo flujo de trabajo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Flujo de trabajo creado correctamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_approval_workflow_dto_1.CreateApprovalWorkflowDto !== "undefined" && create_approval_workflow_dto_1.CreateApprovalWorkflowDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "createWorkflow", null);
__decorate([
    (0, common_1.Post)('workflows/:id/steps'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar paso a flujo de trabajo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Paso agregado al flujo' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof CreateApprovalStepDto_dto_1.CreateApprovalStepDto !== "undefined" && CreateApprovalStepDto_dto_1.CreateApprovalStepDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ApprovalsController.prototype, "addWorkflowStep", null);
exports.ApprovalsController = ApprovalsController = __decorate([
    (0, swagger_1.ApiTags)('aprobaciones'),
    (0, common_1.Controller)('approvals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof approvals_service_1.ApprovalsService !== "undefined" && approvals_service_1.ApprovalsService) === "function" ? _a : Object])
], ApprovalsController);


/***/ }),

/***/ "./src/modules/approvals/approvals.module.ts":
/*!***************************************************!*\
  !*** ./src/modules/approvals/approvals.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const approvals_controller_1 = __webpack_require__(/*! ./approvals.controller */ "./src/modules/approvals/approvals.controller.ts");
const approvals_service_1 = __webpack_require__(/*! ./approvals.service */ "./src/modules/approvals/approvals.service.ts");
const approval_entity_1 = __webpack_require__(/*! @entities/approval.entity */ "./src/entities/approval.entity.ts");
const approval_workflow_entity_1 = __webpack_require__(/*! @entities/approval-workflow.entity */ "./src/entities/approval-workflow.entity.ts");
const approval_step_entity_1 = __webpack_require__(/*! @entities/approval-step.entity */ "./src/entities/approval-step.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! @entities/document-version.entity */ "./src/entities/document-version.entity.ts");
const entities_1 = __webpack_require__(/*! @/entities */ "./src/entities/index.ts");
let ApprovalsModule = class ApprovalsModule {
};
exports.ApprovalsModule = ApprovalsModule;
exports.ApprovalsModule = ApprovalsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([approval_workflow_entity_1.ApprovalWorkflow]),
            typeorm_1.TypeOrmModule.forFeature([
                approval_entity_1.Approval,
                approval_step_entity_1.ApprovalStep,
                document_version_entity_1.DocumentVersion,
                entities_1.User
            ]),
        ],
        controllers: [approvals_controller_1.ApprovalsController],
        providers: [approvals_service_1.ApprovalsService],
        exports: [approvals_service_1.ApprovalsService],
    })
], ApprovalsModule);


/***/ }),

/***/ "./src/modules/approvals/approvals.service.ts":
/*!****************************************************!*\
  !*** ./src/modules/approvals/approvals.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const approval_entity_1 = __webpack_require__(/*! @entities/approval.entity */ "./src/entities/approval.entity.ts");
const approval_workflow_entity_1 = __webpack_require__(/*! @entities/approval-workflow.entity */ "./src/entities/approval-workflow.entity.ts");
const approval_step_entity_1 = __webpack_require__(/*! @entities/approval-step.entity */ "./src/entities/approval-step.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! @entities/document-version.entity */ "./src/entities/document-version.entity.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
let ApprovalsService = class ApprovalsService {
    constructor(approvalsRepository, workflowsRepository, stepsRepository, versionsRepository, userRepository) {
        this.approvalsRepository = approvalsRepository;
        this.workflowsRepository = workflowsRepository;
        this.stepsRepository = stepsRepository;
        this.versionsRepository = versionsRepository;
        this.userRepository = userRepository;
    }
    async startApprovalProcess(approvalRequest, user) {
        const { document_version_id, workflow_id } = approvalRequest;
        const workflow = await this.workflowsRepository.findOne({
            where: { id: workflow_id },
            relations: ['steps', 'steps.approvers'],
        });
        if (!workflow) {
            throw new common_1.BadRequestException(`Workflow con ID ${workflow_id} no existe`);
        }
        const firstStep = workflow.steps.find(s => s.step_order === 1);
        if (!firstStep) {
            throw new common_1.BadRequestException(`El workflow no tiene pasos configurados`);
        }
        let approver = firstStep.approvers?.[0] ?? null;
        if (!approver && firstStep.required_role) {
            approver = await this.getDefaultApproverByRole(firstStep.required_role);
        }
        if (!approver) {
            throw new common_1.BadRequestException(`El paso "${firstStep.step_name}" no tiene asignado un aprobador ni rol válido`);
        }
        const approval = this.approvalsRepository.create({
            document_version_id,
            workflow_id,
            step: firstStep,
            approver_id: approver.id,
            status: approval_entity_1.ApprovalStatus.PENDING,
            created_at: new Date(),
        });
        await this.approvalsRepository.save(approval);
        return {
            message: 'Proceso de aprobación iniciado correctamente',
            workflow_id,
            document_version_id,
            assigned_approver: approver.username,
            current_step: firstStep.step_name,
        };
    }
    async processApproval(id, approve, user) {
        const approval = await this.approvalsRepository.findOne({
            where: { id },
            relations: ['approver']
        });
        if (!approval) {
            throw new common_1.NotFoundException(`No se encontró la aprobación con ID ${id}`);
        }
        approval.status = approve ? approval_entity_1.ApprovalStatus.APPROVED : approval_entity_1.ApprovalStatus.REJECTED;
        approval.approved_at = new Date();
        approval.approver = user;
        return this.approvalsRepository.save(approval);
    }
    async getPendingApprovals(user) {
        const query = this.approvalsRepository.createQueryBuilder('approval')
            .leftJoinAndSelect('approval.step', 'step')
            .leftJoinAndSelect('approval.workflow', 'workflow')
            .leftJoinAndSelect('approval.document_version', 'document_version')
            .leftJoinAndSelect('document_version.document', 'document')
            .leftJoinAndSelect('approval.approver', 'approver')
            .where('approval.status = :status', { status: approval_entity_1.ApprovalStatus.PENDING });
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            query.andWhere('(approval.approver_id = :userId OR step.required_role = :userRole)', {
                userId: user.id,
                userRole: user.role,
            });
        }
        return query.orderBy('approval.created_at', 'ASC').getMany();
    }
    async getDocumentApprovalHistory(documentVersionId) {
        return this.approvalsRepository.find({
            where: { document_version_id: documentVersionId },
            relations: ['step', 'workflow', 'approver', 'document_version', 'document_version.document'],
            order: { created_at: 'ASC' }
        });
    }
    async getWorkflows() {
        return this.workflowsRepository.find({
            where: { is_active: true },
            relations: ['steps', 'steps.approvers'],
            order: { created_at: 'DESC' },
        });
    }
    async createWorkflow(workflowData) {
        const workflow = this.workflowsRepository.create(workflowData);
        return this.workflowsRepository.save(workflow);
    }
    async addStepToWorkflow(workflowId, stepData) {
        if ((!stepData.approvers || stepData.approvers.length === 0) && !stepData.role_required) {
            throw new common_1.BadRequestException(`El paso "${stepData.step_name}" no tiene asignado un aprobador ni rol válido`);
        }
        const workflow = await this.workflowsRepository.findOne({ where: { id: workflowId } });
        if (!workflow)
            throw new common_1.NotFoundException('Workflow no encontrado');
        const approvers = stepData.approvers
            ? await this.userRepository.findByIds(stepData.approvers)
            : [];
        const lastStepOrder = (await this.stepsRepository.find({ where: { workflow_id: workflowId } }))
            .reduce((max, s) => (s.step_order > max ? s.step_order : max), 0) || 0;
        const step = this.stepsRepository.create({
            step_name: stepData.step_name,
            step_order: lastStepOrder + 1,
            required_role: stepData.role_required,
            workflow,
            workflow_id: workflow.id,
            approvers,
        });
        return this.stepsRepository.save(step);
    }
    async getDefaultApproverByRole(role) {
        return this.userRepository.findOne({
            where: { role, is_active: true },
        });
    }
    canUserApproveStep(user, step) {
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return true;
        }
        if (step.required_role && user.role === step.required_role) {
            return true;
        }
        return false;
    }
    async checkWorkflowCompletion(workflowId, documentVersionId) {
        const allApprovals = await this.approvalsRepository.find({
            where: {
                workflow_id: workflowId,
                document_version_id: documentVersionId,
            },
            relations: ['step'],
        });
        const pendingApprovals = allApprovals.filter(a => a.status === approval_entity_1.ApprovalStatus.PENDING);
        const rejectedApprovals = allApprovals.filter(a => a.status === approval_entity_1.ApprovalStatus.REJECTED);
        const version = await this.versionsRepository.findOne({
            where: { id: documentVersionId },
            relations: ['document'],
        });
        if (!version)
            return;
        if (rejectedApprovals.length > 0) {
            version.status = document_version_entity_1.DocumentVersionStatus.REJECTED;
            await this.versionsRepository.save(version);
            return;
        }
        if (pendingApprovals.length === 0) {
            version.status = document_version_entity_1.DocumentVersionStatus.APPROVED;
            version.approved_at = new Date();
            version.document.current_version_id = version.id;
            version.document.status = 'approved';
            await this.versionsRepository.save(version);
        }
    }
    async getHistoryByDocument(documentId) {
        return this.approvalsRepository.find({
            where: {
                document_version: { document: { id: documentId } }
            },
            relations: [
                'workflow',
                'step',
                'approver',
                'document_version',
                'document_version.document',
            ],
            order: { created_at: 'ASC' },
        });
    }
};
exports.ApprovalsService = ApprovalsService;
exports.ApprovalsService = ApprovalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(approval_entity_1.Approval)),
    __param(1, (0, typeorm_1.InjectRepository)(approval_workflow_entity_1.ApprovalWorkflow)),
    __param(2, (0, typeorm_1.InjectRepository)(approval_step_entity_1.ApprovalStep)),
    __param(3, (0, typeorm_1.InjectRepository)(document_version_entity_1.DocumentVersion)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], ApprovalsService);


/***/ }),

/***/ "./src/modules/approvals/dto/ApprovalRequest.dto.ts":
/*!**********************************************************!*\
  !*** ./src/modules/approvals/dto/ApprovalRequest.dto.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApprovalRequest = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ApprovalRequest {
}
exports.ApprovalRequest = ApprovalRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la versión del documento' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApprovalRequest.prototype, "document_version_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del flujo de aprobación' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApprovalRequest.prototype, "workflow_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del aprobador' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApprovalRequest.prototype, "approverId", void 0);


/***/ }),

/***/ "./src/modules/approvals/dto/CreateApprovalStepDto.dto.ts":
/*!****************************************************************!*\
  !*** ./src/modules/approvals/dto/CreateApprovalStepDto.dto.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateApprovalStepDto = void 0;
const user_entity_1 = __webpack_require__(/*! @/entities/user.entity */ "./src/entities/user.entity.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateApprovalStepDto {
}
exports.CreateApprovalStepDto = CreateApprovalStepDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalStepDto.prototype, "step_name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateApprovalStepDto.prototype, "approvers", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _a : Object)
], CreateApprovalStepDto.prototype, "role_required", void 0);


/***/ }),

/***/ "./src/modules/approvals/dto/create-approval-workflow.dto.ts":
/*!*******************************************************************!*\
  !*** ./src/modules/approvals/dto/create-approval-workflow.dto.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateApprovalWorkflowDto = exports.DocumentType = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
var DocumentType;
(function (DocumentType) {
    DocumentType["POE"] = "POE";
    DocumentType["POLICY"] = "policy";
    DocumentType["MANUAL"] = "manual";
    DocumentType["INSTRUCTION"] = "instruction";
    DocumentType["OTHER"] = "other";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
class CreateApprovalWorkflowDto {
}
exports.CreateApprovalWorkflowDto = CreateApprovalWorkflowDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Flujo de aprobación para POE', description: 'Nombre del flujo de trabajo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], CreateApprovalWorkflowDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Revisión completa de documentos POE', description: 'Descripción del flujo de trabajo', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApprovalWorkflowDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DocumentType, required: false, description: 'Tipo de documento asociado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DocumentType),
    __metadata("design:type", String)
], CreateApprovalWorkflowDto.prototype, "document_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Define si el flujo está activo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateApprovalWorkflowDto.prototype, "is_active", void 0);


/***/ }),

/***/ "./src/modules/audit/audit.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/audit/audit.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const audit_service_1 = __webpack_require__(/*! ./audit.service */ "./src/modules/audit/audit.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! @modules/auth/guards/roles.guard */ "./src/modules/auth/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! @modules/auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
const audit_log_entity_1 = __webpack_require__(/*! @entities/audit-log.entity */ "./src/entities/audit-log.entity.ts");
let AuditController = class AuditController {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async findAll(entityType, entityId, userId, limit, offset) {
        return this.auditService.findAll(entityType, entityId, userId, limit || 100, offset || 0);
    }
    async findByEntity(entityType, entityId) {
        return this.auditService.findByEntity(entityType, entityId);
    }
    async findByUser(userId, limit) {
        return this.auditService.findByUser(userId, limit || 50);
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener registros de auditoría' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de registros de auditoría' }),
    (0, swagger_1.ApiQuery)({ name: 'entityType', enum: audit_log_entity_1.EntityType, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'entityId', type: 'number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'userId', type: 'number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false, description: 'Límite de resultados (default: 100)' }),
    (0, swagger_1.ApiQuery)({ name: 'offset', type: 'number', required: false, description: 'Offset para paginación (default: 0)' }),
    __param(0, (0, common_1.Query)('entityType')),
    __param(1, (0, common_1.Query)('entityId', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('userId', new common_1.ParseIntPipe({ optional: true }))),
    __param(3, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __param(4, (0, common_1.Query)('offset', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof audit_log_entity_1.EntityType !== "undefined" && audit_log_entity_1.EntityType) === "function" ? _b : Object, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('entity/:entityType/:entityId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener auditoría de una entidad específica' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial de auditoría de la entidad' }),
    __param(0, (0, common_1.Param)('entityType', new common_1.ParseEnumPipe(audit_log_entity_1.EntityType))),
    __param(1, (0, common_1.Param)('entityId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof audit_log_entity_1.EntityType !== "undefined" && audit_log_entity_1.EntityType) === "function" ? _c : Object, Number]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "findByEntity", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener actividad de un usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actividad del usuario' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false, description: 'Límite de resultados (default: 50)' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "findByUser", null);
exports.AuditController = AuditController = __decorate([
    (0, swagger_1.ApiTags)('auditoría'),
    (0, common_1.Controller)('audit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _a : Object])
], AuditController);


/***/ }),

/***/ "./src/modules/audit/audit.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/audit/audit.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const audit_controller_1 = __webpack_require__(/*! ./audit.controller */ "./src/modules/audit/audit.controller.ts");
const audit_service_1 = __webpack_require__(/*! ./audit.service */ "./src/modules/audit/audit.service.ts");
const audit_log_entity_1 = __webpack_require__(/*! @entities/audit-log.entity */ "./src/entities/audit-log.entity.ts");
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([audit_log_entity_1.AuditLog])],
        controllers: [audit_controller_1.AuditController],
        providers: [audit_service_1.AuditService],
        exports: [audit_service_1.AuditService],
    })
], AuditModule);


/***/ }),

/***/ "./src/modules/audit/audit.service.ts":
/*!********************************************!*\
  !*** ./src/modules/audit/audit.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const audit_log_entity_1 = __webpack_require__(/*! @entities/audit-log.entity */ "./src/entities/audit-log.entity.ts");
let AuditService = class AuditService {
    constructor(auditRepository) {
        this.auditRepository = auditRepository;
    }
    async createLog(data) {
        const auditLog = this.auditRepository.create(data);
        return this.auditRepository.save(auditLog);
    }
    async findAll(entityType, entityId, userId, limit = 100, offset = 0) {
        const query = this.auditRepository.createQueryBuilder('audit')
            .leftJoinAndSelect('audit.user', 'user')
            .orderBy('audit.created_at', 'DESC');
        if (entityType) {
            query.andWhere('audit.entity_type = :entityType', { entityType });
        }
        if (entityId) {
            query.andWhere('audit.entity_id = :entityId', { entityId });
        }
        if (userId) {
            query.andWhere('audit.user_id = :userId', { userId });
        }
        const [logs, total] = await query
            .take(limit)
            .skip(offset)
            .getManyAndCount();
        return { logs, total };
    }
    async findByEntity(entityType, entityId) {
        return this.auditRepository.find({
            where: {
                entity_type: entityType,
                entity_id: entityId,
            },
            relations: ['user'],
            order: { created_at: 'DESC' },
        });
    }
    async findByUser(userId, limit = 50) {
        return this.auditRepository.find({
            where: { user_id: userId },
            relations: ['user'],
            order: { created_at: 'DESC' },
            take: limit,
        });
    }
    async logDocumentCreate(documentId, documentData, user, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.DOCUMENT,
            entity_id: documentId,
            action: audit_log_entity_1.AuditAction.CREATE,
            new_values: documentData,
            user_id: user.id,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
    async logDocumentUpdate(documentId, oldData, newData, user, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.DOCUMENT,
            entity_id: documentId,
            action: audit_log_entity_1.AuditAction.UPDATE,
            old_values: oldData,
            new_values: newData,
            user_id: user.id,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
    async logDocumentDelete(documentId, documentData, user, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.DOCUMENT,
            entity_id: documentId,
            action: audit_log_entity_1.AuditAction.DELETE,
            old_values: documentData,
            user_id: user.id,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
    async logDocumentDownload(documentId, user, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.DOCUMENT,
            entity_id: documentId,
            action: audit_log_entity_1.AuditAction.DOWNLOAD,
            user_id: user.id,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
    async logApproval(approvalId, action, data, user, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.APPROVAL,
            entity_id: approvalId,
            action,
            new_values: data,
            user_id: user.id,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
    async logUserAction(userId, action, oldData, newData, actionUser, req) {
        await this.createLog({
            entity_type: audit_log_entity_1.EntityType.USER,
            entity_id: userId,
            action,
            old_values: oldData,
            new_values: newData,
            user_id: actionUser?.id || userId,
            ip_address: req?.ip,
            user_agent: req?.get('User-Agent'),
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AuditService);


/***/ }),

/***/ "./src/modules/auth/auth.controller.ts":
/*!*********************************************!*\
  !*** ./src/modules/auth/auth.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const auth_dto_1 = __webpack_require__(/*! ./dto/auth.dto */ "./src/modules/auth/dto/auth.dto.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login exitoso',
        type: auth_dto_1.LoginResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nuevo usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario registrado exitosamente',
        type: auth_dto_1.LoginResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Usuario ya existe' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('autenticación'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./src/modules/auth/auth.module.ts":
/*!*****************************************!*\
  !*** ./src/modules/auth/auth.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const users_module_1 = __webpack_require__(/*! @modules/users/users.module */ "./src/modules/users/users.module.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/modules/auth/strategies/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__(/*! ./strategies/local.strategy */ "./src/modules/auth/strategies/local.strategy.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./src/modules/auth/auth.service.ts":
/*!******************************************!*\
  !*** ./src/modules/auth/auth.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_service_1 = __webpack_require__(/*! @modules/users/users.service */ "./src/modules/users/users.service.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(identifier, password) {
        return this.usersService.validatePassword(identifier, password);
    }
    async login(loginDto) {
        if (!loginDto.username && !loginDto.email) {
            throw new common_1.UnauthorizedException('Debe proporcionar username o email');
        }
        const identifier = loginDto.email || loginDto.username;
        const user = await this.validateUser(identifier, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                full_name: user.full_name,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByUsername(registerDto.username);
        if (existingUser) {
            throw new common_1.ConflictException('El nombre de usuario ya existe');
        }
        const existingEmail = await this.usersService.findByEmail(registerDto.email);
        if (existingEmail) {
            throw new common_1.ConflictException('El correo electrónico ya está registrado');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
        const userData = {
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            first_name: registerDto.first_name,
            last_name: registerDto.last_name,
            role: registerDto.role || user_entity_1.UserRole.VIEWER,
        };
        const user = await this.usersService.create(userData);
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                full_name: `${user.first_name} ${user.last_name}`,
            },
        };
    }
    async validateToken(payload) {
        return this.usersService.findOne(payload.sub);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),

/***/ "./src/modules/auth/decorators/roles.decorator.ts":
/*!********************************************************!*\
  !*** ./src/modules/auth/decorators/roles.decorator.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/modules/auth/dto/auth.dto.ts":
/*!******************************************!*\
  !*** ./src/modules/auth/dto/auth.dto.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = exports.LoginResponseDto = exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de usuario', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contraseña' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token de acceso JWT' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Información del usuario' }),
    __metadata("design:type", Object)
], LoginResponseDto.prototype, "user", void 0);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de usuario' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electrónico' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contraseña' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apellido' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rol del usuario', enum: user_entity_1.UserRole, required: false }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _a : Object)
], RegisterDto.prototype, "role", void 0);


/***/ }),

/***/ "./src/modules/auth/guards/jwt-auth.guard.ts":
/*!***************************************************!*\
  !*** ./src/modules/auth/guards/jwt-auth.guard.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

/***/ "./src/modules/auth/guards/roles.guard.ts":
/*!************************************************!*\
  !*** ./src/modules/auth/guards/roles.guard.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.role === role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./src/modules/auth/strategies/jwt.strategy.ts":
/*!*****************************************************!*\
  !*** ./src/modules/auth/strategies/jwt.strategy.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./src/modules/auth/auth.service.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(payload) {
        return {
            id: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),

/***/ "./src/modules/auth/strategies/local.strategy.ts":
/*!*******************************************************!*\
  !*** ./src/modules/auth/strategies/local.strategy.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./src/modules/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),

/***/ "./src/modules/documents/documents.controller.ts":
/*!*******************************************************!*\
  !*** ./src/modules/documents/documents.controller.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const express_1 = __webpack_require__(/*! express */ "express");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const documents_service_1 = __webpack_require__(/*! ./documents.service */ "./src/modules/documents/documents.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! @modules/auth/guards/roles.guard */ "./src/modules/auth/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! @modules/auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
const document_dto_1 = __webpack_require__(/*! ./dto/document.dto */ "./src/modules/documents/dto/document.dto.ts");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    getPdf(filename, res) {
        const filePath = path_1.default.join(__dirname, '/uploads/', filename);
        const fileStream = (0, fs_1.createReadStream)(filePath);
        fileStream.pipe(res);
    }
    async create(file, createDocumentDto, req) {
        return this.documentsService.create(createDocumentDto, file, req.user);
    }
    async findAll(page = 1, limit = 10, req) {
        return this.documentsService.findAll(req.user, page, limit);
    }
    async search(searchDto, req) {
        return this.documentsService.searchDocuments(searchDto.query, searchDto.type, searchDto.categoryId, searchDto.status, req.user);
    }
    async findOne(id, req) {
        return this.documentsService.findOne(id, req.user);
    }
    async update(id, updateDocumentDto, req) {
        return this.documentsService.update(id, updateDocumentDto, req.user);
    }
    async remove(id, req) {
        await this.documentsService.remove(id, req.user);
        return { message: 'Documento eliminado exitosamente' };
    }
    async uploadVersion(id, file, changeSummary, isMajorVersion, req) {
        if (!file) {
            throw new Error('No file uploaded');
        }
        const newVersion = await this.documentsService.createDocumentVersion(id, file, changeSummary, isMajorVersion, req.user);
        return {
            message: 'Versión subida exitosamente',
            data: newVersion,
        };
    }
    async getVersions(id, req) {
        return this.documentsService.getDocumentVersions(id, req.user);
    }
    async downloadVersion(versionId, res, req) {
        const { filePath, fileName } = await this.documentsService.downloadVersion(versionId, req.user);
        const fileStream = (0, fs_1.createReadStream)(filePath);
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });
        fileStream.pipe(res);
    }
    async getCategories() {
        return this.documentsService.getCategories();
    }
    async createCategory(createCategoryDto) {
        return this.documentsService.createCategory(createCategoryDto.name, createCategoryDto.description);
    }
    async addTag(id, addTagDto, req) {
        return this.documentsService.addTag(id, addTagDto.tag, req.user);
    }
    async removeTag(id, tagId, req) {
        await this.documentsService.removeTag(id, tagId, req.user);
        return { message: 'Etiqueta removida exitosamente' };
    }
    async getPermissions(id, req) {
        return this.documentsService.getDocumentPermissions(id, req.user);
    }
    async createPermission(id, body, req) {
        return this.documentsService.createPermission(+id, body, req.user);
    }
    getMyPermissions(req) {
        const user = req.user;
        return this.documentsService.getUserPermissions(user.id);
    }
    getDocumentPermissions(documentId, req) {
        return this.documentsService.getDocumentPermissions(documentId, req.user);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)('view/:filename'),
    (0, common_1.Header)('Content-Type', 'application/pdf'),
    (0, common_1.Header)('Content-Disposition', 'inline'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getPdf", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/documents',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        }),
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un documento con archivo adjunto' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                document_type: { type: 'string', enum: ['POE'] },
                category_id: { type: 'number' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object, typeof (_e = typeof document_dto_1.CreateDocumentDto !== "undefined" && document_dto_1.CreateDocumentDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los documentos con paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar documentos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultados de búsqueda', type: [document_dto_1.DocumentResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof document_dto_1.SearchDocumentsDto !== "undefined" && document_dto_1.SearchDocumentsDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], DocumentsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener documento por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documento encontrado', type: document_dto_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documento actualizado', type: document_dto_1.DocumentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof document_dto_1.UpdateDocumentDto !== "undefined" && document_dto_1.UpdateDocumentDto) === "function" ? _k : Object, Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documento eliminado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], DocumentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/versions'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Subir nueva versión del documento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Versión subida exitosamente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('change_summary')),
    __param(3, (0, common_1.Body)('is_major_version')),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_p = typeof Express !== "undefined" && (_o = Express.Multer) !== void 0 && _o.File) === "function" ? _p : Object, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadVersion", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener versiones de un documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de versiones', type: [document_dto_1.DocumentVersionResponseDto] }),
    (0, common_1.Get)(':id/versions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], DocumentsController.prototype, "getVersions", null);
__decorate([
    (0, common_1.Get)('versions/:versionId/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Descargar versión de documento' }),
    __param(0, (0, common_1.Param)('versionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], DocumentsController.prototype, "downloadVersion", null);
__decorate([
    (0, common_1.Get)('categories/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las categorías' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nueva categoría' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof document_dto_1.CreateCategoryDto !== "undefined" && document_dto_1.CreateCategoryDto) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)(':id/tags'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar etiqueta a documento' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_u = typeof document_dto_1.AddTagDto !== "undefined" && document_dto_1.AddTagDto) === "function" ? _u : Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "addTag", null);
__decorate([
    (0, common_1.Delete)(':id/tags/:tagId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER, user_entity_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Remover etiqueta de documento' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tagId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], DocumentsController.prototype, "removeTag", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener permisos de documento' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Post)(':id/permissions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Get)('permissions/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getMyPermissions", null);
__decorate([
    (0, common_1.Get)(':documentId/permissions'),
    __param(0, (0, common_1.Param)('documentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getDocumentPermissions", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('documentos'),
    (0, common_1.Controller)('documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof documents_service_1.DocumentsService !== "undefined" && documents_service_1.DocumentsService) === "function" ? _a : Object])
], DocumentsController);


/***/ }),

/***/ "./src/modules/documents/documents.module.ts":
/*!***************************************************!*\
  !*** ./src/modules/documents/documents.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const documents_controller_1 = __webpack_require__(/*! ./documents.controller */ "./src/modules/documents/documents.controller.ts");
const documents_service_1 = __webpack_require__(/*! ./documents.service */ "./src/modules/documents/documents.service.ts");
const document_entity_1 = __webpack_require__(/*! @entities/document.entity */ "./src/entities/document.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! @entities/document-version.entity */ "./src/entities/document-version.entity.ts");
const document_category_entity_1 = __webpack_require__(/*! @entities/document-category.entity */ "./src/entities/document-category.entity.ts");
const document_permission_entity_1 = __webpack_require__(/*! @entities/document-permission.entity */ "./src/entities/document-permission.entity.ts");
const document_tag_entity_1 = __webpack_require__(/*! @entities/document-tag.entity */ "./src/entities/document-tag.entity.ts");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                document_entity_1.Document,
                document_version_entity_1.DocumentVersion,
                document_category_entity_1.DocumentCategory,
                document_permission_entity_1.DocumentPermission,
                document_tag_entity_1.DocumentTag,
            ]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    storage: (0, multer_1.diskStorage)({
                        destination: configService.get('UPLOAD_PATH', './uploads'),
                        filename: (req, file, callback) => {
                            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                            callback(null, uniqueName);
                        },
                    }),
                    limits: {
                        fileSize: configService.get('MAX_FILE_SIZE', 10485760),
                    },
                    fileFilter: (req, file, callback) => {
                        const allowedTypes = configService.get('ALLOWED_FILE_TYPES', 'pdf,doc,docx,txt,xlsx,xls').split(',');
                        const fileExtension = (0, path_1.extname)(file.originalname).toLowerCase().slice(1);
                        if (allowedTypes.includes(fileExtension)) {
                            callback(null, true);
                        }
                        else {
                            callback(new Error(`Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`), false);
                        }
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService],
        exports: [documents_service_1.DocumentsService],
    })
], DocumentsModule);


/***/ }),

/***/ "./src/modules/documents/documents.service.ts":
/*!****************************************************!*\
  !*** ./src/modules/documents/documents.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const document_entity_1 = __webpack_require__(/*! @entities/document.entity */ "./src/entities/document.entity.ts");
const document_version_entity_1 = __webpack_require__(/*! @entities/document-version.entity */ "./src/entities/document-version.entity.ts");
const document_category_entity_1 = __webpack_require__(/*! @entities/document-category.entity */ "./src/entities/document-category.entity.ts");
const document_permission_entity_1 = __webpack_require__(/*! @entities/document-permission.entity */ "./src/entities/document-permission.entity.ts");
const document_tag_entity_1 = __webpack_require__(/*! @entities/document-tag.entity */ "./src/entities/document-tag.entity.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
const fs = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
const path = __webpack_require__(/*! path */ "path");
const document_dto_1 = __webpack_require__(/*! ./dto/document.dto */ "./src/modules/documents/dto/document.dto.ts");
let DocumentsService = class DocumentsService {
    constructor(documentsRepository, versionsRepository, categoriesRepository, permissionsRepository, tagsRepository) {
        this.documentsRepository = documentsRepository;
        this.versionsRepository = versionsRepository;
        this.categoriesRepository = categoriesRepository;
        this.permissionsRepository = permissionsRepository;
        this.tagsRepository = tagsRepository;
    }
    async findAll(user, page = 1, limit = 10) {
        const query = this.documentsRepository.createQueryBuilder('document')
            .leftJoinAndSelect('document.category', 'category')
            .leftJoinAndSelect('document.current_version', 'current_version')
            .leftJoinAndSelect('document.created_by_user', 'created_by_user')
            .leftJoinAndSelect('document.tags', 'tags')
            .orderBy('document.updated_at', 'DESC');
        if (user.role === user_entity_1.UserRole.VIEWER || user.role === user_entity_1.UserRole.EDITOR) {
            query.leftJoin('document.permissions', 'permission')
                .where('document.created_by = :userId', { userId: user.id })
                .orWhere('permission.user_id = :userId', { userId: user.id })
                .orWhere('permission.role = :userRole', { userRole: user.role })
                .orWhere('document.status = :approvedStatus', { approvedStatus: document_entity_1.DocumentStatus.APPROVED });
        }
        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { data, total };
    }
    async findOne(id, user) {
        const document = await this.documentsRepository.findOne({
            where: { id },
            relations: ['category', 'current_version', 'created_by_user', 'versions', 'tags', 'permissions'],
        });
        if (!document) {
            throw new common_1.NotFoundException(`Documento con ID ${id} no encontrado`);
        }
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.READ);
        return document;
    }
    async create(createDocumentDto, file, user) {
        const document = this.documentsRepository.create({
            ...createDocumentDto,
            created_by: user.id,
            file_path: file.filename,
            status: document_entity_1.DocumentStatus.DRAFT,
        });
        const savedDocument = await this.documentsRepository.save(document);
        return this.findOne(savedDocument.id, user);
    }
    async update(id, updateDocumentDto, user) {
        const document = await this.findOne(id, user);
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.WRITE);
        Object.assign(document, updateDocumentDto);
        await this.documentsRepository.save(document);
        return this.findOne(id, user);
    }
    async remove(id, user) {
        const document = await this.findOne(id, user);
        if (user.role !== user_entity_1.UserRole.ADMIN && document.created_by !== user.id) {
            throw new common_1.ForbiddenException('No tienes permisos para eliminar este documento');
        }
        await this.documentsRepository.remove(document);
    }
    async uploadVersion(documentId, uploadVersionDto, file, user) {
        const document = await this.findOne(documentId, user);
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.WRITE);
        const fileBuffer = await fs.readFile(file.path);
        const checksum = (0, crypto_1.createHash)('sha256').update(fileBuffer).digest('hex');
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
            status: document_version_entity_1.DocumentVersionStatus.DRAFT,
        });
        const savedVersion = await this.versionsRepository.save(version);
        if (savedVersion.status === document_version_entity_1.DocumentVersionStatus.APPROVED) {
            document.current_version_id = savedVersion.id;
            await this.documentsRepository.save(document);
        }
        return savedVersion;
    }
    async getDocumentVersions(documentId, user) {
        const document = await this.documentsRepository.findOne({ where: { id: documentId } });
        if (!document) {
            throw new common_1.NotFoundException(`Documento con ID ${documentId} no encontrado`);
        }
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.READ);
        const versions = await this.versionsRepository.find({
            where: { document_id: documentId },
            order: { created_at: 'DESC' },
        });
        if (!versions.length) {
            console.warn(`No hay versiones para el documento ID ${documentId}`);
            return [];
        }
        console.log(`Se encontraron ${versions.length} versiones para el documento ID ${documentId}`);
        return versions.map((version) => new document_dto_1.DocumentVersionResponseDto(version));
    }
    async downloadVersion(versionId, user) {
        const version = await this.versionsRepository.findOne({
            where: { id: versionId },
            relations: ['document'],
        });
        if (!version) {
            throw new common_1.NotFoundException(`Versión con ID ${versionId} no encontrada`);
        }
        await this.checkDocumentPermission(version.document, user, document_permission_entity_1.PermissionType.READ);
        return {
            filePath: version.file_path,
            fileName: version.file_name,
        };
    }
    async getCategories() {
        return this.categoriesRepository.find();
    }
    async createCategory(name, description) {
        const category = this.categoriesRepository.create({ name, description });
        return this.categoriesRepository.save(category);
    }
    async addTag(documentId, tag, user) {
        const document = await this.findOne(documentId, user);
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.WRITE);
        const documentTag = this.tagsRepository.create({
            document_id: documentId,
            tag: tag.toLowerCase(),
        });
        return this.tagsRepository.save(documentTag);
    }
    async removeTag(documentId, tagId, user) {
        const document = await this.findOne(documentId, user);
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.WRITE);
        await this.tagsRepository.delete({ id: tagId, document_id: documentId });
    }
    async getDocumentPermissions(documentId, user) {
        const document = await this.findOne(documentId, user);
        if (![user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER].includes(user.role) && document.created_by !== user.id) {
            throw new common_1.ForbiddenException('No tienes permisos para ver los permisos de este documento');
        }
        return this.permissionsRepository.find({
            where: { document_id: documentId },
            relations: ['user', 'granted_by_user'],
        });
    }
    async searchDocuments(query, type, categoryId, status, user) {
        const queryBuilder = this.documentsRepository.createQueryBuilder('document')
            .leftJoinAndSelect('document.category', 'category')
            .leftJoinAndSelect('document.current_version', 'current_version')
            .leftJoinAndSelect('document.created_by_user', 'created_by_user')
            .leftJoinAndSelect('document.tags', 'tags');
        if (query) {
            queryBuilder.where('document.title LIKE :query OR document.description LIKE :query', {
                query: `%${query}%`,
            });
        }
        if (type) {
            queryBuilder.andWhere('document.document_type = :type', { type });
        }
        if (categoryId) {
            queryBuilder.andWhere('document.category_id = :categoryId', { categoryId });
        }
        if (status) {
            queryBuilder.andWhere('document.status = :status', { status });
        }
        if (user) {
            if (user.role === user_entity_1.UserRole.VIEWER || user.role === user_entity_1.UserRole.EDITOR) {
                queryBuilder.leftJoin('document.permissions', 'permission')
                    .andWhere('(document.created_by = :userId OR permission.user_id = :userId OR permission.role = :userRole OR document.status = :approvedStatus)', {
                    userId: user.id,
                    userRole: user.role,
                    approvedStatus: document_entity_1.DocumentStatus.APPROVED,
                });
            }
        }
        return queryBuilder.orderBy('document.updated_at', 'DESC').getMany();
    }
    async checkDocumentPermission(document, user, requiredPermission) {
        if (user.role === user_entity_1.UserRole.ADMIN) {
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
            .andWhere(new typeorm_2.Brackets(qb => {
            qb.where('(perm.user_id = :userId AND perm.permission_type = :permType)')
                .orWhere('(perm.role = :role AND perm.permission_type = :permType)')
                .orWhere('(perm.user_id = :userId AND perm.permission_type = :adminPerm)')
                .orWhere('(perm.role = :role AND perm.permission_type = :adminPerm)');
        }))
            .setParameters({
            userId: user.id,
            role: user.role,
            permType: requiredPermission,
            adminPerm: document_permission_entity_1.PermissionType.ADMIN,
        })
            .getOne();
        console.log('Resultado permiso:', permission);
        if (requiredPermission === document_permission_entity_1.PermissionType.READ && document.status === document_entity_1.DocumentStatus.APPROVED) {
            console.log('Permiso implícito para lectura en documento aprobado');
            return;
        }
        if (!permission) {
            console.log('Permiso denegado');
            throw new common_1.ForbiddenException('No tienes permisos para realizar esta acción en este documento');
        }
    }
    async createDocumentVersion(documentId, file, changeSummary, isMajorVersion, user) {
        const document = await this.documentsRepository.findOne({ where: { id: documentId } });
        if (!document)
            throw new common_1.NotFoundException('Documento no encontrado');
        await this.checkDocumentPermission(document, user, document_permission_entity_1.PermissionType.EDIT);
        const uploadDir = path.join(__dirname, '..', 'uploads', 'documents', String(documentId));
        await fs.mkdir(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-${file.originalname}`;
        const newFilePath = path.join(uploadDir, fileName);
        await fs.rename(file.path, newFilePath);
        const newVersion = this.versionsRepository.create({
            document_id: documentId,
            version_number: await this.getNextVersionNumber(documentId, isMajorVersion),
            file_name: file.originalname,
            file_path: path.join('uploads', 'documents', String(documentId), fileName),
            file_size: file.size,
            mime_type: file.mimetype,
            change_summary: changeSummary,
            status: document_version_entity_1.DocumentVersionStatus.PENDING_APPROVAL,
            created_by: user.id,
        });
        await this.versionsRepository.save(newVersion);
        return newVersion;
    }
    async getNextVersionNumber(documentId, isMajorVersion) {
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
        }
        else {
            minor++;
        }
        return `${major}.${minor}`;
    }
    async createPermission(documentId, dtos, user) {
        const document = await this.findOne(documentId, user);
        if (![user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER].includes(user.role)) {
            throw new common_1.ForbiddenException('No tienes permisos para asignar permisos');
        }
        await this.permissionsRepository.delete({ document_id: documentId });
        const newPermissions = dtos.map(dto => this.permissionsRepository.create({
            ...dto,
            document_id: documentId,
            granted_by: user.id,
            granted_at: new Date()
        }));
        return this.permissionsRepository.save(newPermissions);
    }
    async getUserPermissions(userId) {
        const perms = await this.permissionsRepository.find({
            where: { user_id: userId },
        });
        return perms.map(p => ({
            document_id: p.document_id,
            permission_type: p.permission_type,
        }));
    }
    async getMyPermissions(user) {
        const perms = await this.permissionsRepository.find({
            where: { user_id: user.id },
        });
        return perms.map(p => ({
            document_id: p.document_id,
            permission_type: p.permission_type,
        }));
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(document_version_entity_1.DocumentVersion)),
    __param(2, (0, typeorm_1.InjectRepository)(document_category_entity_1.DocumentCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(document_permission_entity_1.DocumentPermission)),
    __param(4, (0, typeorm_1.InjectRepository)(document_tag_entity_1.DocumentTag)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], DocumentsService);


/***/ }),

/***/ "./src/modules/documents/dto/document.dto.ts":
/*!***************************************************!*\
  !*** ./src/modules/documents/dto/document.dto.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginatedDocumentsDto = exports.DocumentVersionResponseDto = exports.DocumentResponseDto = exports.SearchDocumentsDto = exports.AddTagDto = exports.CreateCategoryDto = exports.UploadVersionDto = exports.UpdateDocumentDto = exports.CreateDocumentDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const document_entity_1 = __webpack_require__(/*! @entities/document.entity */ "./src/entities/document.entity.ts");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateDocumentDto {
}
exports.CreateDocumentDto = CreateDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Título del documento' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción del documento', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: document_entity_1.DocumentType,
        description: 'Tipo de documento'
    }),
    (0, class_validator_1.IsEnum)(document_entity_1.DocumentType),
    __metadata("design:type", typeof (_a = typeof document_entity_1.DocumentType !== "undefined" && document_entity_1.DocumentType) === "function" ? _a : Object)
], CreateDocumentDto.prototype, "document_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la categoría', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDocumentDto.prototype, "category_id", void 0);
class UpdateDocumentDto extends (0, swagger_1.PartialType)(CreateDocumentDto) {
}
exports.UpdateDocumentDto = UpdateDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: document_entity_1.DocumentStatus,
        description: 'Estado del documento',
        required: false
    }),
    (0, class_validator_1.IsEnum)(document_entity_1.DocumentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof document_entity_1.DocumentStatus !== "undefined" && document_entity_1.DocumentStatus) === "function" ? _b : Object)
], UpdateDocumentDto.prototype, "status", void 0);
class UploadVersionDto {
}
exports.UploadVersionDto = UploadVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resumen de cambios en esta versión' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadVersionDto.prototype, "change_summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si es una versión mayor (incrementa el número principal)',
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], UploadVersionDto.prototype, "is_major_version", void 0);
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la categoría' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción de la categoría', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
class AddTagDto {
}
exports.AddTagDto = AddTagDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Etiqueta a agregar' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddTagDto.prototype, "tag", void 0);
class SearchDocumentsDto {
}
exports.SearchDocumentsDto = SearchDocumentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Texto a buscar', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchDocumentsDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: document_entity_1.DocumentType,
        description: 'Tipo de documento a filtrar',
        required: false
    }),
    (0, class_validator_1.IsEnum)(document_entity_1.DocumentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof document_entity_1.DocumentType !== "undefined" && document_entity_1.DocumentType) === "function" ? _c : Object)
], SearchDocumentsDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de categoría a filtrar', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchDocumentsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: document_entity_1.DocumentStatus,
        description: 'Estado a filtrar',
        required: false
    }),
    (0, class_validator_1.IsEnum)(document_entity_1.DocumentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof document_entity_1.DocumentStatus !== "undefined" && document_entity_1.DocumentStatus) === "function" ? _d : Object)
], SearchDocumentsDto.prototype, "status", void 0);
class DocumentResponseDto {
}
exports.DocumentResponseDto = DocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: document_entity_1.DocumentType }),
    __metadata("design:type", typeof (_e = typeof document_entity_1.DocumentType !== "undefined" && document_entity_1.DocumentType) === "function" ? _e : Object)
], DocumentResponseDto.prototype, "document_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentResponseDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentResponseDto.prototype, "current_version_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: document_entity_1.DocumentStatus }),
    __metadata("design:type", typeof (_f = typeof document_entity_1.DocumentStatus !== "undefined" && document_entity_1.DocumentStatus) === "function" ? _f : Object)
], DocumentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentResponseDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], DocumentResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], DocumentResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "current_version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "created_by_user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], DocumentResponseDto.prototype, "tags", void 0);
class DocumentVersionResponseDto {
    constructor(entity) {
        this.id = entity.id;
        this.version_number = entity.version_number;
        this.file_name = entity.file_name;
        this.file_path = entity.file_path;
        this.status = entity.status;
        this.created_at = entity.created_at;
    }
}
exports.DocumentVersionResponseDto = DocumentVersionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentVersionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentVersionResponseDto.prototype, "document_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentVersionResponseDto.prototype, "version_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentVersionResponseDto.prototype, "file_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentVersionResponseDto.prototype, "file_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentVersionResponseDto.prototype, "mime_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentVersionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DocumentVersionResponseDto.prototype, "change_summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentVersionResponseDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DocumentVersionResponseDto.prototype, "approved_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], DocumentVersionResponseDto.prototype, "approved_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], DocumentVersionResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DocumentVersionResponseDto.prototype, "created_by_user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DocumentVersionResponseDto.prototype, "approved_by_user", void 0);
class PaginatedDocumentsDto {
}
exports.PaginatedDocumentsDto = PaginatedDocumentsDto;


/***/ }),

/***/ "./src/modules/users/dto/user.dto.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/dto/user.dto.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponseDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de usuario único' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electrónico' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contraseña' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Apellido' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: user_entity_1.UserRole,
        description: 'Rol del usuario',
        default: user_entity_1.UserRole.VIEWER
    }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _a : Object)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Usuario activo', default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "is_active", void 0);
class UpdateUserDto extends (0, swagger_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nueva contraseña', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.UserRole }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _b : Object)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "full_name", void 0);


/***/ }),

/***/ "./src/modules/users/users.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/users/users.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
const user_dto_1 = __webpack_require__(/*! ./dto/user.dto */ "./src/modules/users/dto/user.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/guards/jwt-auth.guard */ "./src/modules/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! @modules/auth/guards/roles.guard */ "./src/modules/auth/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! @modules/auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAll(page = 1, limit = 10) {
        return this.usersService.findAll(page, limit);
    }
    async findAlls() {
        return this.usersService.findAlls();
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        await this.usersService.remove(id);
        return { message: 'Usuario eliminado exitosamente' };
    }
    async getUsersByRole(role) {
        return this.usersService.getUsersByRole(role);
    }
    async updatePermissions(id, permissions) {
        return this.usersService.updatePermissions(id, permissions);
    }
    async getCurrentUserPermissions(req) {
        const userId = req.user?.id;
        if (!userId) {
            throw new common_1.NotFoundException('Usuario no autenticado');
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con id ${userId} no encontrado`);
        }
        return user.permissions;
    }
    async getProfile(req) {
        const userId = Number(req.user.id);
        const user = await this.usersService.findById(userId);
        return user;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear nuevo usuario' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario creado exitosamente', type: user_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los usuarios' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuarios', type: [user_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los usuarios' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuarios',
        type: [user_dto_1.UserResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAlls", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener usuario por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario encontrado', type: user_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario actualizado', type: user_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario eliminado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('role/:role'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener usuarios por rol' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuarios filtrados por rol', type: [user_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof user_entity_1.UserRole !== "undefined" && user_entity_1.UserRole) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UsersController.prototype, "getUsersByRole", null);
__decorate([
    (0, common_1.Patch)(':id/permissions'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar permisos de un usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_k = typeof Record !== "undefined" && Record) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePermissions", null);
__decorate([
    (0, common_1.Get)('me/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener permisos actuales del usuario' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UsersController.prototype, "getCurrentUserPermissions", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('usuarios'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./src/modules/users/users.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/users.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/modules/users/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./src/modules/users/users.service.ts":
/*!********************************************!*\
  !*** ./src/modules/users/users.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const user_entity_1 = __webpack_require__(/*! @entities/user.entity */ "./src/entities/user.entity.ts");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll(page = 1, limit = 10) {
        const [data, total] = await this.usersRepository.findAndCount({
            select: [
                'id',
                'username',
                'email',
                'first_name',
                'last_name',
                'role',
                'is_active',
                'created_at',
                'permissions',
            ],
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: 'DESC' },
        });
        return {
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            limit,
            data,
        };
    }
    async findAlls() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({
            where: { username },
        });
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
        });
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException('Usuario o email ya existe');
        }
        const user = this.usersRepository.create({
            ...createUserDto,
        });
        const savedUser = await this.usersRepository.save(user);
        const { password, ...result } = savedUser;
        return result;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            const saltRounds = 10;
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = await this.usersRepository.save(user);
        const { password, ...result } = updatedUser;
        return result;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }
    async validatePassword(usernameOrEmail, password) {
        let user = await this.findByUsernameForValidation(usernameOrEmail);
        if (!user) {
            user = await this.findByEmailForValidation(usernameOrEmail);
        }
        if (user && await bcrypt.compare(password, user.password)) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }
    async getUsersByRole(role) {
        return this.usersRepository.find({
            where: { role, is_active: true },
            select: ['id', 'username', 'email', 'first_name', 'last_name', 'role'],
        });
    }
    async findByUsernameForValidation(username) {
        return this.usersRepository.findOne({
            where: { username },
            select: ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
        });
    }
    async findByEmailForValidation(email) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
        });
    }
    async updatePermissions(userId, permissions) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        user.permissions = permissions;
        return this.usersRepository.save(user);
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        const permissions = this.getDefaultPermissions(user.role);
        return { ...user, permissions };
    }
    getDefaultPermissions(role) {
        switch (role) {
            case user_entity_1.UserRole.ADMIN:
                return { create: true, edit: true, delete: true, version: true };
            case user_entity_1.UserRole.MANAGER:
                return { create: true, edit: true, delete: false, version: true };
            case user_entity_1.UserRole.EDITOR:
                return { create: true, edit: true, delete: false, version: true };
            case user_entity_1.UserRole.VIEWER:
            default:
                return { create: false, edit: false, delete: false, version: false };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const express = __webpack_require__(/*! express */ "express");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const express_1 = __webpack_require__(/*! express */ "express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({ origin: true, credentials: true });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    platform_express_1.MulterModule.register({
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            },
        }),
    });
    app.use(express.json({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sistema de Gestión Documental')
        .setDescription('API para la gestión de documentos, versiones y aprobaciones')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
    console.log(`📚 Documentación disponible en: http://localhost:${port}/api/docs`);
}
bootstrap();

})();

/******/ })()
;