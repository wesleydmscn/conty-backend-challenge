import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('WorkerBootstrap');
  logger.log('Payout Worker started successfully');
}

void bootstrap();
