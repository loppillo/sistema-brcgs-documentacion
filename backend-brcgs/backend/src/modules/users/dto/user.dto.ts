import { IsString, IsEmail, IsEnum, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRole } from '@entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario único' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({ description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Nombre' })
  @IsString()
  @MaxLength(100)
  first_name: string;

  @ApiProperty({ description: 'Apellido' })
  @IsString()
  @MaxLength(100)
  last_name: string;

  @ApiProperty({ 
    enum: UserRole, 
    description: 'Rol del usuario',
    default: UserRole.VIEWER 
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'Usuario activo', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'Nueva contraseña', required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  full_name: string;
}
