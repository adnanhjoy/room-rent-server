import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './test/test.module';
import { UserMiddlewareMiddleware } from './common/middleware/user.middleware/user.middleware.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.DB_URI ?? ''),
    TestModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddlewareMiddleware)
      .forRoutes({ path: '/test', method: RequestMethod.GET });
  }
}
