import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassSlotsService } from 'src/class-slots/class-slots.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private readonly classSlotsService: ClassSlotsService,
  ) {}

  async findAvailableSlotAndMakeBooking(
    userId: number,
    classSlotId: number,
  ): Promise<Booking> {
    // TODO: use transactions to ensure that the class slot is updated only if the booking is successful

    var booking = await this.findBookingByUserIdAndClassSlotId(
      userId,
      classSlotId,
    );

    if (booking) {
      throw new BadRequestException('User already booked this class');
    }

    const classSlot = await this.classSlotsService.findAvailableClassSlot(
      classSlotId,
      new Date(),
    );

    if (!classSlot) {
      throw new BadRequestException('No available Class Slot was found');
    }

    booking = new Booking({ userId, classSlotId });

    await this.bookingRepository
      .createQueryBuilder('bookings')
      .insert()
      .values(booking)
      .execute();

    classSlot.remainingSlots -= 1;

    await this.classSlotsService.update(classSlot);

    return booking;
  }

  async findBookingByUserIdAndClassSlotId(
    userId: number,
    classSlotId: number,
  ): Promise<Booking> {
    return await this.bookingRepository
      .createQueryBuilder('bookings')
      .where('bookings.userId = :userId', { userId })
      .andWhere('bookings.classSlotId = :classSlotId', { classSlotId })
      .getOne();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }
}
