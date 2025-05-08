import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './property.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';
import { PropertyDto } from './dto/property.dto';

@Injectable()
export class PropertyService {
    constructor(@InjectModel(Property.name) private readonly propertyModel: Model<PropertyDocument>) { }

    // add property 
    async addProperty(payload: PropertyDto,): Promise<Property> {

        try {
            const addProperty = new this.propertyModel(payload);
            const result = await addProperty.save();
            return result

        } catch (error) {
            console.log(error);
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "There was a server side error")
        }
    }



    //   get all property 
    async getAllProperty(): Promise<Property[]> {
        try {
            return await this.propertyModel.find()
                .populate('owner', '-password -_id')
                .exec();
        } catch {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'There was a server side error',
            );
        }
    }
}
