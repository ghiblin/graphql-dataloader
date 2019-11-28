import { Document } from 'mongoose';
import { Comment } from '../../comments/interfaces/comment.interface';

export interface Post extends Document {
  title: string;
  description: string;
  comments: Comment[];
}
