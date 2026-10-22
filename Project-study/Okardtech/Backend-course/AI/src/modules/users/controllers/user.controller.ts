import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { responseOne, responseMany } from '../../../utils/response';

const service = new UserService();

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = plainToInstance(QueryUserDto, req.query);
    const { data, total, page, limit } = await service.findAll(query);
    res.json(responseMany(data, { total, page, limit }));
  } catch (err) { next(err); }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await service.findById(Number(req.params.id));
    res.json(responseOne(user));
  } catch (err) { next(err); }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await service.create(req.body as CreateUserDto);
    res.status(201).json(responseOne(user));
  } catch (err) { next(err); }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await service.update(Number(req.params.id), req.body as UpdateUserDto);
    res.json(responseOne(user));
  } catch (err) { next(err); }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await service.remove(Number(req.params.id));
    res.status(204).send();
  } catch (err) { next(err); }
};
