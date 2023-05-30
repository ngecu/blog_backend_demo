import mongoose from 'mongoose'


const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      
    },
    // author_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    tags:[{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Tag',
    }],
    views: {
      type: Number,
      required: true,
      default:0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    }
    ,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
