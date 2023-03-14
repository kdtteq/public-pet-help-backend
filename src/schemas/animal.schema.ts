import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;
@Schema({ timestamps: true })
export class Animal {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    default: '640b633133a3e6520934a07d',
  })
  userId?: string;

  @Prop()
  name?: string;

  @Prop({ default: '' })
  animal_type?: string; // 動物類型，例如狗狗、貓貓等

  @Prop({ default: '' })
  breed?: string; // 品種，例如狗狗的拉布拉多、哈士奇、柴犬等

  @Prop({ default: 1 })
  age?: number;

  @Prop({ default: '' })
  shelter_location?: string;

  @Prop({ default: '' })
  marking?: string; // 動物身上的特徵，例如狗狗的斑點、貓貓的斑紋等

  @Prop({ default: '' })
  color?: string;

  @Prop({ default: '' })
  size?: string;

  @Prop({ default: '' })
  last_known_location?: string; // 最後一次被發現的地點、走丟地點

  @Prop({ default: '' })
  coordinate?: string; // 最後一次被發現的地點、走丟地點的座標

  @Prop({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgQFqDgpwexKbqh51l2Kdgfk3mpAdIcSGTw&usqp=CAU',
  })
  image_url?: string; // 動物的圖片

  @Prop({ default: '' })
  info_content?: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
