import { Request, Response, NextFunction } from "express";
import jwt, { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface TokenPayload {
  id: string;
  name: string;
}

const VerifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    throw new AppError("ERRO SESSÃO EXPIRADA!", 403);
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
    throw new AppError("Token invalido", 403);
  }

  return next();

  // const token = authHeader.split(" ")[1];
  // jwt.verify(
  //   token,
  //   process.env.ACCESS_TOKEN_SECRET as string,
  //   (err, decoded) => {
  //     if (err) {
  //       return res.sendStatus(403);
  //     }

  //     next();
  //   },
  // );
};

export default VerifyJWT;
