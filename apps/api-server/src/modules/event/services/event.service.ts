import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { EventRepository } from '../repositories/event.repository';
import { SavedEventRepository } from '../repositories/saved-event.repository';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly savedEventRepository: SavedEventRepository,
  ) {}

  async getEventsByParams(eventParams: EventParamsDto) {
    console.log({ eventParams });
    return this.eventRepository.queryEventsByParams(eventParams);
  }

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create({ ...createEventDto });
    return newEvent;
  }

  async getUserSavedEvents(user_id: string) {
    return this.savedEventRepository.getUserSavedEvents(user_id);
  }

  async saveEventForUser(user_id: string, event_id: string) {
    const savedEventRecord = await this.savedEventRepository.create({
      user_id,
      event_id,
    });
    return savedEventRecord;
  }

  async deleteSavedEvent(user_id: string, event_id: string) {
    await this.savedEventRepository.orm.delete({ user_id, event_id });
  }
}
