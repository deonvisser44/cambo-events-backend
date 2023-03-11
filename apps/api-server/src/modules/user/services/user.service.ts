import { Injectable, NotFoundException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as jwt from 'jsonwebtoken';
import { EventLocation } from '../domain/event-location.model';
import { EventImageData } from '../../event/domain/event-image-data.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(user_id: string) {
    return this.userRepository.orm.findOneBy({ id: user_id });
  }

  async verifyGoogleToken(token: string) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return { payload: ticket.getPayload() };
    } catch (error) {
      return { error: 'Invalid user detected. Please try again' };
    }
  }

  async loginUser(token: string) {
    console.log('login called');
    if (token) {
      const verificationResponse = await this.verifyGoogleToken(token);
      const profile = verificationResponse?.payload;
      const existingUser = await this.userRepository.orm.findOneBy({
        email: profile.email,
      });
      if (!existingUser) {
        throw new NotFoundException(
          `User with email ${profile.email} does not exist!`,
        );
      }
      return {
        user: {
          id: existingUser.id,
          token: jwt.sign(
            { email: existingUser.email, id: existingUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: '5d',
            },
          ),
        },
      };
    }
  }

  async signUpUser(token: string) {
    console.log('sign up called');
    if (token) {
      const verificationResponse = await this.verifyGoogleToken(token);
      const profile = verificationResponse?.payload;
      const newUser = new User({
        email: profile.email,
        name: profile.given_name,
      });
      const savedUser = await this.userRepository.create(newUser);
      console.log({ jwt, profile });
      return {
        user: {
          id: savedUser.id,
          token: jwt.sign(
            { email: savedUser.email, id: savedUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: '5d',
            },
          ),
        },
      };
    }
  }

  async updatePrimaryLocation(user_id: string, location: EventLocation) {
    await this.userRepository.update(user_id, { primary_location: location });
  }

  async updateProfileImage(user_id: string, image: EventImageData) {
    await this.userRepository.update(user_id, { image });
  }
}
