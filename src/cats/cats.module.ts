import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { CatsLoader } from './cats.loader';

@Module({
  providers: [CatsService, CatsResolver, CatsLoader],
})
export class CatsModule {}
