import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import serverlessExpress from '@vendia/serverless-express';
import { NestJsExceptionHandler } from 'Core/Error/NestJsExceptionHandler';
import { ValidationOptions } from 'Core/Validation/Http/ValidationPipeOptions';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

export class Application {
  private readonly port: string | number;
  private readonly nodeEnv: string;
  private readonly sentryDns: string;
  protected app: NestApplication;
  constructor() {
    this.port = process.env.PORT || 5000;
  }
  public async init() {
    await this.createApp();
    this.appHeaders();
    this.initSwaggerDoc();
    this.exceptionHandler();
    await this.app.listen(this.port);
    //await this.queueWorker();
  }

  public async initServerless() {
    await this.createApp();
    this.appHeaders();
    this.initSwaggerDoc();
    this.exceptionHandler();
    await this.app.init();
    const expressApp = this.app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }

  private async createApp() {
    this.app = await NestFactory.create(AppModule, { bodyParser: true });
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }
  private appHeaders() {
    this.app.use(helmet());
    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    this.app.use(cookieParser());
    this.app.use(bodyParser.json({ limit: '1000mb' }));
    this.app.useGlobalPipes(new ValidationPipe(ValidationOptions));
  }

  private initSwaggerDoc() {
    const config = new DocumentBuilder()
      .setTitle('Serverless NestJS API')
      .setDescription('Serverless NestJS API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
  }

  private exceptionHandler() {
    //app exception handler
    const { httpAdapter } = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new NestJsExceptionHandler(httpAdapter));
  }
}
