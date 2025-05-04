import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    type: String
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    minlength: 8
  })
  password: string;

  @Prop({
    type: String,
    enum: ["super-admin", "admin", "owner", "sub-owner", "user"],
    default: 'user'
  })
  role: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
