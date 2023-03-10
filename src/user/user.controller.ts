import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { CreateUserDto, LoginDto, Test } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private authService: any;
  constructor(private userservice: UserService, private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  @Get()
  async getHello(): Promise<string> {
    return this.userservice.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    return await this.userservice.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('profile')
  async getProfile(@Body(new ValidationPipe()) user: Test) {
    return await this.userservice.findOneWithPet(user.email);
  }
}
