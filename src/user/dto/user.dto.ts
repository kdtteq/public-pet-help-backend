import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @ApiProperty({ description: '手機號碼，格式為 09xxxxxxxx', type: 'string' })
  @IsString()
  @IsPhoneNumber('TW')
  phone: string;
}

export class Test {
  email?: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
