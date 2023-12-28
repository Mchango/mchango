import mongoose from 'mongoose';

const participant = [
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
];

const GroupSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  collateral: { type: Number, required: true },
  contributionValue: { type: Number },
  admin: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  balance: { type: Number, required: true },
  timer: { type: Number },
  timeLimit: { type: Number },
  isGroupMember: { type: Map, of: Boolean },
  groupMembers: [{ type: String }],
  isEligibleMember: { type: Map, of: Boolean },
  eligibleMembers: [{ type: String }],
  participants: [participant],
  collateralTracking: { type: Map, of: Number },
  currentState: { type: String },
});

const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);

export default Group;
