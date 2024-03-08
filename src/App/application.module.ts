import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import PlatformV1Module from 'App/Controllers/V1/platform.v1.module';

@Module({
  imports: [
    PlatformV1Module,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'v1',
            children: [
              {
                path: '/',
                module: PlatformV1Module,
              },
            ],
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export default class ApplicationModule {}
