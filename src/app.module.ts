import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigurationModule from "@src/Config";
import ApplicationModule from "App/application.module";
import {DatabaseModule} from "Core/Database/database.module";
import ValidationDecoratorsModule from "Core/Decorators/Validations/validation.decorators.module";

@Module({
  imports: [
    ConfigurationModule.register(),
    ApplicationModule,
    DatabaseModule,
    ValidationDecoratorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
