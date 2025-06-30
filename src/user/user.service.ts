/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, phone, role } = createUserDto;

    const existingUser = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const newUser = new this.userModel({
      username,
      email,
      password,
      phoneNumber: phone,
      role: role ?? 'user',
    });

    const savedUser = await newUser.save();

    const { password: _, ...safeUser } = savedUser.toObject();
    return safeUser;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username }).exec();

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user._id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: accessToken,
    };
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).select('-password').exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async getAllUsers() {
    return this.userModel.find().select('-password').exec();
  }
}


