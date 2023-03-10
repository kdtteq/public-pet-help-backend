import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Animal } from 'src/schemas/animal.schema';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/animal.dto';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe())
  async createAnimal(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalDto, image);
  }
  @Get('/all')
  async getAllAnimals(): Promise<Animal[]> {
    return this.animalService.getAllAnimals();
  }

  @Get(':id')
  @ApiQuery({ name: 'animalId', type: String })
  async getAnimalById(@Param() param): Promise<Animal> {
    if (!Types.ObjectId.isValid(param.id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const objId = new Types.ObjectId(param.id);
    return this.animalService.getAnimalById(objId);
  }
}
