import mongoose from 'mongoose'


const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
)

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
