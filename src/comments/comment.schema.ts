import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  _postId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
