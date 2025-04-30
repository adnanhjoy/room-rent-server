// test/test.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './test.schema';
import { TestService } from './test.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Test', schema: TestSchema}])],
    providers: [TestService],
    exports: [TestService]
})
export class TestModule { }
