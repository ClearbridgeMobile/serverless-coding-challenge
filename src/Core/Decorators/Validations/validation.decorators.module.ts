import {Module} from '@nestjs/common';
import {CompanyNameExistsConstraint} from 'Core/Decorators/Validations/Company/company-name-exists.decorator';
import {CompanyExistsConstraint} from "Core/Decorators/Validations/Company/company-exists.decorator";

@Module({
  providers: [
    CompanyNameExistsConstraint,
    CompanyExistsConstraint
  ],
  exports: [
    CompanyNameExistsConstraint,
    CompanyExistsConstraint
  ],
})
export default class ValidationDecoratorsModule {}
