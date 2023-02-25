import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/entities/base-entity.entity';
import { Event } from './event.entity';

@Entity('saved_event')
export class SavedEvent extends BaseEntity {
  constructor(
    { id, ...user }: Partial<SavedEvent> = {},
    options = { generateId: false },
  ) {
    super(id, options);
    Object.assign(this, { ...user });
  }

  @Column({
    type: 'uuid',
    nullable: false,
  })
  user_id?: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  event_id?: string;

  @ManyToOne(() => User, (user) => user.saved_events)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Event, (event) => event.saved_events)
  @JoinColumn({ name: 'event_id' })
  event?: Event;
}
