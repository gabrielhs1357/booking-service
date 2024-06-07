import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateClassSlotDto {
  @IsString()
  name: string;

  @IsNumber()
  remainingSlots: number;

  @IsDateString()
  startsAt: Date;
}
