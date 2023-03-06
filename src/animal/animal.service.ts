import { Injectable } from '@nestjs/common';
import { AnimalRepository } from 'src/repositories/animal.repository';
import { Animal } from 'src/schemas/animal.schema';
import { CreateAnimalDto } from './dto/animal.dto';

@Injectable()
export class AnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}
  async createAnimal(animal: CreateAnimalDto): Promise<Animal> {
    return this.animalRepository.create(animal);
  }
  async getAllAnimals(): Promise<Animal[]> {
    return this.animalRepository.findAll();
  }
  async getAnimalById(id: any): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      condition: { _id: id },
    });
    console.log('id :>> ', id);
    console.log('animal :>> ', animal);
    return animal;
  }
}
