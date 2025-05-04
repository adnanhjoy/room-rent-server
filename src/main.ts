import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: false
  });
  // console.log("Listening Port is ", process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
