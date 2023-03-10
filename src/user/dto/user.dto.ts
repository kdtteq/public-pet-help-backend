import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  account: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

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
