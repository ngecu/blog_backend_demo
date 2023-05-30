import mongoose from 'mongoose'


const postcategorySchema = mongoose.Schema(
  {
    post_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },

    category_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    }
  },
  {
    timestamps: true,
  }
)

const PostCategory = mongoose.model('PostCategory', postcategorySchema)

export default PostCategory
