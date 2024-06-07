import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    const userId = createBookingDto.userId;

    await this.userService.validateUser(userId);

    const classSlotId = createBookingDto.classSlotId;

    const booking = await this.bookingService.findAvailableSlotAndMakeBooking(
      userId,
      classSlotId,
    );

    return booking;
  }

  @Get()
  async getBookings() {
    return await this.bookingService.findAll();
  }
}
