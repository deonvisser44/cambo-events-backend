import { Injectable } from '@nestjs/common';
import { DateTime } from 'ts-luxon';
import { Connection } from 'typeorm';
import { BaseRepository } from '../../../shared/repositories/base-repository.repository';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { Event } from '../entities/event.entity';
import { EventCategory } from '../domain/event-categories.enum';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(private readonly connection: Connection) {
    super(connection, Event);
  }

  async queryEventsByParams(eventParams: EventParamsDto) {
    const { from_date, to_date, category, host_id, page, area } = eventParams;
    const startingDate =
      from_date ?? DateTime.local({ zone: 'UTC' }).toJSDate();
    const take = 20;
    const pageNumber = page ?? 1;
    const skip = take * pageNumber - take;
    const query = this.orm
      .createQueryBuilder('event')
      .where('event.start_date >= :from_date', { from_date: startingDate })
      .orderBy('event.start_date', 'ASC')
      .take(take)
      .skip(skip);

    if (host_id) {
      query.andWhere('event.host_id = :host_id', { host_id });
    }
    if (to_date) {
      query.andWhere('event.start_date <= :to_date', { to_date });
    }
    if (category && category !== EventCategory.ALL) {
      query.andWhere('event.category @> :categories', {
        categories: [category],
      });
    }
    if (area) {
      query.andWhere('event.area = :area', { area });
    }
    const eventsMatchingSearch = await query.getMany();
    return eventsMatchingSearch;
  }
}
