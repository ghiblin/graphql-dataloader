import { NestInterceptor, ExecutionContext, Type, Injectable, CallHandler, InternalServerErrorException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NestDataLoader } from './dataloader.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Context key where get loader function will be store
 */
export const GET_LOADER_CONTEXT_KEY = 'GET_LOADER_CONTEXT_KEY';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(
    private readonly moduleRef: ModuleRef,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const graphqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = graphqlExecutionContext.getContext();

    if (ctx[GET_LOADER_CONTEXT_KEY] === undefined) {
      ctx[GET_LOADER_CONTEXT_KEY] = (type: string): NestDataLoader => {
        if (ctx[type] === undefined) {
          try {
            ctx[type] = this.moduleRef
              .get<NestDataLoader>(type, { strict: false })
              .generateDataLoader();
          } catch (e) {
            throw new InternalServerErrorException(`The loader ${type} is not provided`);
          }
        }

        return ctx[type];
      };
    }

    return next.handle();
  }
}
