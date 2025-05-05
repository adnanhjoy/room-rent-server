import {
  Injectable,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import ApiError from 'src/errors/ApiError';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto';
import { MailService } from 'src/mail/mail.service';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly emailService: MailService,
  ) {}

  // validate password
  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Password must be at least 8 characters',
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character',
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

      if (role === 'superadmin') {
        const superAdminExist = await this.userModel.findOne({
          role: 'superadmin',
        });

        if (superAdminExist) {
          throw new ApiError(
            HttpStatus.CONFLICT,
            'Only one superadmin is allowed',
          );
        }
      }

      if (role === 'admin') {
        const superAdminExist = await this.userModel.findOne({
          role: 'superadmin',
        });
        if (!superAdminExist) {
          throw new ApiError(
            HttpStatus.FORBIDDEN,
            'Superadmin must exist before creating an admin',
          );
        }
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
        { expiresIn: '1d' },
      );

      return { token };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user',
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Unknown error',
      );
    }
  }

  // login user
  async userLogin(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto || {};

    if (!email || !password) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Email and password are required',
      );
    }

    try {
      const user = await this.userModel
        .findOne({ email })
        .select('+password')
        .exec();

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
          name: user.name,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' },
      );

      return { token };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Login failed',
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Unknown error',
      );
    }
  }

  // forgot password
  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }
    // console.log(user);
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );
    const resetLink: string = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // console.log(resetLink);

    try {
      await this.emailService.sendPasswordResetEmail(user.email, resetLink);
    } catch (error) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to send email',
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Unknown error',
      );
    }
  }

  async resetPassword(token: string, password: string): Promise<void | string> {
    try {
      const decoded = verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      if (!decoded) {
        throw new UnauthorizedException('Unauthorized Access: Invalid token');
      }
      const { email } = decoded;
      if (!email) {
        throw new BadRequestException('Invalid token');
      }
      this.validatePassword(password);
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS as string, 10),
      );

      user.password = hashedPassword;

      await user.save();
      return 'Password Update Successful';
    } catch {
      throw new BadRequestException('Token expired or invalid');
    }
  }
}
