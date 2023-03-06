import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;
@Schema()
export class Animal {
  @Prop({ required: true })
  name: string;

  @Prop()
  animal_type: string; // 動物類型，例如狗狗、貓貓等

  @Prop()
  breed: string; // 品種，例如狗狗的拉布拉多、哈士奇、柴犬等

  @Prop()
  age: number;

  @Prop()
  shelter_location: string;

  @Prop()
  marking: string; // 動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等

  @Prop()
  color: string;

  @Prop()
  size: string;

  @Prop()
  last_known_location: string; // 最後一次被發現的地點、走丟地點
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
