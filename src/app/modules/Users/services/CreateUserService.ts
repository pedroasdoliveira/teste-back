import AppErrors from '../../../shared/errors/AppErrors';
import Users from '../../../models/Users';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
}

class CreateUserService {
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

  createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(data);
    } catch (err: any) {
      throw new AppErrors(err.message);
    }

    const userExist = await Users.findOne({
      where: {
        email: this.email,
      },
    });

    if (userExist) {
      throw new AppErrors('E-mail já cadastrado!', 409);
    }

    const hashedPassword = await hash(this.password, 8);

    const user = await Users.create({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordHash: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };
}

export default new CreateUserService();
