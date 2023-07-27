import mongoose from 'mongoose'

export const connectToDatabase = async (dbName) => {
  let client
  try {
    client = await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.knuso.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Connected to MongoDB')
  } catch (error) {
    throw new Error('Connection to MongoDb failed, please try later!')
  }
  return client
}
