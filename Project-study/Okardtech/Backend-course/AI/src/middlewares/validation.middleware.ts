import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { responseError } from '../utils/response';

type Constructor<T extends object> = new () => T;

export const validateBody = <T extends object>(DtoClass: Constructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const instance = plainToInstance(DtoClass, req.body);
    const errors = await validate(instance, {
      whitelist: true,            // strip unknown fields
      forbidNonWhitelisted: true, // reject unknown fields
    });

    if (errors.length > 0) {
      const details = errors.map((e) => ({
        field:    e.property,
        messages: Object.values(e.constraints ?? {}),
      }));
      res.status(422).json(responseError('Validation failed', details));
      return;
    }

    req.body = instance;
    next();
  };
};
