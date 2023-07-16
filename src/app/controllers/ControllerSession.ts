import AuthUserService from "../services/ServiceAuth/AuthUserService";
import { Request, Response } from "express";
import { SendRefreshToken } from "../helpers/sendRefreshToken";
import AppError from "../errors/AppError";

class SessionController {
  private _email: string;
  private _password: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  store = async (req: Request, res: Response): Promise<Response> => {
    this.email = req.body.email;
    this.password = req.body.password;

    try {
      const { token, refreshToken, serializedUser } =
        await AuthUserService.authUser({
          email: this.email,
          password: this.password,
        });

      const test = SendRefreshToken(res, token);

      return res.status(200).json({
        token,
        user: serializedUser,
      });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        const exception = new Error((err as Error).message);
        console.error(err);
        return res.status(500).json({ error: exception.message });
      }
    }
  };
}

export default SessionController;
