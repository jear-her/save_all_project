import { Request, Response, NextFunction } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { responseError } from '../utils/response';

// Custom application error with HTTP status code
export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public errors?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Global error handler — must have 4 params for Express to treat it as error middleware
export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  // Our custom errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json(responseError(err.message, err.errors));
    return;
  }

  // TypeORM — record not found
  if (err instanceof EntityNotFoundError) {
    res.status(404).json(responseError('Resource not found'));
    return;
  }

  // TypeORM — query / constraint errors
  if (err instanceof QueryFailedError) {
    const driver = err.driverError as { code?: string };
    if (driver?.code === 'ER_DUP_ENTRY') {
      res.status(409).json(responseError('Resource already exists'));
      return;
    }
    res.status(400).json(responseError('Database error'));
    return;
  }

  // JWT errors
  if (err instanceof TokenExpiredError) {
    res.status(401).json(responseError('Token expired'));
    return;
  }
  if (err instanceof JsonWebTokenError) {
    res.status(401).json(responseError('Invalid token'));
    return;
  }

  // Fallback
  console.error('[UNHANDLED ERROR]', err);
  res.status(500).json(responseError('Internal server error'));
};

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json(responseError(`Route not found: ${req.method} ${req.originalUrl}`));
};
