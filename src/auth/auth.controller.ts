import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { sendResponse } from 'src/utils/sendResponse';
import { AuthForgotDto, AuthResetDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  async userCreate(@Body() payload: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.createUser(payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: 'User created successfull',
      data: result,
    });
  }

  @Post('/login')
  async userLogin(@Body() payload: LoginUserDto, @Res() res: Response) {
    const result = await this.authService.userLogin(payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: 'Login Successfull',
      data: result,
    });
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() payload: AuthForgotDto) {
    const { email } = payload;
    if (!email) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email is required',
      };
    }

    const result = await this.authService.forgotPassword(email);

    return {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Password reset link sent to your email',
      data: result,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() payload: AuthResetDto) {
    const { token, password } = payload;
    if (!token || !password) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Token and password are required',
      };
    }

    const result = await this.authService.resetPassword(token, password);

    return {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Password reset successfully',
      data: result,
    };
  }
}
