import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';
import { CreateUserDto } from './dto/user.dto';

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
                'There was a server side error',
            );
        }
    }



    // update user 
    async updateUserByEmail(
        email: string,
        payload: Partial<CreateUserDto>,
    ): Promise<User | null> {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate(
                { email },
                payload,
                { new: true }
            );

            return updatedUser;
        } catch (error) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "There was a server side error");
        }
    }


}
