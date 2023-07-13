import { Request, Response } from "express";
import createUserService from "./../services/ServiceAuth/CreateUserService";
import AppError from "./../errors/AppError";
import Users from "./../models/Users";

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const data = await createUserService({
      name,
      email,
      password,
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
};

export const show = async (req: Request, res: Response): Promise<Response> => {
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
};
