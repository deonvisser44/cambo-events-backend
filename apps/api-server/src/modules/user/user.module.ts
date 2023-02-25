import { Auth0Module } from '../../../../../libs/auth0/src';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers: [UserRepository, UserService],
  exports: [],
  imports: [
    Auth0Module.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get('auth0'),
    }),
    ConfigModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
