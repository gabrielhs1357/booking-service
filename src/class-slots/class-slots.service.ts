import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClassSlot } from './entities/class-slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassSlotDto } from './dto/create-class-slot.dto';

@Injectable()
export class ClassSlotsService {
  constructor(
    @InjectRepository(ClassSlot)
    private classSlotRepository: Repository<ClassSlot>,
  ) {}

  async findAvailableClassSlot(classSlotId: number, currentTime: Date) {
    return await this.classSlotRepository
      .createQueryBuilder('class_slots')
      .where('class_slots.id = :id', { id: classSlotId })
      .andWhere('class_slots.startsAt > :currentTime', { currentTime })
      .andWhere('class_slots.remainingSlots > 0')
      .getOne();
  }

  async findOneById(id: number): Promise<ClassSlot> {
    return await this.classSlotRepository.findOneBy({ id });
  }

  async update(classSlot: ClassSlot): Promise<ClassSlot> {
    try {
      return await this.classSlotRepository.save(classSlot);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update class slot');
    }
  }

  async findAll(): Promise<ClassSlot[]> {
    return await this.classSlotRepository.find();
  }

  async create(createClassSlotDto: CreateClassSlotDto): Promise<ClassSlot> {
    try {
      return await this.classSlotRepository.save(createClassSlotDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create class slot');
    }
  }
}
