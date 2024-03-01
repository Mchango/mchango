import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  memberAddress: { type: String, required: true, unique: true },
  amountDonated: { type: Number },
  amountCollected: { type: Number },
  reputation: { type: Number },
})

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)

export default Member
