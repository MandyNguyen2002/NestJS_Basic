/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Model } from 'mongoose'
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });

    if (!user || user.password !== loginDto.password) {
      return { message: 'Invalid credentials' };
    }

    return { message: 'Login successful' };
  }
}
