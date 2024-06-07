import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClassSlotsService } from './class-slots.service';
import { CreateClassSlotDto } from './dto/create-class-slot.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Class Slots')
@Controller('class-slots')
export class ClassSlotsController {
  constructor(private readonly classSlotsService: ClassSlotsService) {}

  @Post()
  async create(@Body() createClassSlotDto: CreateClassSlotDto) {
    return await this.classSlotsService.create(createClassSlotDto);
  }

  @Get()
  async findAll() {
    return await this.classSlotsService.findAll();
  }
}
