import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Room Rent Server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    /* .addApiKey(
      {
        type: 'apiKey',
        name: 'secret',
        in: 'header',
      },
      'api-key',
    ) */
    .setDescription('Rent Service Management')
    .setVersion('1.0')
    .addTag('Room Rent')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  console.log('Listening Port is ', `http://localhost:${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
