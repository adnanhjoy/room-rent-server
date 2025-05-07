import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from 'src/property/property.schema';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
    ],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export class PropertyModule { }
