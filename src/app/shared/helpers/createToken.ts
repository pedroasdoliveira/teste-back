import { sign } from 'jsonwebtoken';

import Users from '../../modules/Users/model/Users';
import authConfig from '../../config/auth';

export const createAccessToken = (user: Users) => {
  const { secret, expiresIn } = authConfig;

  return sign({ id: user.id, name: user.name }, secret, {
    expiresIn,
  });
};

export const createRefreshToken = (user: Users) => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, tokenHash: user.tokenHash }, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};
