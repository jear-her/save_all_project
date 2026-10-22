import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../../config/database';
import { User, UserRole } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { AppError } from '../../../middlewares/error.middleware';
import { env } from '../../../config/env';

type SafeUser = Omit<User, 'password'>;

export class AuthService {
  private readonly repo = AppDataSource.getRepository(User);

  private signToken(userId: number): string {
    return jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  private stripPassword(user: User): SafeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe as SafeUser;
  }

  async register(dto: RegisterDto): Promise<{ user: SafeUser; token: string }> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new AppError('Email already in use', 409);

    const user = this.repo.create({
      firstName: dto.firstName,
      lastName:  dto.lastName,
      email:     dto.email,
      password:  await argon2.hash(dto.password),
      role:      UserRole.USER,
    });

    const saved = await this.repo.save(user);
    return { user: this.stripPassword(saved), token: this.signToken(saved.id) };
  }

  async login(dto: LoginDto): Promise<{ user: SafeUser; token: string }> {
    // Must addSelect because password column has select: false
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email AND user.isActive = true', { email: dto.email })
      .getOne();

    if (!user) throw new AppError('Invalid credentials', 401);

    const valid = await argon2.verify(user.password, dto.password);
    if (!valid) throw new AppError('Invalid credentials', 401);

    return { user: this.stripPassword(user), token: this.signToken(user.id) };
  }

  async getMe(userId: number): Promise<SafeUser> {
    const user = await this.repo.findOne({ where: { id: userId, isActive: true } });
    if (!user) throw new AppError('User not found', 404);
    return this.stripPassword(user);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) throw new AppError('User not found', 404);

    const valid = await argon2.verify(user.password, dto.currentPassword);
    if (!valid) throw new AppError('Current password is incorrect', 401);

    user.password = await argon2.hash(dto.newPassword);
    await this.repo.save(user);
  }
}
