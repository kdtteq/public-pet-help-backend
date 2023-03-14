import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id?: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;
}

export const Userschema = SchemaFactory.createForClass(User);
