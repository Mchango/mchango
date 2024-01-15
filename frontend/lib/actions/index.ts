import { connectDB } from './mongoose'
import Member from '../models/Member.model'
import Group from '../models/Group.model'

import {
  validateMemberInput,
  validateGroupInput,
  validatePremiumInput,
  validateIsMember,
  validateIsAdmin,
  validateIsPremiumSubscriber,
  validateDeleteGroupInput,
  validateJoinGroupInput,
  validateGroupIdInput,
  validateIsMemberOfGroup,
  validateStartContributionInput,
  validateContributeInput,
  validateIsEligible,
} from '../../utils/validation'

import {
  CreateMemberType,
  GroupStateType,
  GroupType,
  CurrentState,
  PremiumType,
  ParticipantType,
  FullParticipantType,
  DeleteGroupType,
  JoinGroupType,
  StartContributionType,
  ContributionType,
} from '../types'

const PREMIUM_FEE = 0.5 as Number

/**Database functions */
const MemberDB = {
  getMemberByAddress: async (address: String) => {
    return await Member.findOne({
      memberAddress: address,
    })
  },

  createMember: async (member: CreateMemberType) => {
    return await Member.create({
      id: member.id,
      name: member.name,
      memberAddress: member.memberAddress,
      amountDonated: 0,
      amountCollected: 0,
      reputation: 1,
      isPremiumSubscriber: false,
    })
  },
}

const GroupDB = {
  createGroup: async (group: GroupType) => {
    return await Group.create({
      id: group.id,
      collateral: group.collateral,
      contributionValue: 0,
      admin: group.address,
      name: group.name,
      description: group.description,
      balance: 0,
      timer: 0,
      timeLimit: 0,
      isGroupMember: new Map().set(group.address, true),
      isEligible: new Map().set(group.address, true),
      currentState: 'initialization' as CurrentState,
    })
  },

  findAndUpdateGroup: async (id: Number) => {
    return await Group.findOneAndUpdate({
      id: id,
    })
  },

  findGroupById: async (id: Number) => {
    return await Group.findOne({
      id: id,
    })
  },

  removeGroup: async (id: Number) => {
    return await Group.deleteOne({
      id: id,
    })
  },

  getGroupLength: async () => {
    try {
      const groups = await Group.find({})
      if (!groups) return console.log('No groups found')
      return console.log(groups.length)
    } catch (error) {
      return console.error('An error occurred while getting all groups', error)
    }
  },
}

/**state functions */
const startContribution = async (
  startContributionInput: StartContributionType,
) => {
  validateStartContributionInput(startContributionInput)
  try {
    const group = await GroupDB.findAndUpdateGroup(startContributionInput.id)

    if (!(await validateIsAdmin(group, startContributionInput.address)))
      return console.log('Member is not an admin')

    const contributionValue = await getAverageCollateralValue({
      id: startContributionInput.id,
      address: startContributionInput.address,
    })

    if (group.currentState === ('contribution' as CurrentState)) {
      return console.log('Group is already in contribution phase')
    }

    group.contributionValue = contributionValue
    group.currentState = 'contribution' as CurrentState
    group.timeLimit = startContributionInput.timeLimit
    group.timer = new Date().getTime()

    await group.save()
  } catch (error) {
    return console.error('An error occurred while starting contribution', error)
  }
}

const startRotation = async (id: Number, address: String) => {
  if (!id || typeof id !== 'number') return console.log('Invalid id')
  if (!address || typeof address !== 'string' || address.trim().length === 0)
    return console.log('Invalid address')

  try {
    const group = await GroupDB.findAndUpdateGroup(id)
    if (!group) return console.log('Group not found')

    if (!(await validateIsAdmin(group, address)))
      return console.log(`${address} is not group admin`)
    if (group.currentState === ('rotation' as CurrentState))
      return console.log('Group is already in rotation phase')

    //? check if contribution time limit has elapsed
    const contributionTime = group.timer
    const contributionTimeLimit = group.timeLimit
    const currentTime = new Date().getTime()

    if (currentTime < contributionTime + contributionTimeLimit) {
      return 'Contribution time limit has not elapsed yet.'
    }

    if (group.eligibleMembers.length < 2)
      return console.log('Group does not have enough eligible members')

    group.currentState = 'rotation' as CurrentState
    group.admin = group.eligibleMembers[group.eligibleMembers.length - 1]
  } catch (error) {
    return console.error('An error occurred while starting rotation', error)
  }
}

