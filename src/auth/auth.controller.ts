import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { sendResponse } from 'src/utils/sendResponse';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/create')
    async userCreate(@Body() payload: CreateUserDto, @Res() res: Response) {
        const result = await this.authService.createUser(payload);
        
        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.CREATED,
            message: "User created successfull",
            data: result
        })
    }
}
