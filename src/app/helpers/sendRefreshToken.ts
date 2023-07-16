import { Response } from "express";

export const SendRefreshToken = (res: Response, token: string): void => {
  res.cookie("access-token", token, {
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: true,
  });
};
