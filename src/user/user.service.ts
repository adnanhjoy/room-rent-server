import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async getAllUser(): Promise<User[]> {
        try {
            return await this.userModel
                .find()
                .select('-password')
                .exec();
        } catch (error) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch users');
        }
    }



    // get single user by email
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await this.userModel
                .findOne({ email })
                .select('-password -role')
                .exec();
        } catch (error) {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch user by email',
            );
        }
    }

}
