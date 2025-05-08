import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/property/property.schema';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Property.name, schema: PropertySchema },
            { name: User.name, schema: UserSchema }
        ]),
    ],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export class PropertyModule { }
