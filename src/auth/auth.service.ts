import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import ApiError from 'src/errors/ApiError';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }


  // validate password 
  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Password must be at least 8 characters');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      );
    }
  }



  // create user 
  async createUser(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { name, email, password, role } = createUserDto || {};

    this.validatePassword(password);

    try {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new ApiError(HttpStatus.CONFLICT, 'User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await createdUser.save();

      const token = jwt.sign(
        { userId: createdUser._id, name, email, role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      return { token };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user',
        error.message
      );
    }
  }







  // login user 
  async userLogin(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto || {};

    if (!email || !password) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email and password are required');
    }

    try {
      const user = await this.userModel.findOne({ email }).select('+password').exec();

      if (!user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          name: user.name
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );


      return { token }

    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Login failed',
        error.message
      );
    }
  }
}