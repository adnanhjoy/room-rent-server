import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    minlength: 8,
  })
  password: string;

  @Prop({
    type: String,
    enum: ['superadmin', 'admin', 'owner', 'subowner', 'user'],
    default: 'user',
  })
  role: string;

  @Prop()
  imageUrl: string;

  @Prop()
  imagePublicId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
