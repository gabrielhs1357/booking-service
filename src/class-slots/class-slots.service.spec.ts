import { Test, TestingModule } from '@nestjs/testing';
import { ClassSlotsService } from './class-slots.service';

describe('ClassSlotsService', () => {
  let service: ClassSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassSlotsService],
    }).compile();

    service = module.get<ClassSlotsService>(ClassSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
