import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth0Module } from 'libs/auth0/src/auth0.module';
import { AuthService } from './services/auth.service';
import { IsAuth } from './guards/is-auth/is-auth.guard';
import { HasAuth0ActionSecret } from './guards/has-auth0-action-secret/has-auth0-action-secret.guard';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  providers: [AuthService, IsAuth, HasAuth0ActionSecret, UserRepository],
  exports: [IsAuth, AuthService, HasAuth0ActionSecret],
  controllers: [],
  imports: [
    Auth0Module.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get('auth0'),
    }),
    ConfigModule,
  ],
})
export class AuthModule {}
