import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventLocation } from '../../user/domain/event-location.model';
import { EventCategory } from '../domain/event-categories.enum';
import { EventImageData } from '../domain/event-image-data.model';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  category: EventCategory[];

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  location: EventLocation;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsOptional()
  @IsDate()
  end_date: Date;

  @IsOptional()
  @Type(() => EventImageData)
  image: EventImageData;
}
