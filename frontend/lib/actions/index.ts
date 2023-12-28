import { connectToDB } from './mongoose'
import Member from '../models/Member.model'

type MemberProps = {
  name: string
  address: string
}

export const createMember = async ({ name, address }: MemberProps) => {
  connectToDB()

  //? Check if member exsists in DB

  const member = await Member.findOne({ address: address })
  if (member) return 'Member already exists'

  if (!member) {
    const newMember = await Member.create({
      id: 0,
      name: name,
      memberAddress: address,
    })

    const newMemberName = await newMember.name
    const newMemberAddress = await newMember.address

    return {
      newMemberName,
      newMemberAddress,
    }
  }
}

createMember({
  name: 'chikezie',
  address: 'thisisamockaddress',
})
