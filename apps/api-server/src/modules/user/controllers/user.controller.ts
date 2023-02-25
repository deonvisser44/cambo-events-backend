import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserAuthContext } from '../../auth/domain/user-auth-context.model';
import { HasAuth0ActionSecret } from '../../auth/guards/has-auth0-action-secret/has-auth0-action-secret.guard';
import { GetUserByIdDto } from '../dto/get-user.dto';
import { SyncUserAccountDto } from '../dto/sync-user-account.dto';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/account-sync')
  @ApiSecurity('Auth0ActionSecret')
  @ApiOperation({
    summary:
      'DO NOT USE IT FROM THE FRONT_END! This route should be used only by the Auth0s "post-login" hook.',
  })
  @UseGuards(HasAuth0ActionSecret)
  async syncUserAccount(
    @Body() { auth0_id, email }: SyncUserAccountDto,
  ): Promise<UserAuthContext> {
    return this.userService.syncUserAccount({ auth0_id, email });
  }

  @Get()
  async getUserById(@Query() { user_id }: GetUserByIdDto) {
    return this.userService.getUserById(user_id);
  }
}
