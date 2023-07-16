import { Request, Response } from "express";
import CreateUserService from "../services/ServiceAuth/CreateUserService";
import AppError from "../errors/AppError";
import Users from "../models/Users";

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

  store = async (req: Request, res: Response): Promise<Response> => {
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
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        const exception = new Error((err as Error).message);
        console.error(err);
        return res.status(500).json({ error: exception.message });
      }
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await Users.findAll();

      return res.status(200).json({ data });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      } else {
        const exception = new Error((err as Error).message);
        console.error(err);
        return res.status(500).json({ error: exception.message });
      }
    }
  }
}

export default UserController;
