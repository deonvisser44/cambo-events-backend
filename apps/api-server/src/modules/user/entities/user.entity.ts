import { Event } from '../../event/entities/event.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base-entity.entity';
import { EventLocation } from '../domain/event-location.model';
import { SavedEvent } from '../../event/entities/saved-event.entity';
import { EventImageData } from '../../event/domain/event-image-data.model';

@Entity('user')
export class User extends BaseEntity {
  constructor(
    { id, ...user }: Partial<User> = {},
    options = { generateId: false },
  ) {
    super(id, options);
    Object.assign(this, { ...user });
  }

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
  })
  email?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  image?: EventImageData;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  primary_location?: EventLocation;

  @OneToMany(() => Event, (event) => event.host)
  hosted_events?: Event[];

  @OneToMany(() => SavedEvent, (saved_event) => saved_event.user)
  saved_events?: SavedEvent[];
}
