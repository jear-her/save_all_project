import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { env } from './env';

export const AppDataSource = new DataSource({
  type:        'mysql',
  host:        env.DB_HOST,
  port:        env.DB_PORT,
  username:    env.DB_USERNAME,
  password:    env.DB_PASSWORD,
  database:    env.DB_DATABASE,
  // Auto-sync in dev only; run migrations in production
  synchronize: env.NODE_ENV === 'development',
  logging:     env.NODE_ENV === 'development',
  entities:    [User],
  migrations:  [],
  subscribers: [],
});
