import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface';
import { ObjectId } from 'bson';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  create = async (postId: string, text: string): Promise<Comment> => {
    const objId = new ObjectId(postId);
    const createdComment = new this.commentModel({ _postId: objId, text });
    return await createdComment.save();
  }

  // tslint:disable-next-line:array-type
  findCommentsByPostIds = async (postIds: string[]): Promise<Array<Comment[]>> => {
    this.logger.log(`Finding comments for posts ${postIds.join(',')}`);
    const ids = postIds.map(id => new ObjectId(id));
    const comments = await this.commentModel.find({ _postId: { $in: ids } }).exec();
    return postIds.map(id => comments.filter(c => c._postId.equals(id)));
  }
}
