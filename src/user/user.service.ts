import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    // constructor(
    //     @InjectModel(User.name) private userModel: Model<UserDocument>
    // ) { }

    getAllUser(): string {
        return 'Get All User';
    }
}
