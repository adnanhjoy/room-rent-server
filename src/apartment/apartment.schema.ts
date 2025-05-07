import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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
}



export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
