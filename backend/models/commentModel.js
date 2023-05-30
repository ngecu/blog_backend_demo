import mongoose from 'mongoose'


const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    }
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
