import argon2 from 'argon2';
import { AppDataSource } from '../../../config/database';
import { User, UserRole } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { AppError } from '../../../middlewares/error.middleware';

// Whitelist prevents arbitrary column injection via sortBy param
const ALLOWED_SORT_FIELDS = ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'];

export class UserService {
  private readonly repo = AppDataSource.getRepository(User);

  async findAll(query: QueryUserDto): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', order = 'DESC' } = query;
    const safeSort = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';

    const qb = this.repo.createQueryBuilder('user');

    if (search) {
      qb.where(
        '(user.firstName LIKE :s OR user.lastName LIKE :s OR user.email LIKE :s)',
        { s: `%${search}%` },
      );
    }

    qb.orderBy(`user.${safeSort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new AppError('Email already in use', 409);

    const hashed = await argon2.hash(dto.password);
    const user = this.repo.create({ ...dto, password: hashed, role: dto.role ?? UserRole.USER });
    return this.repo.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.repo.softRemove(user);
  }
}
