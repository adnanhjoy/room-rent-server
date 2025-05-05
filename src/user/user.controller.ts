import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
}
