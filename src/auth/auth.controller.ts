/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { token, user } = await this.authService.login(loginDto);
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
        });
        return { message: 'Login successful', user };
    }


}

