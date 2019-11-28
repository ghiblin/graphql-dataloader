import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface Comment extends Document {
  _postId: ObjectId;
  text: string;
}
