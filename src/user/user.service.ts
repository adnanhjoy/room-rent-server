import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import ApiError from 'src/errors/ApiError';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-password').exec();
    } catch {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to fetch users',
      );
    }
  }

  // get single user by email
  async getUserByEmail(
    params: string,
    email?: string,
    role?: string,
  ): Promise<User | null> {
    try {
      console.log(role);
      if (role === 'superadmin' || role === 'admin') {
        return await this.userModel
          .findOne({ email: params })
          .select('-password -role')
          .exec();
      } else {
        if (params === email) {
          return await this.userModel
            .findOne({ email: params })
            .select('-password -role')
            .exec();
        }
      }
      return null;
    } catch {
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
        { new: true },
      );

      return updatedUser;
    } catch {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'There was a server side error',
      );
    }
  }
}
