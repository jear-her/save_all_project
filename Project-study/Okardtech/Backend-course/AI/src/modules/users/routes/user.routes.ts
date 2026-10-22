import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { validateBody } from '../../../middlewares/validation.middleware';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

router.get('/api/user',     getUsers);
router.get('/:id',  getUserById);
router.post('/',    validateBody(CreateUserDto), createUser);
router.put('/:id',  validateBody(UpdateUserDto), updateUser);
router.delete('/:id', deleteUser);

export default router;
