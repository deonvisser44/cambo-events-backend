import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSavedEventDto {
  @IsNotEmpty()
  @IsUUID()
  event_id: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}