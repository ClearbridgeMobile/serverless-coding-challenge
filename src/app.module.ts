import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigurationModule from "@src/Config";
import ApplicationModule from "App/application.module";
import {DatabaseModule} from "Core/Database/database.module";

@Module({
  imports: [
    ConfigurationModule.register(),
    ApplicationModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
