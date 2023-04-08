import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSavedEventDto {
  @IsNotEmpty()
  @IsUUID('4')
  event_id: string;
}
