/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsOptional, IsIn, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsPhoneNumber('US')
  readonly phone?: string;

  @IsOptional()
  @IsIn(['user', 'admin'])
  readonly role?: 'user' | 'admin';
}
