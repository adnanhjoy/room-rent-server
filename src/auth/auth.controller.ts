import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/create')
    async userCreate(@Body() payload: CreateUserDto, @Res() res: Response) {
        const newUser = await this.authService.createUser(payload);
        return res.status(201).json(newUser);
    }
}
