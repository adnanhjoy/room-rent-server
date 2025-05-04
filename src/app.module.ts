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
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserMiddlewareMiddleware } from './common/middleware/user.middleware/user.middleware.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-nest'), TestModule, AuthModule
  ],
  controllers: [AppController, TestController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddlewareMiddleware)
      .forRoutes({ path: '/test', method: RequestMethod.GET });
  }
}
