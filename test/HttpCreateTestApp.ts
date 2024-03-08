import { TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { ValidationOptions } from 'Core/Validation/Http/ValidationPipeOptions';
import { HttpAdapterHost } from '@nestjs/core';
import { NestJsExceptionHandler } from 'Core/Error/NestJsExceptionHandler';

export default class HttpCreateTestApp {
  public static async make(moduleBuilder: TestingModule) {
    const app = moduleBuilder.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(ValidationOptions));
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new NestJsExceptionHandler(httpAdapter));
    await app.init();
    return app;
  }
}
