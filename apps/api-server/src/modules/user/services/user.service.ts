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
      let savedUser;
      // only create new user if no user with same email exists
      if (!existingUser) {
        const newUser = new User({
          email: profile.email,
          name: profile.given_name,
        });
        savedUser = await this.userRepository.create(newUser);
      }
      return {
        user: {
          id: existingUser ? existingUser.id : savedUser.id,
          token: jwt.sign(
            {
              email: profile.email,
              id: existingUser ? existingUser.id : savedUser.id,
            },
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
      const existingUser = await this.userRepository.orm.findOne({
        where: { email: profile.email },
      });
      let savedUser;
      // only create new user if no user with same email exists
      if (!existingUser) {
        const newUser = new User({
          email: profile.email,
          name: profile.given_name,
        });
        savedUser = await this.userRepository.create(newUser);
      }
      console.log({ jwt, profile });
      return {
        user: {
          id: existingUser ? existingUser.id : savedUser.id,
          token: jwt.sign(
            {
              email: profile.email,
              id: existingUser ? existingUser.id : savedUser.id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '30d',
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
