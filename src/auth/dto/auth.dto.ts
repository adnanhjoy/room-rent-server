import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthForgotDto {
  @ApiProperty({ required: true, description: 'email' })
  @IsString()
  @IsEmail()
  email: string;
}

export class AuthResetDto {
  @ApiProperty({ required: true, description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ required: true, description: 'token' })
  @IsString()
  token: string;
}
