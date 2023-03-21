import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { UserModule } from 'src/user/user.module';
import { AnimalModule } from 'src/animal/animal.module';

@Module({
  imports: [UserModule, AnimalModule],
  providers: [SeedsService],
  controllers: [SeedsController],
})
export class SeedsModule {}
