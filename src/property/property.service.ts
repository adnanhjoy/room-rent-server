import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './property.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';
import { PropertyDto } from './dto/property.dto';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class PropertyService {
    constructor(
        @InjectModel(Property.name)
        private readonly propertyModel: Model<PropertyDocument>,

        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) { }



    // add property 
    async addProperty(payload: PropertyDto): Promise<Property> {
        const { owner } = payload;

        if (!owner) {
            throw new ApiError(HttpStatus.BAD_REQUEST, 'Owner ID is required');
        }

        try {
            const user = await this.userModel.findById(owner);

            if (!user) {
                throw new ApiError(HttpStatus.NOT_FOUND, 'Owner not found');
            }

            if (user.role !== 'owner' && user.role !== 'subowner') {
                throw new ApiError(HttpStatus.UNAUTHORIZED, 'You are unauthorized');
            }

            const newProperty = new this.propertyModel({
                ...payload,
                owner: user._id,
            });

            return await newProperty.save();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            console.error('Add Property Error:', error);
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'There was a server side error',
            );
        }
    }



    //   get all property 
    async getAllProperty(): Promise<Property[]> {
        try {
            return await this.propertyModel.find()
                .populate('owner', '-password -_id -createdAt -updatedAt')
                .exec();
        } catch {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'There was a server side error',
            );
        }
    }
}
