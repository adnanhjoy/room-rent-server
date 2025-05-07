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
import { PropertyController } from './property/property.controller';
import { ApartmentController } from './apartment/apartment.controller';
import { ApartmentService } from './apartment/apartment.service';
import { ApartmentModule } from './apartment/apartment.module';
import { PropertyService } from './property/property.service';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.DB_URI ?? ''),
    TestModule,
    AuthModule,
    UserModule,
    ApartmentModule,
    PropertyModule,
  ],
  controllers: [AppController, TestController, PropertyController, ApartmentController],
  providers: [AppService, ApartmentService, PropertyService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddlewareMiddleware)
      .forRoutes({ path: '/test', method: RequestMethod.GET });
  }
}
