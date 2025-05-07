import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './property.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';
import { PropertyDto } from './dto/property.dto';

@Injectable()
export class PropertyService {
    constructor(@InjectModel(Property.name) private propertyModel: Model<PropertyDocument>) { }

    // add property 
    async addProperty(propertyDto: PropertyDto): Promise<Property> {
        const addProperty = new this.propertyModel(propertyDto);
        return await addProperty.save();
    }



    //   get all property 
    async getAllProperty(): Promise<Property[]> {
        try {
            return await this.propertyModel.find().exec();
        } catch {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch users',
            );
        }
    }
}
