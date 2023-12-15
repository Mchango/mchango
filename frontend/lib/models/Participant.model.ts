import mongoose from 'mongoose'

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participantAddress: { type: String, required: true, unique: true },
  amountDonated: { type: Number, required: true },
  amountCollected: { type: Number, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
  isBanned: { type: Boolean, required: true },
  isEligible: { type: Boolean, required: true },
  hasReceivedFunds: { type: Boolean, required: true },
  hasDonated: { type: Boolean, required: true },
  reputation: { type: Number, required: true },
})

const participant =
  mongoose.models.Participant ||
  mongoose.model('Participant', ParticipantSchema)

export default participant
