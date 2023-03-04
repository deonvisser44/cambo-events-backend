import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IsAuth } from './guards/is-auth/is-auth.guard';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  providers: [IsAuth, UserRepository],
  exports: [IsAuth],
  controllers: [],
  imports: [ConfigModule],
})
export class AuthModule {}
