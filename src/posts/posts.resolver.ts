import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post, PostInput, Comment } from '../graphql.schema';
import { Logger } from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { Loader } from '../common/loader.decorator';
import * as DataLoader from 'dataloader';

@Resolver('Post')
export class PostsResolver {
  private readonly logger = new Logger(PostsResolver.name);

  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Query('posts')
  async findAll(): Promise<Post[]> {
    return await this.postsService.findAll();
  }

  @Mutation('createPost')
  async create(@Args('input') input: PostInput): Promise<Post> {
    const { title, description } = input;
    return await this.postsService.create(title, description);
  }

  @Mutation('deletePost')
  async deletePost(@Args('_id') id: string): Promise<Post> {
    return await this.postsService.deleteOne(id);
  }

  @ResolveProperty('comments')
  async comments(
    @Parent() post: Post,
    @Loader('CommentsLoaders') commentsLoaders: DataLoader<string, Comment[]>,
  ): Promise<Comment[]> {
    this.logger.log(`resolving comments for post "${post._id}"...`);
    return commentsLoaders.load(post._id);
  }
}
