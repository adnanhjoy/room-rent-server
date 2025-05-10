import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Property } from 'src/property/property.schema';
import { User } from 'src/user/user.schema';

export type ApartmentDocument = HydratedDocument<Apartment>;

@Schema({ timestamps: true })
export class Apartment {
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
    address: string;



    @Prop({
        required: true,
        enum: ["family", "bachelor"]
    })
    apartmentType: string;



    @Prop({
        required: true
    })
    facilities: string[];


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    owner: User;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    })
    property: Property;


    @Prop({
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    })
    status: string
}



export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
