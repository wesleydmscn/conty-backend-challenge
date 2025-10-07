import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

import { AppModule } from './app.module';

import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Conty - PIX')
    .setDescription('API for PIX payouts batch processing')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      metaData: {
        title: 'Conty Backend Challenge - PIX',
      },
      showToolbar: 'never',
      layout: 'classic',
      content: document,
    }),
  );

  await app.listen(env.serverPort ?? 3000);
}

void bootstrap();
