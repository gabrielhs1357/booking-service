import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateClassSlotDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  remainingSlots: number;

  @ApiProperty()
  @IsDateString()
  startsAt: Date;
}
