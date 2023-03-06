import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from 'src/schemas/animal.schema';
import { Model } from 'mongoose';

export class AnimalRepository {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}
  async create(animal: Animal): Promise<Animal> {
    const createdAnimal = new this.animalModel(animal);
    return createdAnimal.save();
  }
  async findAll(
    condition: { condition?: { [key: string]: string } } = {},
  ): Promise<Animal[]> {
    return this.animalModel.find(condition).exec();
  }

  async findOne(
    condition: {
      condition?: { [key: string]: any };
    } = {},
  ): Promise<Animal> {
    return this.animalModel.findOne(condition).exec();
  }
}
