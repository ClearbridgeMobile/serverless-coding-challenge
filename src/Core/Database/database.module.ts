import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import models from 'Core/Database/Models';
import ModelsModule from 'Core/Database/Models/models.module';
import { EntityTransactionService } from 'Core/Database/entity-transaction.service';
import {FounderRepository} from "Core/Database/Repositories/FounderRepository";
import {CompanyRepository} from "Core/Database/Repositories/CompanyRepository";

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('sequelize'),
          synchronize: false,
          models,
          dialectOptions: {
            useUTC: true,
          },
          pool: {
            max: 20,
            min: 0,
            acquire: 60000,
            idle: 30000,
          },
          define: {
            freezeTableName: true,
          },
          timezone: 'UTC',
          // eslint-disable-next-line no-console
          logging: false,
        };
      },
    }),
    ModelsModule,
  ],
  providers: [
    EntityTransactionService,
    FounderRepository,
    CompanyRepository,
  ],
  exports: [
    EntityTransactionService,
    FounderRepository,
    CompanyRepository,
  ],
})
export class DatabaseModule {}
