import { connectDB } from '@/database/mongoose'
import {
  createMember,
  createGroup,
  handleGetNumberOfGroupsCreated,
  getIsPremiumSubscriber,
} from '@/database'
import {
  createNewGroup,
  createNewMember,
  getProviderAndSigner,
} from '@/contract-actions'

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

const createUserGroup = async (
  collateralValue: string,
  name: string,
  description: string,
) => {
  try {
    const { signer } = await getProviderAndSigner()
    const walletAddress = await signer.getAddress()
    if (!walletAddress || typeof walletAddress !== 'string')
      throw new Error('An error occurred while getting signer')

    const isPremiumSubscriber = await getIsPremiumSubscriber(walletAddress)
    if (!isPremiumSubscriber) {
      const numberOfGroupsCreated = await handleGetNumberOfGroupsCreated(
        walletAddress,
      )

      if (numberOfGroupsCreated >= 2) {
        throw new Error(
          'You have reached your limit, upgrade to premium to create more groups',
        )
      }

      const [formatted, numberFormat, signerAddress] = await createNewGroup(
        collateralValue,
      )
      if (!formatted || !numberFormat || !signerAddress)
        throw new Error('is metamask connected?')

      await createGroup({
        id: formatted as number,
        name: name as string,
        description: description as string,
        collateral: numberFormat as number,

        admin: signerAddress as string,
      })

      return console.log(`${name} was successfully created`)
    }
  } catch (error) {
    console.error('An error occurred while creating a new group', error)
    throw new Error('An error occurred while creating a new group')
  }
}

export { createUser, createUserGroup }
