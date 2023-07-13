import AppError from "app/errors/AppError";
import Users from "app/models/Users";
import { hash } from "bcryptjs";
import * as Yup from "yup";

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  id: number;
  name: string;
  email: string;
}

const createUserService = async ({
  name,
  email,
  password,
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  try {
    await schema.validate({
      name,
      email,
      password,
    });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const userExist = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (userExist) {
    throw new AppError("E-mail já cadastrado!", 409);
  }

  const hashedPassword = await hash(password, 8);

  const User = await Users.create({
    name,
    email,
    password,
    passwordHash: hashedPassword,
  });

  return {
    id: User.id,
    name: User.name,
    email: User.email,
  };
};

export default createUserService;
