import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventRepository } from '../repositories/event.repository';
import { SavedEventRepository } from '../repositories/saved-event.repository';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly savedEventRepository: SavedEventRepository,
  ) {}

  async getEventById(event_id: string) {
    return this.eventRepository.orm.findOneByOrFail({ id: event_id });
  }

  async getEventsByParams(eventParams: EventParamsDto) {
    return this.eventRepository.queryEventsByParams(eventParams);
  }

  async createEvent(user_id: string, createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create({
      ...createEventDto,
      host_id: user_id,
    });
    return newEvent;
  }

  async updateEvent(user_id: string, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.eventRepository.orm.findOne({
      where: { id: updateEventDto.id },
    });
    if (existingEvent.host_id !== user_id) {
      throw new UnauthorizedException(
        `User with ID: ${user_id} is not host of event with ID: ${updateEventDto.id}`,
      );
    }
    const updatedEvent = await this.eventRepository.update(updateEventDto.id, {
      ...updateEventDto,
    });
    return updatedEvent;
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

  @Cron('0 0 * * *')
  async deletePastEvents() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const res = await this.eventRepository.orm.delete({ start_date: LessThan(currentDate) });
    console.log('Ran CRON Job'), { res };
  }
}
