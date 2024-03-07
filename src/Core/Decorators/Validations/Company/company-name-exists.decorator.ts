import { Injectable } from '@nestjs/common';
import SlugIt from 'Core/Common/Utils/slugit';
import { CompanyRepository } from 'Core/Database/Repositories/Company/CompanyRepository';
import { AdminCompanyError, AdminCompanyErrorCode } from 'Core/Error/Catalog/Admin/AdminCompanyError';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function CompanyNameExists(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CompanyNameExistsConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'AccountExists' })
@Injectable()
export class CompanyNameExistsConstraint implements ValidatorConstraintInterface {
  constructor(private companyRepo: CompanyRepository) {}
  async validate(value: string, args: ValidationArguments) {
    const slug = SlugIt.make(value);
    const company = await this.companyRepo.findCompanyBySlug(slug);
    return company === null;
  }

  defaultMessage(args: ValidationArguments) {
    return AdminCompanyError[AdminCompanyErrorCode.COMPANY_EXISTS].message;
  }
}
