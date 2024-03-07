// import errorToJSON from 'error-to-json';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class NestJsExceptionHandler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (process.env.NODE_ENV !== 'local' && !this.filterExcludedExceptions(exception)) {
      Sentry.captureException(exception);
    }
    super.catch(exception, host);
  }

  filterExcludedExceptions(exception: any): boolean {
    const excludedExceptions = [
      'BadRequestException',
      'UnauthorizedException',
      'ForbiddenException',
      'NotFoundException',
      'MethodNotAllowedException',
      'NotAcceptableException',
      'ConflictException',
      'GoneException',
      'PayloadTooLargeException',
      'UnsupportedMediaTypeException',
      'UnprocessableEntityException',
      'NotImplementedException',
    ];
    return excludedExceptions.includes(exception.constructor.name);
  }
}
