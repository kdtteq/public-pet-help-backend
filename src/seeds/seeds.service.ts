import { BadRequestException, Injectable } from '@nestjs/common';
import { AnimalService } from 'src/animal/animal.service';
import { Animal } from 'src/schemas/animal.schema';
import { UserService } from 'src/user/user.service';
import { faker } from '@faker-js/faker';
@Injectable()
export class SeedsService {
  constructor(
    private readonly userService: UserService,
    private readonly animalService: AnimalService,
  ) {}

  async genAdminSeeds() {
    const adminExistCheck = await this.userService.findOne('admin@test.com');
    if (adminExistCheck) {
      return new BadRequestException('admin user already exists');
    }
    const adminUser = await this.userService.createUser({
      email: 'admin@test.com',
      password: '1234',
      name: 'admin',
      phone: '0912345678',
    });
    return adminUser;
  }

  async genAnimalSeeds(count: number) {
    const checkAdminExist = await this.userService.findOne('admin@test.com');
    if (!checkAdminExist) {
      return new BadRequestException(
        'admin user not exists, please create it first!',
      );
    }

    // 種類,體型,顏色,照片,發現座標,內容
    const animalArray = Array<Promise<Animal>>(count);
    enum AnimalType {
      '狗狗',
      '貓貓',
    }
    for (let i = 0; i < count; i++) {
      animalArray[i] = this.animalService.createAnimal({
        userId: checkAdminExist._id.toString(),
        name: faker.name.firstName(),
        age: Number(faker.random.numeric(1)),
        animal_type: Object.values(AnimalType)[
          Math.floor(Math.random() * 2)
        ] as string,
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgQFqDgpwexKbqh51l2Kdgfk3mpAdIcSGTw&usqp=CAU',
        info_content: faker.lorem.paragraph(),
      });
    }
    await Promise.all(animalArray);
    return { message: 'success' };
  }
}
