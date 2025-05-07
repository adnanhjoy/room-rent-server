import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property {
    @Prop({
        required: true
    })
    name: string;



    @Prop({
        required: true
    })
    description: string;



    @Prop({
        required: true
    })
    location: string;



    @Prop({
        required: true
    })
    type: string;



    @Prop({
        required: true
    })
    amenities: string[];



    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    owner: User;
}



export const PropertySchema = SchemaFactory.createForClass(Property);
