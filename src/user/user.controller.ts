import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/sendResponse';
import { UserGuardGuard } from 'src/common/guard/user.guard/user.guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Express } from 'express';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUser(@Res() res: Response) {
    const result = await this.userService.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'All user get successful',
      data: result,
    });
  }

  @UseGuards(UserGuardGuard)
  @ApiBearerAuth('access-token')
  @Get(':email')
  async getUserByEmail(
    @Param('email') params: string,
    @Req() req: Request & { role?: string; email?: string },
    @Res() res: Response,
  ) {
    const { email, role } = req;
    const result = await this.userService.getUserByEmail(params, email, role);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: result,
    });
  }

  @UseGuards(UserGuardGuard)
  @ApiBearerAuth('access-token')
  @Put('/update')
  async updateUserByEmail(
    @Body() body: Partial<CreateUserDto>,
    @Req() req: Request & { email?: string },
    @Res() res: Response,
  ) {
    const email = req.email;

    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Email is missing or not provided',
      });
    }

    const result = await this.userService.updateUserByEmail(email, body);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'User update successful',
      data: result,
    });
  }

  @Patch('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Req()
    req: Request & { email: string },
    @Res() res: Response,
  ) {
    const email = req.email;
    if (!email) {
      throw Error('No Email Found');
    }
    res.status(HttpStatus.OK).send({ message: 'OK', email: email });
    return;
  }
}
