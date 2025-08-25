import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el usuario o email ya existe
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException('Usuario o email ya existe');
    }

    // Nota: Se asume que la contraseña ya viene hasheada desde AuthService
    const user = this.usersRepository.create({
      ...createUserDto,
    });

    const savedUser = await this.usersRepository.save(user);
    
    // Retornar usuario sin contraseña
    const { password, ...result } = savedUser;
    return result as User;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si se proporciona nueva contraseña, hashearla
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    // Actualizar campos
    Object.assign(user, updateUserDto);
    
    const updatedUser = await this.usersRepository.save(user);
    
    // Retornar usuario sin contraseña
    const { password, ...result } = updatedUser;
    return result as User;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async validatePassword(usernameOrEmail: string, password: string): Promise<User | null> {
    // Intentar buscar por username primero, luego por email
    let user = await this.findByUsernameForValidation(usernameOrEmail);
    
    if (!user) {
      user = await this.findByEmailForValidation(usernameOrEmail);
    }
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result as User;
    }
    
    return null;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({
      where: { role, is_active: true },
      select: ['id', 'username', 'email', 'first_name', 'last_name', 'role'],
    });
  }

  async findByUsernameForValidation(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
    });
  }

  async findByEmailForValidation(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'is_active', 'created_at'],
    });
  }
}
