import mongoose from 'mongoose'
const { Schema } = mongoose

const Newsmonger = new Schema(
  {
    email: String,
  },
  { timestamps: true, collection: 'newsmongers' }
)

export default mongoose.model('Newsmonger', Newsmonger)
