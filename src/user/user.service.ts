/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  private users: (CreateUserDto & { username: string; password: string })[] = [];

  register(createUserDto: CreateUserDto) {
  const user = createUserDto as CreateUserDto & { username: string; password: string };
  this.users.push(user);
  return {
    message: 'User registered successfully',
    user,
  };
}

  login(loginDto: LoginDto) {
    const user = this.users.find(
      (u) =>
        u.username === loginDto.username && u.password === loginDto.password,
    );

    if (user) {
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
