/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