/**Subscription functions */
const subscribePremium = async (input: PremiumType) => {
  validatePremiumInput({
    address: input.address,
    amount: input.amount,
  })
  if (input.amount < PREMIUM_FEE)
    return console.log('Amount is less than the premium fee')
  try {
    const isMember = await validateIsMember({
      memberDB: MemberDB,
      address: input.address,
    })
    if (!isMember) return console.log('Member is not a member')

    let isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: input.address,
    })
    if (isPremiumSubscriber)
      return console.log('Member is already a premium subscriber')

    const member = await MemberDB.getMemberByAddress(input.address)
    member.isPremiumSubscriber = true
    member.subscriptionStartTime = new Date()
    await member.save()
    return console.log('Member subscribed to premium')
  } catch (error) {
    return console.log('An error occurred while subscribing a member', error)
  }
}

const unSubscribePremium = async (address: String) => {
  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    throw new Error('Invalid address')
  }
  const isMember = await validateIsMember({
    memberDB: MemberDB,
    address: address,
  })

  if (!isMember) return console.log('Member is not a member')

  try {
    let isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: address,
    })

    if (!isPremiumSubscriber)
      return console.log('Member is not a premium subscriber')
    const member = await MemberDB.getMemberByAddress(address)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    if (
      member.subscriptionStartTime &&
      new Date(member.subscriptionStartTime) <= thirtyDaysAgo
    ) {
      member.isPremiumSubscriber = false
    } else {
      return console.log('Subscription has not expired yet')
    }
    await member.save()
    return console.log('Subscription expired')
  } catch (error) {
    console.error('An error occurred while unsubscribing a member', error)
  }
}

/**Read Functions */
const getMember = async (address: String) => {
  try {
    const member = await MemberDB.getMemberByAddress(address)
    if (member) {
      return console.log(member)
    } else {
      return console.log('Member not found')
    }
  } catch (error) {
    return console.log('An error occurred while getting a member', error)
  }
}

const getIsPremiumSubscriber = async (address: String) => {
  try {
    const isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: address,
    })
    if (isPremiumSubscriber) {
      return console.log('Member is a premium subscriber')
    } else {
      return console.log('Member is not a premium subscriber')
    }
  } catch (error) {
    return console.log('An error occurred while getting a member', error)
  }
}

const getAllGroups = async () => {
  try {
    const groups = await Group.find({})
    if (!groups) return console.log('No groups found')
    return console.log(groups)
  } catch (error) {
    return console.log('An error occurred while getting all groups', error)
  }
}

const getParticipantData = async (
  participantInput: DeleteGroupType,
): Promise<FullParticipantType | null | String | void> => {
  const isIdValid = await validateGroupIdInput({
    groupDB: GroupDB,
    id: participantInput.id,
  })

  if (!isIdValid) return console.log('Invalid group id')

  try {
    const memberFound = await MemberDB.getMemberByAddress(
      participantInput.address,
    )
    if (!memberFound) return console.log('Member not found')

    const group = await GroupDB.findAndUpdateGroup(participantInput.id)

    const participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === participantInput.address
      })

    if (!participant) return console.log('Participant not found')

    return console.log(participant)
  } catch (error) {
    return console.log('An error occurred while getting a participant', error)
  }
}

