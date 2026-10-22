import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { env } from './config/env';
import app from './app';
import { AppDataSource } from './config/database';

async function bootstrap(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();
