import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
