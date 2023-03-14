import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Animal } from 'src/schemas/animal.schema';
import { AnimalService } from './animal.service';
import {
  CreateAnimalDtoWithImageFile,
  RetrieveAnimalsDto,
} from './dto/animal.dto';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Animal')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image_file'))
  @UsePipes(new ValidationPipe())
  @ApiOperation({ description: '新增單筆動物資料' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAnimalDtoWithImageFile })
  async createAnimal(
    @Body() createAnimalDto: CreateAnimalDtoWithImageFile,
    @UploadedFile() image_file: Express.Multer.File,
  ): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalDto, image_file);
  }

  @ApiOperation({ description: '取得所有動物資料' })
  @Post('/all')
  @ApiBody({
    description:
      '這邊也可以不帶值，基本上就是讓前端可以決定要用什麼條件撈，撈出來的資料也可以決定要撈哪些欄位',
    schema: {
      example: { filter: { animal_type: 'dog' }, projection: { name: 1 } },
    },
    required: false,
  })
  async getAllAnimals(
    @Body()
    condition?: RetrieveAnimalsDto,
  ): Promise<Animal[]> {
    return this.animalService.getAllAnimals(condition);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: '動物在 db 內的 id' })
  async getAnimalById(@Param() param): Promise<Animal> {
    if (!Types.ObjectId.isValid(param.id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const objId = new Types.ObjectId(param.id);
    return this.animalService.getAnimalById(objId);
  }
}
