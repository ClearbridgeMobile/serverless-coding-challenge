import { Module } from '@nestjs/common';
import FounderController from 'App/Controllers/V1/FounderController';
import CompanyController from 'App/Controllers/V1/CompanyController';
import FounderDomainModule from 'Domain/Founder/founder-domain.module';
import CompanyDomainModule from 'Domain/Company/company-domain.module';

@Module({
  imports: [FounderDomainModule, CompanyDomainModule],
  controllers: [FounderController, CompanyController],
})
export default class PlatformV1Module {}
