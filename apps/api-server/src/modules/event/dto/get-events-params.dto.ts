import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EventCategory } from '../domain/event-categories.enum';

export class EventParamsDto {
  @IsOptional()
  @IsUUID()
  host_id?: string;

  @IsOptional()
  @IsDate()
  from_date: Date;

  @IsOptional()
  @IsDate()
  to_date?: Date;

  @IsOptional()
  @IsEnum(EventCategory)
  @ApiProperty({ enum: EventCategory })
  category?: EventCategory;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  area?: string;
}
