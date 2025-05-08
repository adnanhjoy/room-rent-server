import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TestDocument = HydratedDocument<Test>;

@Schema({ timestamps: true })
export class Test {
  @Prop({
    required: true,
  })
  name: string;
  @Prop()
  age: number;

  // @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

export const TestSchema = SchemaFactory.createForClass(Test);
