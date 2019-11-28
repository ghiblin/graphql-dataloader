import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsLoaders } from './comments.loader';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentsService, CommentsResolver, CommentsLoaders],
  exports: [CommentsService, CommentsLoaders],
})
export class CommentsModule {}
