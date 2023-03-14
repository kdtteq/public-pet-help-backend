import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return user;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new NotAcceptableException('Password is incorrect');
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { useremail: user.email, sub: user._id.toString() };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
