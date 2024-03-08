// import errorToJSON from 'error-to-json';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class NestJsExceptionHandler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
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
