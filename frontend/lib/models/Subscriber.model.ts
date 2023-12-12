import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  tier: { type: String, required: true },
  date: { type: Date, required: true },
})

const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema)

export default Subscriber
