import { Injectable } from '@nestjs/common';
import { DateTime } from 'ts-luxon';
import { Connection } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base-repository.repository';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(private readonly connection: Connection) {
    super(connection, Event);
  }

  async queryEventsByParams(eventParams: EventParamsDto) {
    const { from_date, to_date, category, host_id } = eventParams;
    const startingDate =
      from_date ?? DateTime.local({ zone: 'UTC' }).toJSDate();
    const query = this.orm
      .createQueryBuilder('event')
      .where('event.start_date >= :from_date', { from_date: startingDate })
      .orderBy('event.start_date', 'ASC');

    if (host_id) {
      query.andWhere('event.host_id = :host_id', { host_id });
    }
    if (to_date) {
      query.andWhere('event.start_date <= :to_date', { to_date });
    }
    if (category) {
      query.andWhere('event.category @> :categories', {
        categories: [category],
      });
    }
    const eventsMatchingSearch = await query.getMany();
    return eventsMatchingSearch;
  }
}
