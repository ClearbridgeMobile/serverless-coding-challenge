import {Injectable} from '@nestjs/common';
import SlugIt from 'Core/Common/Utils/slugit';
import {CompanyRepository} from 'Core/Database/Repositories/CompanyRepository';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {CompanyError, CompanyErrorCode} from "Core/Error/Catalog/CompanyError";

export function CompanyExists(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CompanyExistsConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'AccountExists' })
@Injectable()
export class CompanyExistsConstraint implements ValidatorConstraintInterface {
  constructor(private companyRepo: CompanyRepository) {}
  async validate(value: number, args: ValidationArguments) {
    const company = await this.companyRepo.findById({id: value});
    return company !== null;
  }

  defaultMessage(args: ValidationArguments) {
    return CompanyError[CompanyErrorCode.COMPANY_NOT_EXISTS].message;
  }
}
