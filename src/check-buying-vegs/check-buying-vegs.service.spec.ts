import { Test, TestingModule } from '@nestjs/testing';
import { CheckBuyingVegsService } from './check-buying-vegs.service';

describe('CheckBuyingVegsService', () => {
  let service: CheckBuyingVegsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckBuyingVegsService],
    }).compile();

    service = module.get<CheckBuyingVegsService>(CheckBuyingVegsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
