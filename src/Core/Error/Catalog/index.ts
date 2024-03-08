import { InternalServerErrorException } from '@nestjs/common';
import { GeneralError, GeneralErrorCode } from 'Core/Error/Catalog/General';

export * from './General';
export * from './UserError';

export const throwGeneralServerError = (requestedId?: number) => {
  throw new InternalServerErrorException({
    requestedId,
    ...GeneralError[GeneralErrorCode.INTERNAL_SERVER_ERROR],
  });
};
