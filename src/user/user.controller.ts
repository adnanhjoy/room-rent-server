import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';
import { sendResponse } from 'src/utils/sendResponse';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    async getAllUser(@Res() res: Response) {
        const result = await this.userService.getAllUser();

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "All user get successful",
            data: result
        })
    }





    // get single user by email 
    @Get(':email')
    async getUserByEmail(@Param('email') email: string, @Res() res: Response) {
      const result = await this.userService.getUserByEmail(email);
  
      sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'User fetched successfully',
        data: result,
      });
    }
}
