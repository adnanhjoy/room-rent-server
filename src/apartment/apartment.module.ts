import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './apartment.schema';
import { Property, PropertySchema } from 'src/property/property.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Apartment.name, schema: ApartmentSchema },
            { name: Property.name, schema: PropertySchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [ApartmentController],
    providers: [ApartmentService],
})
export class ApartmentModule { }
