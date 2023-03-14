import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateAnimalDto {
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  animal_type?: string; // 動物類型，例如狗狗、貓貓等

  @IsOptional()
  @IsString()
  breed?: string; // 品種，例如狗狗的拉布拉多、哈士奇、柴犬等

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsString()
  shelter_location?: string;

  @IsOptional()
  @IsString()
  marking?: string; // 動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  last_known_location?: string; // 最後一次被發現的地點、走丟地點

  @IsOptional()
  @IsString()
  coordinate?: string; // 最後一次被發現的地點、走丟地點的座標

  image_url?: string; // 動物的圖片

  @IsString()
  @IsOptional()
  info_content?: string;
}

export class CreateAnimalDtoWithImageFile {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({ description: '動物所屬的 userId' })
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物的名字' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物的類型，例如是貓是狗是老鼠' })
  animal_type?: string; // 動物類型，例如狗狗、貓貓等

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物的品種，例如拉布拉多、哈士奇、柴犬等' })
  breed?: string; // 品種，例如狗狗的拉布拉多、哈士奇、柴犬等

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: '動物的年齡' })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物所在的收容所' })
  shelter_location?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等' })
  marking?: string; // 動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物的顏色' })
  color?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物的體型' })
  size?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物最後一次被發現的地點、走丟地點' })
  last_known_location?: string; // 最後一次被發現的地點、走丟地點

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '動物最後一次被發現的地點、走丟地點的座標' })
  coordinate?: string; // 最後一次被發現的地點、走丟地點的座標

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '上傳動物照片',
  })
  image_file?: Express.Multer.File; // 動物的圖片

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '動物的資訊內文' })
  info_content?: string;
}
export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}

export class RetrieveAnimalsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  filter?: Record<keyof CreateAnimalDto, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  projection?: Record<keyof CreateAnimalDto, any>;
}
