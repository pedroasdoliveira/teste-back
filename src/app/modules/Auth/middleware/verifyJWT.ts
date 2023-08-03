import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import AppErrors from '../../../shared/errors/AppErrors';
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
    throw new AppErrors('ERRO SESSÃO EXPIRADA!', 403);
  }

  try {
    const validToken = verify(accessToken, authConfig.secret);

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    console.log(error);
    throw new AppErrors('Token invalido', 403);
  }
};

export default VerifyJWT;
