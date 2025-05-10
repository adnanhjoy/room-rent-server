import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, description: 'email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    description: 'role',
    enum: ['superadmin', 'admin', 'owner', 'subowner', 'user'],
    default: 'user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ required: false, description: 'age' })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ required: true, description: "image", format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  image?: string

  @ApiProperty({ required: true, description: 'Image URL from Cloudinary' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: true, description: 'Cloudinary public ID' })
  @IsOptional()
  @IsString()
  imagePublicId?: string;
}

export class LoginUserDto {
  @ApiProperty({ required: true, description: 'email' })
  // @ApiHideProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  // @ApiHideProperty()
  @ApiProperty({ required: true, description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
