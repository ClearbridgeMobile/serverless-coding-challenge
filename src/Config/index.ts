import database from './database';
import { ConfigModule } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const envFile = process.env.NODE_ENV;

export default class ConfigurationModule {
  static register() {
    return ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/.env${
        process.env.NODE_ENV !== 'docker' ? '' : '.' + envFile
      }`,
      load: [database],
    });
  }
}
