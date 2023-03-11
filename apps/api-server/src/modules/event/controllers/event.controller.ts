import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtractUserId } from 'apps/api-server/src/shared/decorators/extract-user-id.decorator';
import { CreateEventDto } from '../dto/create-event.dto';
import { DeleteSavedEventDto } from '../dto/delete-saved-event-params.dto';
import { EventParamsDto } from '../dto/get-events-params.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventService } from '../services/event.service';

@Controller('event')
@ApiTags('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getEventsByParams(@Query() eventParams: EventParamsDto) {
    return this.eventService.getEventsByParams(eventParams);
  }

  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @ExtractUserId() user_id: string,
  ) {
    return this.eventService.createEvent(user_id, createEventDto);
  }

  @Put()
  async updateEvent(
    @Body() updateEventDto: UpdateEventDto,
    @ExtractUserId() user_id: string,
  ) {
    return this.eventService.updateEvent(user_id, updateEventDto);
  }

  @Delete()
  async deleteEvent(
    @Query() { event_id }: DeleteSavedEventDto,
    @ExtractUserId() user_id: string,
  ) {
    return this.eventService.deleteEvent(user_id, event_id);
  }

  @Get('/saved')
  async getUserSavedEvents(@ExtractUserId() user_id: string) {
    return this.eventService.getUserSavedEvents(user_id);
  }

  @Post('/saved')
  async saveEventForUser(
    @Query() { event_id }: DeleteSavedEventDto,
    @ExtractUserId() user_id: string,
  ) {
    return this.eventService.saveEventForUser(user_id, event_id);
  }

  @Delete('/saved')
  async deleteSavedEvent(
    @Query() { event_id }: DeleteSavedEventDto,
    @ExtractUserId() user_id: string,
  ) {
    return this.eventService.deleteSavedEvent(user_id, event_id);
  }
}
