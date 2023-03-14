import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalRepository } from 'src/repositories/animal.repository';
import { AnimalSchema } from 'src/schemas/animal.schema';
import { UploadModule } from 'src/upload/upload.module';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
    UploadModule,
  ],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository],
  exports: [AnimalRepository, AnimalService],
})
export class AnimalModule {}
