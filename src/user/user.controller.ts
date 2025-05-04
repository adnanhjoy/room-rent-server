import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    getWelcome(@Res() res: Response) {
        return res.status(200).send({
            message: 'OK',
            data: this.userService.getAllUser()
        });
    }
}
