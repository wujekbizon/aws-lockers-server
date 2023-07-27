import mongoose from 'mongoose'
const { Schema } = mongoose

const Rumor = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'SchoolLocker', required: true },
    title: String,
    content: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'rumors' }
)

export default mongoose.model('Rumor', Rumor)
