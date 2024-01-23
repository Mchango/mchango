import { connectDB } from '@/database/mongoose'
import { createMember } from '@/database'
import { createNewMember } from '@/contract-actions'

class MetaMaskError extends Error {}

const createUser = async (name: string) => {
  await connectDB()
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    try {
      const [formatted, signerAddress] = await createNewMember()
      if (!formatted || !signerAddress) {
        throw new Error('An error occurred while creating new member')
      }

      await createMember({
        id: formatted,
        name: name,
        memberAddress: signerAddress,
      })

      return console.log(
        `Successfully created ${name} with address ${signerAddress}`,
      )
    } catch (error) {
      throw new Error('An error occurred while creating new member')
    }
  } else {
    throw new MetaMaskError('MetaMask is not installed')
  }
}

export { createUser }
