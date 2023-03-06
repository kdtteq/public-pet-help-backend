import { Type } from 'class-transformer';
import { IsPhoneNumber, IsString, IsNumber } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  animal_type: string; // 動物類型，例如狗狗、貓貓等

  @IsString()
  breed: string; // 品種，例如狗狗的拉布拉多、哈士奇、柴犬等

  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  shelter_location: string;

  @IsString()
  marking: string; // 動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsString()
  last_known_location: string; // 最後一次被發現的地點、走丟地點
}