const getAverageCollateralValue = async (collateralInput: DeleteGroupType) => {
  try {
    const group = await GroupDB.findGroupById(collateralInput.id)

    if (!group) return console.log('Group not found')

    if (!(await validateIsAdmin(group, collateralInput.address)))
      return console.log('Member is not an admin')

    let sumOfCollateral = 0
    for (let memberAddress of group.groupMembers) {
      sumOfCollateral += group.collateralTracking.get(memberAddress)
    }
    console.log(sumOfCollateral)

    const averageCollateralValue = sumOfCollateral / group.groupMembers.length
    return console.log(averageCollateralValue)
  } catch (error) {
    console.error(
      'An error occurred while getting the average collateral value',
      error,
    )
  }
}

/**Write Functions */

const createMember = async (member: CreateMemberType) => {
  validateMemberInput({
    id: member.id,
    name: member.name,
    memberAddress: member.memberAddress,
  })
  try {
    const memberFound = await MemberDB.getMemberByAddress(member.memberAddress)

    if (memberFound) {
      return console.log('Member already exists')
    }

    const newMember = await MemberDB.createMember(member)
    await newMember.save()

    return console.log('Member created')
  } catch (error) {
    console.error('An error occurred while creating a member', error)
  }
}

const createNewParticipant = async (participant: ParticipantType) => {
  const newParticipant = {
    name: participant.name,
    participantAddress: participant.address,
    amountDonated: participant.amountDonated ? participant.amountDonated : 0,
    amountCollected: 0,
    timeStamp: new Date(),
    isBanned: false,
    isEligible: true,
    hasReceivedFunds: false,
    hasDonated: true,
    reputation: 1,
  }

  participant.group.participants.push(newParticipant)
  await participant.group.save()
}

const createGroup = async (group: GroupType) => {
  validateGroupInput({
    id: group.id,
    name: group.name,
    description: group.description,
    address: group.address,
    collateral: group.collateral,
  })

  try {
    const memberFound = await MemberDB.getMemberByAddress(group.address)
    const memberName = memberFound ? memberFound.name : 'unknown'

    if (!memberFound) {
      return console.log('Only Registered members can create a group')
    }

    const isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: group.address,
    })
    if (!isPremiumSubscriber) {
      if (memberFound.numberOfGroupsCreated >= 2) {
        return console.log(
          'Member has reached the maximum number of groups, upgrade to premium to create more groups',
        )
      } else {
        memberFound.numberOfGroupsCreated++
        await memberFound.save()
      }
    }

    const newGroup = await GroupDB.createGroup(group)

    createNewParticipant({
      group: newGroup,
      address: group.address,
      name: memberName,
      amountDonated: 0,
    })

    return console.log('Group created')
  } catch (error) {
    return console.error('An error occurred while creating a group', error)
  }
}

const deleteGroup = async (groupInput: DeleteGroupType) => {
  validateDeleteGroupInput(groupInput)
  try {
    const group = await GroupDB.findGroupById(groupInput.id)
    const admin = await MemberDB.getMemberByAddress(groupInput.address)

    if (!group) {
      return console.log('Group not found')
    }

    if (!admin) {
      return console.log('Admin not found')
    }

    if (admin.memberAddress !== groupInput.address) {
      return console.log('Not the admin of this group')
    }

    await GroupDB.removeGroup(groupInput.id)
    admin.numberOfGroupsCreated--
    await admin.save()

    return console.log('Group deleted')
  } catch (error) {
    return console.error('An error occurred while deleting a group', error)
  }
}

