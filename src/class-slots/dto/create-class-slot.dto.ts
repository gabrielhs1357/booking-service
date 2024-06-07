import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassSlotDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  remainingSlots: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startsAt: Date;
}
