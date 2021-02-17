import mongoose from 'mongoose'

const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const KeywordSchema = new Schema(
  {
    word: {
      type: String,
      trim: true,
    },
    images: {
      // type: [String],
      // type: [ObjectId],
      // ref: 'Image',
      type: [
        {
          imageId: ObjectId,
          score: Number,
        },
      ],
      ref: 'Image',
    },
  },
)

export default mongoose.model('Keyword', KeywordSchema)
