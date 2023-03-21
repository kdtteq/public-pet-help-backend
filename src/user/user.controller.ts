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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { UserService } from './user.service';

// api category User
@ApiTags('User')
@Controller('user')
export class UserController {
  private authService: any;
  constructor(private userservice: UserService, private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: LoginDto })
  @ApiOperation({ description: '使用者登入，會拿回 token' })
  async login(@Body() user: { email: string; password: string }) {
    const result = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return await this.authService.generateToken(result);
  }

  @ApiOperation({ description: '使用者註冊' })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    return await this.userservice.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: '取得使用者資料，會從 token 中解析 userId' })
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userservice.findOneWithPet(req.user.userEmail);
  }
}
