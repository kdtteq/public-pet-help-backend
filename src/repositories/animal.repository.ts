import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from 'src/schemas/animal.schema';
import { FilterQuery, Model, SortOrder } from 'mongoose';

export interface AnimalInterface {
  userId: string;
  name: string;
  animal_type: string;
  breed: string;
  age: number;
  shelter_location: string;
  marking: string;
  color: string;
  size: string;
  last_known_location: string;
  coordinate: string;
  image_url: string;
  info_content: string;
}
export class AnimalRepository {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {}
  async create(animal: Animal): Promise<Animal> {
    const createdAnimal = new this.animalModel(animal);
    return createdAnimal.save();
  }
  async findAll(
    condition: FilterQuery<AnimalInterface> = {},
    projection: { projection?: { [key: string]: string } } = {},
    sortMethod:
      | string
      | { [key: string]: SortOrder | { $meta: 'textScore' } }
      | [string, SortOrder][]
      | undefined
      | null = { createdAt: 'desc' },
  ): Promise<Animal[]> {
    return this.animalModel.find(condition, projection).sort(sortMethod).exec();
  }

  async findOne(condition: FilterQuery<AnimalInterface> = {}): Promise<Animal> {
    return this.animalModel.findOne(condition).exec();
  }
}
