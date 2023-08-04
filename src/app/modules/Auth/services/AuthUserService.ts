import AppErrors from '../../../shared/errors/AppErrors';
import {
  createAccessToken,
  createRefreshToken,
} from '../../../shared/helpers/createToken';
import {
  SerializedUser,
  SerializedUserModel,
} from '../../../shared/helpers/serializedUser';
import Users from '../../../models/Users';

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

  public authUser = async ({ email, password }: Request): Promise<Response> => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppErrors('E-mail ou senha incorretos!', 401);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppErrors('E-mail ou senha incorretos!', 401);
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
