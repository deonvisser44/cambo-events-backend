import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtractUserId } from 'apps/api-server/src/shared/decorators/extract-user-id.decorator';
import { EventImageData } from '../../event/domain/event-image-data.model';
import { EventLocation } from '../domain/event-location.model';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserById(@ExtractUserId() user_id: string) {
    return this.userService.getUserById(user_id);
  }

  @Put('/primary-location')
  async updatePrimaryLocation(
    @Body() location: EventLocation,
    @ExtractUserId() user_id: string,
  ) {
    return this.userService.updatePrimaryLocation(user_id, location);
  }

  @Put('/image')
  async updateImage(
    @Body() image: EventImageData,
    @ExtractUserId() user_id: string,
  ) {
    return this.userService.updateProfileImage(user_id, image);
  }

  @Post('/login')
  async logUserIn(@Body() { credential }: { credential: any }) {
    return this.userService.loginUser(credential);
  }

  @Post('/sign-up')
  async signUserUp(@Body() { credential }: { credential: any }) {
    return this.userService.signUpUser(credential);
  }
}
