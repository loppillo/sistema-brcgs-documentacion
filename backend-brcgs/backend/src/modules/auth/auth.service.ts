import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { User, UserRole } from '@entities/user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<User | null> {
    return this.usersService.validatePassword(identifier, password);
  }

  async login(loginDto: LoginDto) {
    // Validar que se proporcione username o email
    if (!loginDto.username && !loginDto.email) {
      throw new UnauthorizedException('Debe proporcionar username o email');
    }

    // Determinar si se está usando email o username
    const identifier = loginDto.email || loginDto.username;
    
    const user = await this.validateUser(identifier, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
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

  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const existingEmail = await this.usersService.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Crear el usuario
    const userData = {
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      role: registerDto.role || UserRole.VIEWER,
    };

    const user = await this.usersService.create(userData);

    // Generar token
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

  async validateToken(payload: any): Promise<User | null> {
    return this.usersService.findOne(payload.sub);
  }
}
