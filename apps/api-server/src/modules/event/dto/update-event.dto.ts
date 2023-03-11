import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends CreateEventDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
