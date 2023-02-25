import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserByIdDto } from '../../user/dto/get-user.dto';
import { CreateEventDto } from '../dto/create-event.dto';
import { DeleteSavedEventDto } from '../dto/delete-saved-event-params.dto';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { EventService } from '../services/event.service';

@Controller('event')
@ApiTags('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getEventsByParams(@Query() eventParams: EventParamsDto) {
    return this.eventService.getEventsByParams(eventParams);
  }

  @Get('/saved')
  async getUserSavedEvents(@Query() { user_id }: GetUserByIdDto) {
    return this.eventService.getUserSavedEvents(user_id);
  }

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/saved')
  async saveEventForUser(@Query() { event_id, user_id }: DeleteSavedEventDto) {
    return this.eventService.saveEventForUser(user_id, event_id);
  }

  @Delete()
  async deleteSavedEvent(@Query() { event_id, user_id }: DeleteSavedEventDto) {
    return this.eventService.deleteSavedEvent(user_id, event_id);
  }
}
