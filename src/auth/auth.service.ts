/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../user/dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByUsername(loginDto.username, true);


        if (!user || user.password !== loginDto.password) {
            throw new UnauthorizedException('Wrong password');
        }

        const payload = { sub: user._id, role: user.role };
        const token = this.jwtService.sign(payload);

        return { token, user };
    }
}