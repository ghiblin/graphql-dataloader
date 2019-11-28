import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './common/dataloader.interceptor';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      retryAttempts: 5,
      retryDelay: 1000,
    }),
    GraphQLModule.forRoot({
      definitions: {
        path: join(process.cwd(), '/src/graphql.schema.ts'),
        outputAs: 'class',
      },
      typePaths: ['./**/*.graphql'],
    }),
    CatsModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
