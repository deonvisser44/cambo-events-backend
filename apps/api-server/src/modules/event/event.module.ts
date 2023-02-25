import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventRepository } from './repositories/event.repository';
import { SavedEventRepository } from './repositories/saved-event.repository';
import { EventService } from './services/event.service';

@Module({
  providers: [EventRepository, EventService, SavedEventRepository],
  exports: [],
  imports: [],
  controllers: [EventController],
})
export class EventModule {}
