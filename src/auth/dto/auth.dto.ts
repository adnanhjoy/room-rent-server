import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthForgotDto {
  @ApiProperty({ required: true, description: 'email' })
  @IsString()
  @IsEmail()
  email: string;
}
