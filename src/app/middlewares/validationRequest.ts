import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log('Checker MiddleWare.....', req.body);
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
