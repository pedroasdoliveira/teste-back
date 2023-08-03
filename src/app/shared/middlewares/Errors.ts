import { NextFunction, Request, Response } from 'express';
import AppErrors from '@shared/errors/AppErrors';

const Errors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppErrors) {
    return res
      .status(error.statusCode)
      .json({ status: 'Error', message: error.message });
  }

  return res
    .status(500)
    .json({ status: 'Error', message: 'Internal server error!' });
};

export default Errors;
