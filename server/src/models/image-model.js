import mongoose from 'mongoose'

const { Schema } = mongoose

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
    },
  },
)

export default mongoose.model('Image', ImageSchema)
