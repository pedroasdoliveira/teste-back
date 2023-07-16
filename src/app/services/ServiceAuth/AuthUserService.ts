import Users from "./../../models/Users";
import AppError from "./../../errors/AppError";
import {
  createAccessToken,
  createRefreshToken,
} from "../../helpers/createToken";
import {
  SerializedUser,
  SerializedUserModel,
} from "../../helpers/serializedUser";

interface Request {
  email: string;
  password: string;
}

interface Response {
  serializedUser: SerializedUser;
  token: string;
  refreshToken: string;
}

class AuthUserService {
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

  authUser = async ({ email, password }: Request): Promise<Response> => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const serializedUser = SerializedUserModel(user);

    return {
      serializedUser,
      token,
      refreshToken,
    };
  };
}

export default new AuthUserService();
