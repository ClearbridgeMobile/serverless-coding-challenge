// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BadRequestException, ValidationError } from '@nestjs/common';
import { GeneralError, GeneralErrorCode } from 'Core/Error/Catalog';
import { ValidationResult } from 'joi';
import * as _ from 'lodash';

export class ValidationErrorFactory {
  /**
   *
   * @param message
   * @param joiResult
   * @param contextData
   */
  static makeErrorIfJoiValidationFailed({
    message,
    joiResult,
    contextData = {},
  }: {
    message: string;
    joiResult: ValidationResult;
    contextData?: Record<string, any>;
  }): BadRequestException | void {
    if (joiResult.error) {
      const details = joiResult.error.details.map((detail) => {
        return detail.message;
      });

      return ValidationErrorFactory.makeError({
        message,
        details,
        contextData,
      });
    }
  }

  static makeError({
    message,
    details = [],
    contextData = {},
  }: {
    message: string;
    details?: Array<string>;
    contextData?: Record<string, any>;
  }): BadRequestException {
    return new BadRequestException({
      ...GeneralError[GeneralErrorCode.BAD_REQUEST_DATA],
      message,
      details,
      ...contextData,
    });
  }

  /**
   * Transform a native NestJS ValidationError object into a flat list of validation error messages.
   * @param validationError
   * @param parentPath
   */
  static transformToMessageList(
    validationError: ValidationError,
    parentPath?: string | null | undefined,
  ): string[] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let messages = [];

    let newParentPath: string | null | undefined;

    if (!parentPath) {
      newParentPath = `${validationError.property}`;
    } else {
      newParentPath = `${parentPath}.${validationError.property}`;
    }

    if (validationError.children) {
      const messagesFromChildErrors = validationError.children.map(
        (childValidationError) => {
          return this.transformToMessageList(
            childValidationError,
            newParentPath,
          );
        },
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      messages = [...messages, ...messagesFromChildErrors];
    }

    if (validationError.constraints) {
      const failedConstraintsMessages = Object.keys(
        validationError.constraints,
      ).map((constraintKey) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const validationMessage = validationError.constraints[constraintKey];

        const parentPathPrefix = !!parentPath ? parentPath + '.' : '';
        return `${parentPathPrefix}${validationMessage}`;
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      messages = [...messages, ...failedConstraintsMessages];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return _.flatten(messages);
  }
}
