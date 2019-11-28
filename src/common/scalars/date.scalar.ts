import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    return value.getTime();
  }
  parseLiteral(ast: any): Date {
    if (ast.Kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
