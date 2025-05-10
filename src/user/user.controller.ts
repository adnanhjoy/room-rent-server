import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/sendResponse';
import { UserGuardGuard } from 'src/common/guard/user.guard/user.guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
    @UseGuards(UserGuardGuard)
    @ApiBearerAuth('access-token')
    @Get(':email')
    async getUserByEmail(
        @Param('email') params: string,
        @Req() req: Request & { role?: string; email?: string },
        @Res() res: Response
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



    // update user by email 

    @UseGuards(UserGuardGuard)
    @ApiBearerAuth('access-token')
    @Put('/update')
    @UseInterceptors(FileInterceptor('image'))
    async updateUserByEmail(
        @Body() body: Partial<CreateUserDto>,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
                .addMaxSizeValidator({ maxSize: 1000000, message: "Image cannot be more than 1MB" })
                .build({ errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE })
        ) file: Express.Multer.File,
        @Req() req: Request & { name?: string; email?: string },
        @Res() res: Response
    ) {
        const email = req.email;

        if (!email || !file) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "Email is missing from token",
            });
        }

        const result = await this.userService.updateUserByEmail(email,file, body);

        sendResponse(res, {
            success: true,
            statusCode: HttpStatus.OK,
            message: "User update successful",
            data: result,
        });
    }

}
