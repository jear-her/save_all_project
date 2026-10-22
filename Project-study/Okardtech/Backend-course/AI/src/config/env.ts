import dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env variable: ${name}`);
  return value;
}

export const env = {
  NODE_ENV:      process.env.NODE_ENV ?? 'development',
  PORT:          parseInt(process.env.PORT ?? '3000', 10),
  DB_HOST:       requireEnv('DB_HOST'),
  DB_PORT:       parseInt(process.env.DB_PORT ?? '3306', 10),
  DB_USERNAME:   requireEnv('DB_USERNAME'),
  DB_PASSWORD:   requireEnv('DB_PASSWORD'),
  DB_DATABASE:   requireEnv('DB_DATABASE'),
  JWT_SECRET:    requireEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
};
