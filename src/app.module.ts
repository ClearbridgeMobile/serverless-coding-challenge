import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigurationModule from "@src/Config";
import ApplicationModule from "App/application.module";

@Module({
  imports: [
    ConfigurationModule.register(),
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
