import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppDataSource } from '../config/database';
import { User } from '../modules/users/entities/user.entity';
import { responseError } from '../utils/response';

// Extend Express Request to carry the authenticated user
export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json(responseError('Authorization token required'));
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.id, isActive: true },
    });

    if (!user) {
      res.status(401).json(responseError('User not found or inactive'));
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json(responseError('Token expired'));
      return;
    }
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json(responseError('Invalid token'));
      return;
    }
    next(err);
  }
};
