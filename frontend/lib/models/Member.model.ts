import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  memberAddress: { type: String, required: true, unique: true },
  amountDonated: { type: Number },
  amountCollected: { type: Number },
  reputation: { type: Number },
})

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)

export default Member
