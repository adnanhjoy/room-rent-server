import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartment, ApartmentDocument } from './apartment.schema';
import { Model } from 'mongoose';
import { ApartmentDto } from './dto/apartment.dto';
import ApiError from 'src/errors/ApiError';
import { Property, PropertyDocument } from 'src/property/property.schema';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class ApartmentService {
    constructor(
        @InjectModel(Apartment.name)
        private apartmentModel: Model<ApartmentDocument>,

        @InjectModel(Property.name)
        private propertyModel: Model<PropertyDocument>,


        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

    ) { }

    // add apartment 
    async addApartment(payload: ApartmentDto): Promise<Apartment> {
        const { owner, property } = payload;
        try {

            const user = await this.userModel.findById(owner);
            const isProperty = await this.propertyModel.findById(property)

            if (!user) {
                throw new ApiError(HttpStatus.NOT_FOUND, 'Owner not found');
            }

            if (!isProperty) {
                throw new ApiError(HttpStatus.NOT_FOUND, 'Property not found')
            }

            if (user.role !== 'owner' && user.role !== 'subowner') {
                throw new ApiError(HttpStatus.UNAUTHORIZED, 'You are unauthorized');
            }

            const addApartment = new this.apartmentModel(payload);
            return await addApartment.save();

        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            console.error('Add Apartment Error:', error);
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'There was a server side error',
            );
        }
    }



    //   get all apartment 
    async getAllApartment(): Promise<Apartment[]> {
        try {
            return await this.apartmentModel.find()
                .populate('property', '-_id -createdAt -updatedAt')
                .populate('owner', '-_id -password -updatedAt -createdAt')
                .exec();
        } catch {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch users',
            );
        }
    }
}
