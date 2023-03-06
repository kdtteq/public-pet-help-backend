import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Animal } from 'src/schemas/animal.schema';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/animal.dto';
import { Types } from 'mongoose';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get(':id')
  async getAnimalById(@Param() id: string): Promise<Animal> {
    const objId = new Types.ObjectId(id);
    console.log(objId);
    return this.animalService.getAnimalById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAnimal(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalDto);
  }
  @Get('/all')
  async getAllAnimals(): Promise<Animal[]> {
    return this.animalService.getAllAnimals();
  }
}
