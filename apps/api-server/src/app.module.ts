import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configsArray } from './config';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configsArray }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleAsyncOptions =>
        configService.get<TypeOrmModuleOptions>('typeorm'),
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('pino'),
    }),
    UserModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
