import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalModule } from 'src/animal/animal.module';
import { UserRepository } from 'src/repositories/user.repository';
import { User, Userschema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: Userschema }]),
    AnimalModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
