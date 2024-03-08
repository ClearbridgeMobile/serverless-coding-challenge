import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { BadRequestException, ValidationError } from '@nestjs/common';
import * as _ from 'lodash';
import { ValidationErrorFactory } from 'Core/Validation/ValidationErrorFactory';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export const ValidationOptions: ValidationPipeOptions = {
  skipMissingProperties: false,
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  disableErrorMessages: false,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const validationMessages = validationErrors.map((validationError) => {
      return ValidationErrorFactory.transformToMessageList(validationError);
    });

    return new BadRequestException({
      message: 'Bad request',
      details: _.flatten(validationMessages),
    });
  },
  validationError: {
    target: false,
  },
};
