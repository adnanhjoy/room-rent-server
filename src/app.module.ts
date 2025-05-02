import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-nest'), TestModule
  ],
  controllers: [AppController, TestController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
