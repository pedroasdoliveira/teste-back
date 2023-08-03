import Users from '../../modules/Users/model/Users';

export interface SerializedUser {
  id: number;
  name: string;
  email: string;
  tokenHash?: string;
}

export const SerializedUserModel = (user: Users): SerializedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    tokenHash: user.tokenHash,
  };
};
