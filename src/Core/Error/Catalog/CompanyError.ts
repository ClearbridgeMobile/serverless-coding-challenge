import { HttpStatus } from '@nestjs/common';

export enum CompanyErrorCode {
  COMPANY_EXISTS = 'COMPANY_EXISTS',
  COMPANY_NOT_EXISTS = 'COMPANY_NOT_EXISTS',

}

export const CompanyError = {
  [CompanyErrorCode.COMPANY_EXISTS]: {
    code: CompanyErrorCode.COMPANY_EXISTS,
    statusCode: HttpStatus.CONFLICT,
    message: 'Company already exists',
  },

  [CompanyErrorCode.COMPANY_NOT_EXISTS]: {
    code: CompanyErrorCode.COMPANY_NOT_EXISTS,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Company does not exists',
  },
};
