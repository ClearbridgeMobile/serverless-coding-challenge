import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import models from 'Core/Database/Models/index';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  exports: [SequelizeModule],
})
export default class ModelsModule {}
