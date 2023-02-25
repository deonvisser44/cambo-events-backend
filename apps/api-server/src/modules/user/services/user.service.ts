import { Injectable, NotFoundException } from '@nestjs/common';
import { Auth0ManagementService } from 'libs/auth0/src';
import { UserAuthContext } from '../../auth/domain/user-auth-context.model';
import { SyncUserAccountDto } from '../dto/sync-user-account.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly auth0ManagementService: Auth0ManagementService,
  ) {}

  async getUserById(user_id: string) {
    return this.userRepository.orm.findOneBy({ id: user_id });
  }

  async syncUserAccount({
    auth0_id,
    email,
  }: SyncUserAccountDto): Promise<UserAuthContext> {
    const [auth0User] = await this.consistentlyGetUser(auth0_id);
    if (!auth0User) throw new NotFoundException('User does not exit in Auth0!');
    const { id } = await this.updateOrCreateUser({ auth0_id, email });
    return { id };
  }

  private async consistentlyGetUser(auth0_id: string): Promise<[any]> {
    const auth0UserPromise = this.auth0ManagementService
      .getUser({ id: auth0_id })
      .catch(() => undefined);
    const [auth0User] = await Promise.all([auth0UserPromise]);
    return [auth0User];
  }

  private async updateOrCreateUser({
    auth0_id,
    email,
  }: SyncUserAccountDto): Promise<User> {
    return await this.userRepository.upsert({ auth0_id, email }, ['auth0_id']);
  }
}
