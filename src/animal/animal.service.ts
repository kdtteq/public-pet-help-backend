import { Injectable } from '@nestjs/common';
import { AnimalRepository } from 'src/repositories/animal.repository';
import { Animal } from 'src/schemas/animal.schema';
import {
  CreateAnimalDto,
  CreateAnimalDtoWithImageFile,
} from './dto/animal.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class AnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly uploadService: UploadService,
  ) {}
  async createAnimal(
    animal: CreateAnimalDto,
    image?: Express.Multer.File,
  ): Promise<Animal> {
    const url = image
      ? await this.uploadService.uploadImage(image.buffer)
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgQFqDgpwexKbqh51l2Kdgfk3mpAdIcSGTw&usqp=CAU';
    animal.image_url = url;
    return this.animalRepository.create(animal);
  }
  async getAllAnimals({ filter = {}, projection = {} }): Promise<Animal[]> {
    return this.animalRepository.findAll(filter ?? {}, projection ?? {});
  }
  async getAnimalById(id: any): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      condition: { _id: id },
    });
    return animal;
  }

  async getAnimalByUser(id: any): Promise<Animal[]> {
    const animals = await this.animalRepository.findAll({
      userId: id,
    });
    return animals;
  }
}
