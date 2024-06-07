import { Module } from '@nestjs/common';
import { ClassSlotsService } from './class-slots.service';
import { ClassSlotsController } from './class-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSlot } from './entities/class-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassSlot])],
  controllers: [ClassSlotsController],
  providers: [ClassSlotsService],
})
export class ClassSlotsModule {}
