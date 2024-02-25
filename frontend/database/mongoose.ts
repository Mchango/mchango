'use server'

import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectDB = async () => {
  mongoose.set('strictQuery', true)
  if (cached.conn) return cached.conn

  if (!process.env.MONGODB_URL)
    throw new Error('Please add your Mongo URI to.env.local')

  cached.promise = mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'Mchango',
    bufferCommands: false,
  })

  console.log('Connecting to MongoDB...')

  cached.conn = await cached.promise
  console.log('MongoDB connected')

  return cached.conn
}
