import {Module} from '@nestjs/common';
import {CompanyNameExistsConstraint} from 'Core/Decorators/Validations/Company/company-name-exists.decorator';

@Module({
  providers: [
    CompanyNameExistsConstraint,
  ],
  exports: [
    CompanyNameExistsConstraint,
  ],
})
export default class ValidationDecoratorsModule {}
