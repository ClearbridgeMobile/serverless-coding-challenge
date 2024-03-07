import { Module } from '@nestjs/common';
import FounderService from "Domain/Founder/FounderService";

@Module({
  imports: [],
  providers: [FounderService],
  exports: [FounderService],
})
export default class FounderDomainModule {}
