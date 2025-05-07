import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartment, ApartmentDocument } from './apartment.schema';
import { Model } from 'mongoose';
import { ApartmentDto } from './dto/apartment.dto';
import ApiError from 'src/errors/ApiError';

@Injectable()
export class ApartmentService {
    constructor(@InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>) { }

    // add apartment 
    async addApartment(propertyDto: ApartmentDto): Promise<Apartment> {
        const addApartment = new this.apartmentModel(propertyDto);
        return await addApartment.save();
    }



    //   get all apartment 
    async getAllApartment(): Promise<Apartment[]> {
        try {
            return await this.apartmentModel.find().exec();
        } catch {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch users',
            );
        }
    }
}
