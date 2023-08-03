import { Request, Response } from 'express';

import AuthUserService from '../services/AuthUserService';
import { SendRefreshToken } from '../../../shared/helpers/sendRefreshToken';
import AppErrors from '@shared/errors/AppErrors';

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

  public store = async (req: Request, res: Response): Promise<Response> => {
    this.email = req.body.email;
    this.password = req.body.password;

    try {
      const { token, refreshToken, serializedUser } =
        await AuthUserService.authUser({
          email: this.email,
          password: this.password,
        });

      SendRefreshToken(res, token);

      return res.status(200).json({
        token,
        user: serializedUser,
      });
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(error.statusCode).json(error);
      } else {
        return res.status(500).json({
          msg: 'Error interno no servidor ao pegar informações!',
          error: error,
        });
      }
    }
  };
}

export default SessionController;
