import mongoose from 'mongoose'
import participant from './Participant.model'

const GroupSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  collateral: { type: Number, required: true },
  contributionValue: { type: Number, required: true },
  admin: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  balance: { type: Number, required: true },
  timer: { type: Number },
  timeLimit: { type: Number, required: true },
  groupMembers: [{ type: String, required: true }],
  eligibleMembers: [{ type: String, required: true }],
  participants: { type: [participant] },
  collateralTracking: { type: Map, of: Number },
  currentState: { type: String },
})

const group = mongoose.models.Group || mongoose.model('Group', GroupSchema)

export default group
