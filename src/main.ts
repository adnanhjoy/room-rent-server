import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  const config = new DocumentBuilder().setTitle("Room Rent Server").setDescription("Rent Service Management").setVersion('1.0').addTag('rent').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  console.log("Listening Port is ", `http://localhost:${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
