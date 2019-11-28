import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '../common/dataloader.interface';
import * as DataLoader from 'dataloader';
import { CatsService } from './cats.service';
import { Cat } from '../graphql.schema';

@Injectable()
export class CatsLoader implements NestDataLoader {
  constructor(
    private readonly catsService: CatsService,
  ) {}
  generateDataLoader(): DataLoader<any, any> {
    // it should instantiate a data loader each time
    return new DataLoader<number, Cat>(this.catsService.findMany);
  }
}
