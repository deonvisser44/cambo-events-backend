import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base-repository.repository';
import { SavedEvent } from '../entities/saved-event.entity';

@Injectable()
export class SavedEventRepository extends BaseRepository<SavedEvent> {
  constructor(private readonly connection: Connection) {
    super(connection, SavedEvent);
  }

  async getUserSavedEvents(user_id: string) {
    const savedEvents = await this.orm.find({
      where: { user_id },
      relations: ['event'],
    });
    return savedEvents;
  }
}
