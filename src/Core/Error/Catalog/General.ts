import { HttpStatus } from '@nestjs/common';

export enum GeneralErrorCode {
  RESOURCE_DOES_NOT_EXIST = 'RESOURCE_DOES_NOT_EXIST',
  RESOURCES_DO_NOT_EXIST = 'RESOURCES_DO_NOT_EXIST',
  BAD_REQUEST_DATA = 'BAD_REQUEST_DATA',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TOKEN_VALIDATION_FAILED = 'TOKEN_VALIDATION_FAILED',
}

export const GeneralError = {
  [GeneralErrorCode.RESOURCE_DOES_NOT_EXIST]: {
    code: GeneralErrorCode.RESOURCE_DOES_NOT_EXIST,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'The resource does not exist',
  },
  [GeneralErrorCode.RESOURCES_DO_NOT_EXIST]: {
    code: GeneralErrorCode.RESOURCES_DO_NOT_EXIST,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'The resources resources do not exist',
  },
  [GeneralErrorCode.BAD_REQUEST_DATA]: {
    code: GeneralErrorCode.BAD_REQUEST_DATA,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The request data is invalid',
  },
  [GeneralErrorCode.INTERNAL_SERVER_ERROR]: {
    code: GeneralErrorCode.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      'An unexpected error occurred. Our engineers are working on it, please try again later',
  },
  [GeneralErrorCode.SERVICE_UNAVAILABLE]: {
    code: GeneralErrorCode.SERVICE_UNAVAILABLE,
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    message:
      'Oops it seems something has gone wrong with a service, please retry request',
  },
  [GeneralErrorCode.TOKEN_VALIDATION_FAILED]: {
    code: GeneralErrorCode.TOKEN_VALIDATION_FAILED,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Invalid token received, please try again later',
  },
};
