import { Injectable } from '@nestjs/common';
import { Cat } from '../graphql.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ id: 1, name: 'Cat', age: 5 }];

  create(cat: CreateCatDto): Cat {
    const createdCat: Cat = {
      ...cat,
      id: this.cats.length + 1,
    };
    this.cats.push(createdCat);
    return createdCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  findMany = async (ids: number[]): Promise<Cat[]> => {
    return this.cats.filter(cat => ids.includes(cat.id));
  }
}
