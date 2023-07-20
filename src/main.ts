import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverconfig = config.get('server');
  const port = serverconfig.port;

  await app.listen(port);
  Logger.log(`Application is runnung on port${port}`);
}
bootstrap();
