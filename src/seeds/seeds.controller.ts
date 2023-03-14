import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get('/genAdmin')
  @ApiOperation({ description: '創建 admin 使用者' })
  async createAdminSeed() {
    return await this.seedsService.genAdminSeeds();
  }

  @ApiOperation({
    description:
      '創建動物資料，注意！這邊要先有 admin 使用者資料才能創建動物假資料，動物的所屬 userId 掛在 admin 底下',
  })
  @ApiQuery({ description: '要創建幾筆假資料', name: 'count', type: Number })
  @Get('/genAnimals')
  async createAnimalSeed(@Query('count') count: number) {
    if (count > 20) {
      throw new BadRequestException('count should be less than 20');
    }
    if (count < 1) {
      throw new BadRequestException('count should be greater than 0');
    }
    return await this.seedsService.genAnimalSeeds(count);
  }
}
