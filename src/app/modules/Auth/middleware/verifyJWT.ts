import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

interface TokenPayload {
  id: string;
  name: string;
}

interface AuthenticatedRequest extends Request {
  authenticated?: boolean;
}

const VerifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    throw new AppError('ERRO SESSÃO EXPIRADA!', 403);
  }
  console.log(accessToken);

  try {
    const validToken = verify(accessToken, authConfig.secret);

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    console.log(error);
    throw new AppError('Token invalido', 403);
  }
};

export default VerifyJWT;
