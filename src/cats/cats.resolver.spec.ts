import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './cats.resolver';

describe('CatsResolver', () => {
  let resolver: CatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsResolver],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
