import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return console.log('MongoDB Url is required')

  if (isConnected) return console.log('Connection to MongoDB is established')

  try {
    await mongoose.connect(process.env.MONGODB_URL)

    isConnected = true
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('An error occurred', error)
  }
}
