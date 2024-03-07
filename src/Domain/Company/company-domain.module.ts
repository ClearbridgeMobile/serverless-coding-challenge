import { Module } from '@nestjs/common';
import CompanyService from "Domain/Company/CompanyService";

@Module({
  imports: [],
  providers: [CompanyService],
  exports: [CompanyService],
})
export default class CompanyDomainModule {}
