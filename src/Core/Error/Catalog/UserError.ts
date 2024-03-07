import { HttpStatus } from '@nestjs/common';

export enum UserErrorCode {
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export const UserError = {
  [UserErrorCode.EMAIL_ALREADY_EXISTS]: {
    code: UserErrorCode.EMAIL_ALREADY_EXISTS,
    statusCode: HttpStatus.CONFLICT,
    message: 'A user with the same email already exists',
  },
  [UserErrorCode.USER_NOT_FOUND]: {
    code: UserErrorCode.USER_NOT_FOUND,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User does not exist!',
  },
};