const joinGroup = async (joinGroupInput: JoinGroupType) => {
  validateJoinGroupInput(joinGroupInput)

  try {
    const member = await MemberDB.getMemberByAddress(joinGroupInput.address)

    if (!member) return console.log('Member not found, Sign up to join a group')

    const group = await GroupDB.findAndUpdateGroup(joinGroupInput.id)
    const isValid = await validateGroupIdInput({
      groupDB: GroupDB,
      id: joinGroupInput.id,
    })

    if (!isValid) return console.log('Group not found')

    const adminAddress = group.admin
    const isPremiumSubscriber = await validateIsPremiumSubscriber({
      address: adminAddress,
      memberDB: MemberDB,
    })

    if (!isPremiumSubscriber) {
      if (group.groupMembers.length >= 10) return console.log('Group is full')
    }

    const isMemberAlreadyInGroup = await validateIsMemberOfGroup({
      id: joinGroupInput.id,
      address: joinGroupInput.address,
      groupDB: GroupDB,
    })
    if (isMemberAlreadyInGroup) return console.log('Member already in group')
    if (group.currentState !== ('initialization' as CurrentState))
      return console.log('Can not join group as of this time')

    if (joinGroupInput.collateralValue < group.collateral)
      return console.log('Insufficient collateral to join this group')

    group.groupMembers.push(joinGroupInput.address)
    group.isGroupMember = new Map().set(joinGroupInput.address, true)
    group.collateralTracking = new Map().set(
      joinGroupInput.address,
      joinGroupInput.collateralValue,
    )

    await group.save()

    return console.log(`Successfully added ${member.name} to ${group.name}`)
  } catch (error) {
    console.error('An error occurred while joining a group', error)
  }
}

const contribute = async (contributeInput: ContributionType) => {
  validateContributeInput(contributeInput)

  try {
    const group = await GroupDB.findAndUpdateGroup(contributeInput.id)
    const member = await MemberDB.getMemberByAddress(contributeInput.address)

    if (!group) return console.log('Group not found')
    if (!member) return console.log('Member not found')
    if (
      !validateIsMemberOfGroup({
        id: contributeInput.id,
        groupDB: GroupDB,
        address: contributeInput.address,
      })
    )
      return console.log(
        `${contributeInput.address} is not a member of this group`,
      )

    let participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === contributeInput.address
      })

    switch (group.currentState) {
      case 'contribution':
        if (contributeInput.amount < group.contributionValue) {
          return console.log('Insufficient Amount')
        }

        if (participant) {
          return console.log(
            'Already contributed, please wait for rotation to start',
          )
        }

        await createNewParticipant({
          group: group,
          address: contributeInput.address,
          name: member.name,
          amountDonated: contributeInput.amount,
        })

        await handleContributionState(
          contributeInput.address,
          group,
          contributeInput.amount,
        )

        console.log(
          `${contributeInput.address} contributed ${contributeInput.amount} to ${group.name}`,
        )
        break

      case 'Rotation':
        if (!participant) {
          return console.log('Only participant can contribute in rotation')
        }

        if (!(await validateIsEligible(group, contributeInput.address))) {
          return console.log(
            'Not eligible to contribute in rotation, please wait for the next contribution phase',
          )
        }

        await handleRotationState(
          contributeInput.address,
          group,
          contributeInput.amount,
        )
        break

      default:
        console.log("Can only contribute in 'contribution' or 'rotation' state")
        break
    }
  } catch (error) {
    console.error('An error occurred while contributing', error)
  }
}

const handleContributionState = async (
  address: String,
  group: any,
  amount: Number,
) => {
  const participant = group.participants
    .flat() //Flatten the array to remove nested array
    .find((participant: FullParticipantType) => {
      return participant.participantAddress === address
    })

  participant.hasDonated = true
  participant.timeStamp = Date.now()

  group.balance += amount
  group.eligibleMembers.push(participant.participantAddress)
  group.isEligible.set(participant.participantAddress, true)
}

const handleRotationState = async (
  address: String,
  group: any,
  amount: Number,
) => {
  const participant = group.participants
    .flat() //Flatten the array to remove nested array
    .find((participant: FullParticipantType) => {
      return participant.participantAddress === address
    })
  participant.amountDonated += amount
  participant.hasDonated = true
  participant.timeStamp = Date.now()
  participant.reputation += 1

  group.balance += amount
}

export {
  startContribution,
  startRotation,
  subscribePremium,
  unSubscribePremium,
  getMember,
  getIsPremiumSubscriber,
  getAllGroups,
  getParticipantData,
  createMember,
  createGroup,
  deleteGroup,
  joinGroup,
  contribute,
}
