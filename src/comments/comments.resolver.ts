import { Resolver, ResolveProperty, Parent, Mutation, Args } from '@nestjs/graphql';
import { Post, Comment, CommentInput } from '../graphql.schema';
import { Logger } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Resolver('Comment')
export class CommentsResolver {
  private readonly logger = new Logger(CommentsResolver.name);

  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Mutation('commentPost')
  async create(@Args('id') id: string, @Args('input') input: CommentInput) {
    this.logger.log(`Commenting on post "${id}" with "${input.text}"...`);
    return await this.commentsService.create(id, input.text);
  }
}
