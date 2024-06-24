import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';
import appError from '../../errors/appError';

const loginUserFromDB = async (payload: TLoginUser) => {
  const userData = await User.findOne({ email: payload?.email });

  if (!userData) {
    throw new appError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData?.password,
  );
  if (!isPasswordMatched) {
    throw new appError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }

  const jwtPayload = {
    email: userData?.email,
    role: userData?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expire_in as string,
  );

  return { accessToken, userData };
};

export const AuthServices = {
  loginUserFromDB,
};
