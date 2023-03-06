import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalRepository } from 'src/repositories/animal.repository';
import { AnimalSchema } from 'src/schemas/animal.schema';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository],
})
export class AnimalModule {}
