import { NotFoundException } from '@nestjs/common';
import { GeneralError, GeneralErrorCode } from 'Core/Error/Catalog';

export class ErrorFactory {
  static makeNotFoundByIdException({ requestedId }: { requestedId: any }) {
    return new NotFoundException({
      requestedId,
      ...GeneralError[GeneralErrorCode.RESOURCE_DOES_NOT_EXIST],
    });
  }

  static makeResourceNotFound({
    identifierName,
    identifierValue,
    resourceCode,
  }: {
    identifierName: any;
    identifierValue: any;
    resourceCode: any;
  }) {
    const message = `The ${resourceCode} resource was not found`;
    return new NotFoundException({
      ...GeneralError[GeneralErrorCode.RESOURCE_DOES_NOT_EXIST],
      message,
      identifierName,
      identifierValue,
    });
  }
}
