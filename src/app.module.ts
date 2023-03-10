import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedsModule } from './seeds/seeds.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          process.env.NODE_ENV === 'production'
            ? configService.get<string>('DATABASE_URL_PROD')
            : configService.get<string>('DATABASE_URL_DEV'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AnimalModule,
    SeedsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
