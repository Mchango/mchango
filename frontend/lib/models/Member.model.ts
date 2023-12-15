import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  memberAddress: { type: String, required: true, unique: true },
  amountDonated: { type: Number, required: true },
  amountCollected: { type: Number, required: true },
  reputation: { type: Number, required: true },
})

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)

export default Member
