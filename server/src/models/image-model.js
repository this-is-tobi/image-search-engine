import mongoose from 'mongoose'

const { Schema } = mongoose
// const ObjectId = Schema.Types.ObjectId

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
      // type: [
      //   {
      //     word: String,
      //     score: Number,
      //   }],
    },
  },
)

export default mongoose.model('Image', ImageSchema)
