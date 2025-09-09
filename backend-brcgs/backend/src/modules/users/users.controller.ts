import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, NotFoundException,Req, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserPermissions, UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { UserRole } from '@entities/user.entity';


@ApiTags('usuarios')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [UserResponseDto] })
  async findAll( @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,) {
    return this.usersService.findAll(page, limit);
  }

  @Get('all')
@Roles(UserRole.ADMIN, UserRole.MANAGER)
@ApiOperation({ summary: 'Obtener todos los usuarios' })
@ApiResponse({
  status: 200,
  description: 'Lista de usuarios',
  type: [UserResponseDto],
})
async findAlls() {
  return this.usersService.findAlls();
}




  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: UserResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: UserResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'Usuario eliminado exitosamente' };
  }

  @Get('role/:role')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Obtener usuarios por rol' })
  @ApiResponse({ status: 200, description: 'Usuarios filtrados por rol', type: [UserResponseDto] })
  async getUsersByRole(@Param('role') role: UserRole): Promise<UserResponseDto[]> {
    return this.usersService.getUsersByRole(role);
  }

  @Patch(':id/permissions')
@Roles(UserRole.ADMIN)
@ApiOperation({ summary: 'Actualizar permisos de un usuario' })
async updatePermissions(
  @Param('id', ParseIntPipe) id: number,
  @Body() permissions: Record<string, boolean>
) {
  return this.usersService.updatePermissions(id, permissions);
}

@Get('me/permissions')
  @ApiOperation({ summary: 'Obtener permisos actuales del usuario' })
  async getCurrentUserPermissions(@Request() req): Promise<UserPermissions> {
    // req.user es poblado por JwtAuthGuard
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new NotFoundException('Usuario no autenticado');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // Retorna solo los permisos
    return user.permissions;
  }

@Get('me')
async getProfile(@Request() req: any) {
  const userId = Number(req.user.id); // 👈 asegura que sea número
  const user = await this.usersService.findById(userId);
  return user;
}
}
