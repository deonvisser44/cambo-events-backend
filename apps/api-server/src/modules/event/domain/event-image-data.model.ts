import { IsNotEmpty, IsString } from 'class-validator';

export class EventImageData {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  file_path: string;
}
