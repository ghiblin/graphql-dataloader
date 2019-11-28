import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interefaces/post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  findAll = async (): Promise<Post[]> => {
    return await this.postModel.find().exec();
  }

  create = async (title: string, description: string): Promise<Post> => {
    const createdPost = new this.postModel({ title, description });
    return await createdPost.save();
  }

  deleteOne = async (id: string): Promise<Post> => {
    return await this.postModel.findByIdAndDelete(id).exec();
  }
}
