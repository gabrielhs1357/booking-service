import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserService } from 'src/user/user.service';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    try {
      const userId = createBookingDto.userId;

      if (!(await this.userService.findOneById(userId))) {
        throw new BadRequestException(`User with id = ${userId} was not found`);
      }

      const classSlotId = createBookingDto.classSlotId;

      const booking = await this.bookingService.findAvailableSlotAndMakeBooking(
        userId,
        classSlotId,
      );

      return booking;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }
  }

  @Get()
  async getBookings() {
    return await this.bookingService.findAll();
  }
}
