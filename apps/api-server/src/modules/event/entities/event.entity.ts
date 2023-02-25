import { EventLocation } from '../../user/domain/event-location.model';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base-entity.entity';
import { EventCategory } from '../domain/event-categories.enum';
import { EventImageData } from '../domain/event-image-data.model';
import { SavedEvent } from './saved-event.entity';

@Entity('event')
export class Event extends BaseEntity {
  constructor(
    { id, ...user }: Partial<Event> = {},
    options = { generateId: false },
  ) {
    super(id, options);
    Object.assign(this, { ...user });
  }

  @Column({
    type: 'uuid',
    nullable: false,
  })
  host_id?: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    default: {},
  })
  category: EventCategory[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name?: string;

  @Column({
    type: 'varchar',
  })
  description?: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
  })
  start_date?: Date;

  @Column({
    type: 'timestamptz',
    nullable: false,
  })
  end_date?: Date;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  image?: EventImageData;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  location: EventLocation;

  @ManyToOne(() => User, (user) => user.hosted_events)
  @JoinColumn({ name: 'host_id' })
  host?: User;

  @OneToMany(() => SavedEvent, (saved_event) => saved_event.event)
  saved_events?: SavedEvent[];
}
