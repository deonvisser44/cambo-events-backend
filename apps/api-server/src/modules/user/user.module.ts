import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers: [UserRepository, UserService],
  exports: [],
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
