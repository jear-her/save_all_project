import { Router, RequestHandler } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateBody } from '../../../middlewares/validation.middleware';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { register, login, getProfile, changePassword } from '../controllers/auth.controller';

const router = Router();

router.post('/register',        validateBody(RegisterDto),       register as RequestHandler);
router.post('/login',           validateBody(LoginDto),          login as RequestHandler);
router.get('/profile',          authMiddleware,                  getProfile as RequestHandler);
router.post('/change-password', authMiddleware, validateBody(ChangePasswordDto), changePassword as RequestHandler);

export default router;
