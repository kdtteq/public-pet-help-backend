import {
  forwardRef,
  Inject,
  Injectable,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  getHello(): string {
    return 'Hello World123!';
  }

  async createUser(user: CreateUserDto): Promise<any> {
    return await this.userRepository.create(user);
  }

  async findOne(name: string) {
    return await this.userRepository.findOne(name);
  }
}
