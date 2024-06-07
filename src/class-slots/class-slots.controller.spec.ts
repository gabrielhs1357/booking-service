import { Test, TestingModule } from '@nestjs/testing';
import { ClassSlotsController } from './class-slots.controller';
import { ClassSlotsService } from './class-slots.service';

describe('ClassSlotsController', () => {
  let controller: ClassSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassSlotsController],
      providers: [ClassSlotsService],
    }).compile();

    controller = module.get<ClassSlotsController>(ClassSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
