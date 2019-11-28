import { createParamDecorator, InternalServerErrorException } from '@nestjs/common';
import { GET_LOADER_CONTEXT_KEY, DataLoaderInterceptor } from './dataloader.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const Loader: (type: string) => ParameterDecorator = createParamDecorator(
  (type: string, [_, __, ctx, ___]: any) => {
    if (ctx[GET_LOADER_CONTEXT_KEY] === undefined) {
      throw new InternalServerErrorException(
        `You should provide interceptor ${DataLoaderInterceptor.name} globaly with ${APP_INTERCEPTOR}`,
      );
    }

    return ctx[GET_LOADER_CONTEXT_KEY](type);
  },
);
