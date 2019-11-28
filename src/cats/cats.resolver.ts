import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { UseGuards, ParseIntPipe } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CatsService } from './cats.service';
import { CatsGuard } from './cats.guard';
import { CreateCatDto } from './dto/create-cat.dto';
import DataLoader = require('dataloader');
import { Cat } from '../graphql.schema';
import { Loader } from '../common/loader.decorator';
import { CatsLoader } from './cats.loader';

const pubSub = new PubSub();

@Resolver('Cats')
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
  ) {}

  @Query()
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe) id: number,
    @Loader(CatsLoader.name) catsLoader: DataLoader<number, Cat>,
  ) {
    // return await this.catsService.findOneById(id);
    return catsLoader.load(id);
  }

  @Mutation('createCat')
  async create(
    @Args('createCatInput') args: CreateCatDto,
  ) {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}
