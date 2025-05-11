import {
  Body,
  Controller,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Put,
  Req,
  Res,
  UploadedFile,
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
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly cloudinaryService: CloudinaryService,
  ) {}

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
  // @UseGuards(UserGuardGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/user-images',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB limit
          // new FileTypeValidator({ fileType: /jpeg|jpg|png/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    // file.path will give you the uploaded path
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Image uploaded successfully',
      data: {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
  }

  /* @Patch('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const result = await this.cloudinaryService.uploadImage(file);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } */
}
