import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import Users from '../../../models/Users';
import AppErrors from '@shared/errors/AppErrors';

class UserController {
  private _name: string;
  private _email: string;
  private _password: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

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
    this.name = req.body.name;
    this.email = req.body.email;
    this.password = req.body.password;

    try {
      const data = await CreateUserService.createUser({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      return res.status(201).json({ data });
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

  public show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await Users.findAll();

      return res.status(200).json({ data });
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

export default UserController;
