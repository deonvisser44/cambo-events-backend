import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers: [UserRepository, UserService],
  exports: [],
  imports: [ConfigModule],
  controllers: [UserController],
})
export class UserModule {}
