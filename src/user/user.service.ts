import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AnimalRepository } from 'src/repositories/animal.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly animalRepository: AnimalRepository,
  ) {}
  getHello(): string {
    return 'Hello World123!';
  }

  async createUser(user: CreateUserDto): Promise<any> {
    const userCheck = await this.userRepository.findOne(user.email);
    if (userCheck) {
      throw new BadRequestException('User already exists');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.create(user);
  }

  async findOne(email: string) {
    const userInfo = await this.userRepository.findOne(email);
    return userInfo;
  }
  async findOneWithPet(email: string) {
    const userInfo = await this.userRepository.findOne(email);
    if (!userInfo) {
      throw new BadRequestException('User not found');
    }
    const animalsBelongToUser = await this.animalRepository.findAll({
      userId: userInfo._id.toString(),
    });
    return { userInfo, animalsBelongToUser };
  }
}
