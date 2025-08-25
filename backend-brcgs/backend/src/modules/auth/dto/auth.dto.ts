import { IsString, MinLength, IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@entities/user.entity';

export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'Token de acceso JWT' })
  access_token: string;

  @ApiProperty({ description: 'Información del usuario' })
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    full_name: string;
  };
}

export class RegisterDto {
  @ApiProperty({ description: 'Nombre de usuario' })
  @IsString()
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
  first_name: string;

  @ApiProperty({ description: 'Apellido' })
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Rol del usuario', enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
