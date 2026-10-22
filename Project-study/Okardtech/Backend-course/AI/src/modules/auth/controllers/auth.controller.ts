import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { AuthRequest } from '../../../middlewares/auth.middleware';
import { responseOne } from '../../../utils/response';

const service = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await service.register(req.body as RegisterDto);
    res.status(201).json(responseOne(result));
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await service.login(req.body as LoginDto);
    res.json(responseOne(result));
  } catch (err) { next(err); }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await service.getMe(req.user!.id);
    res.json(responseOne(user));
  } catch (err) { next(err); }
};

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await service.changePassword(req.user!.id, req.body as ChangePasswordDto);
    res.json(responseOne({ message: 'Password changed successfully' }));
  } catch (err) { next(err); }
};
