import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ClassSlotsService } from 'src/class-slots/class-slots.service';
import { User } from 'src/user/entities/user.entity';
import { ClassSlot } from 'src/class-slots/entities/class-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, User, ClassSlot]),
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forFeature([ClassSlot]),
  ],
  controllers: [BookingController],
  providers: [BookingService, UserService, ClassSlotsService],
})
export class BookingModule {}
