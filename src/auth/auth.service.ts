import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateUserDto } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import ApiError from 'src/errors/ApiError';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserDto || {};

    try {
      const isExist = await this.userModel.findOne({ email });

      if (isExist) {
        throw new ApiError(HttpStatus.FORBIDDEN, "User already exists")
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });

      await createdUser.save();

      const token = jwt.sign({ name, email }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      return { token };

    } catch (error) {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "There was a server side error")
    }
  }

}
