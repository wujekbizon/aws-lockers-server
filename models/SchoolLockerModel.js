import mongoose from 'mongoose'
import { PRIVACY, DEFAULT_IMAGE, ROLES } from '../utils/constanst.js'
const { Schema } = mongoose

const SchoolLocker = new Schema(
  {
    email: String,
    password: String,
    title: String,
    student: String,
    schoolName: String,
    classroom: String,
    img: { type: String, default: DEFAULT_IMAGE },
    privacy: {
      type: String,
      enum: Object.values(PRIVACY),
      default: PRIVACY.PUBLIC,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  { timestamps: true, collection: 'lockers' }
)

SchoolLocker.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('SchoolLocker', SchoolLocker)
