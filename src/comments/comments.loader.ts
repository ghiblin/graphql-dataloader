import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from '../common/dataloader.interface';
import { CommentsService } from './comments.service';
import { Comment } from './interfaces/comment.interface';

@Injectable()
export class CommentsLoaders implements NestDataLoader {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  generateDataLoader(): DataLoader<any, any> {
    return new DataLoader<string, Comment[]>(this.commentsService.findCommentsByPostIds);
  }
}
