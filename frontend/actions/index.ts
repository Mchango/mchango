'use server'
import { connectDB } from '@/database/mongoose'
import {
  createMember,
  createGroup,
  joinGroup,
  handleGetNumberOfGroupsCreated,
  getIsPremiumSubscriber,
  handleGetGroupCollateralValue,
  handleGetMemberReputationPoint,
  subscribePremium,
  startContribution,
  MemberDB,
} from '@/database'
import {
  createNewGroup,
  createNewMember,
  getProviderAndSigner,
  valueFormatter,
  subscribePremiumUser,
  joinCreatedGroup,
  StartContribution,
} from '@/contract-actions'
import { StartContributionType } from '@/lib/types'
import Member from '@/lib/models/Member.model'

const connectAndValidate = async (address: string) => {
  await connectDB()
  let isMember = false
  try {
    if (!address) throw new Error('Invalid address')
    const member = await MemberDB.getMemberByAddress(address)

    if (member != null || member != undefined) {
      isMember = true
    } else {
      throw new MemberNotFoundError()
    }

    return isMember
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while validating member')
  }
}

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
    throw new MetaMaskError()
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

const validateReputationAndCollateral = async (
  id: number,
  amount: string,
): Promise<[number, boolean, number, number, Number, string]> => {
  try {
    let isValidated = false
    const { signer } = await getProviderAndSigner()
    const walletAddress = await signer.getAddress()
    const reputationPoint: number = await handleGetMemberReputationPoint(
      walletAddress as string,
    )

    const result = valueFormatter(amount)
    if (!result) throw new Error('Error parsing value')
    const [formattedValue, numberFormat] = result

    if (reputationPoint < 1)
      throw new ReputationError(
        'You need to have reputation above 0 point to join a group',
      )

    const collateralValue: number = await handleGetGroupCollateralValue(id)
    const formattedCollateralValue = Number(collateralValue.toString())
    if (!formattedCollateralValue) throw new Error('Invalid collateral value')

    if (numberFormat != collateralValue) {
      throw new Error('Collateral value does not match with the amount')
    }
    isValidated = true
    return [
      collateralValue,
      isValidated,
      reputationPoint,
      numberFormat,
      formattedCollateralValue,
      walletAddress,
    ]
  } catch (error) {
    console.error('An error occurred while validating reputation', error)
    throw new Error('An error occurred while validating reputation')
  }
}

const joinUserGroup = async (id: number, amount: string) => {
  if (!id || typeof id !== 'number') throw new Error('Invalid id')
  try {
    await connectDB()
    const [
      collateralValue,
      isValidated,
      reputationPoint,
      numberFormat,
      formattedCollateralValue,
      walletAddress,
    ] = await validateReputationAndCollateral(id, amount)

    if (!isValidated) throw new Error('Invalid reputation point')
    if (collateralValue == 0) throw new Error('Invalid collateral value')

    await joinCreatedGroup({
      id: id as number,
      amount: amount,
      collateralValue: collateralValue,
      reputationPoint: reputationPoint,
    })

    await joinGroup({
      id: id as number,
      address: walletAddress as string,
      collateralValue: formattedCollateralValue,
    })

    return console.log(
      `User joined group ${id} with a reputation of ${reputationPoint}`,
    )
  } catch (error) {
    console.error('An error occurred while joining a group', error)
    throw new JoinGroupError()
  }
}

const premiumSubscription = async () => {
  try {
    const [signerAddress, numberFormat] = await subscribePremiumUser()
    if (!signerAddress || !numberFormat)
      throw new Error('error communicating with smart contract')

    await subscribePremium({
      address: signerAddress as string,
      amount: numberFormat as number,
    })
  } catch (error) {
    console.error('An error occurred while subscribing to premium', error)
    if (error) throw new SubscriptionError()
  }
}

const startGroupContribution = async (
  startContributionInput: StartContributionType,
) => {
  try {
    if (
      !startContributionInput.id ||
      typeof startContributionInput.id !== 'number'
    )
      throw new Error('Invalid id')
    if (
      !startContributionInput.address ||
      typeof startContributionInput.address !== 'string'
    )
      throw new Error('Invalid address')
    const { signer } = await getProviderAndSigner()
    const signerAddress = await signer.getAddress()

    const contributionValue: number = await startContribution({
      ...startContributionInput,
      address: signerAddress as string,
    })

    if (!contributionValue) {
      throw new StartContributionError()
    }

    await StartContribution(startContributionInput.id, contributionValue)
  } catch (error) {}
}

export {
  createUser,
  createUserGroup,
  joinUserGroup,
  premiumSubscription,
  startGroupContribution,
  connectAndValidate,
}
