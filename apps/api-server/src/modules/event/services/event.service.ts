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

  async getEventsByParams(user_id: string, eventParams: EventParamsDto) {
    return this.eventRepository.queryEventsByParams({
      ...eventParams,
      host_id: user_id,
    });
  }

  async createEvent(user_id: string, createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create({
      ...createEventDto,
      host_id: user_id,
    });
    return newEvent;
  }

  async deleteEvent(user_id: string, event_id: string) {
    await this.eventRepository.orm.delete({ host_id: user_id, id: event_id });
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
