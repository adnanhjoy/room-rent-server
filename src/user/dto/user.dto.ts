import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    description: 'Role',
    enum: ['superadmin', 'admin', 'owner', 'subowner', 'user'],
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ required: false, description: 'Age' })
  @IsOptional()
  @IsNumber()
  age?: number;
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

export class UpdateImageDto {
  @ApiProperty({ required: true, description: 'Image' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
