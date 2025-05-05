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
            return await this.userModel.find().exec();
        } catch (error) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch users');
        }
    }
}
