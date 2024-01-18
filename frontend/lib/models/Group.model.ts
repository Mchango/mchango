import mongoose from 'mongoose'

const Participant = [
  {
    name: String,
    participantAddress: String,
    amountDonated: Number,
    amountCollected: Number,
    timeStamp: Date,
    isBanned: Boolean,
    isEligible: Boolean,
    hasReceivedFunds: Boolean,
    hasDonated: Boolean,
    reputation: Number,
  },
]

const GroupSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  collateral: { type: Number, required: true },
  contributionValue: { type: Number },
  admin: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  balance: { type: Number, required: true },
  timer: { type: Number, default: 0 },
  timeLimit: { type: Number, default: 0 },
  isGroupMember: { type: Map, of: Boolean },
  groupMembers: [{ type: String }],
  isEligibleMember: { type: Map, of: Boolean },
  eligibleMembers: [{ type: String }],
  participants: [Participant],
  collateralTracking: { type: Map, of: Number },
  currentState: { type: String },
})

const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema)

export default Group
