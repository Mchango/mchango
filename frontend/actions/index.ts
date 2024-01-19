import { connectDB } from './mongoose'
import Member from '../lib/models/Member.model'
import Group from '../lib/models/Group.model'

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
} from '../utils/validation'

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
} from '../lib/types'

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
      isEligibleMember: new Map().set(group.address, true),
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
    const group = await GroupDB.findGroupById(startContributionInput.id)

    if (!(await validateIsAdmin(group, startContributionInput.address)))
      return console.log('Member is not an admin')

    const contributionValue = await getAverageCollateralValue({
      id: startContributionInput.id,
      address: startContributionInput.address,
    })

    console.log(contributionValue)

    if (group.currentState === ('contribution' as CurrentState)) {
      return console.log(`${Group.name} is already in contribution phase`)
    }

    group.contributionValue = contributionValue
    group.currentState = 'contribution' as CurrentState
    group.timeLimit = startContributionInput.timeLimit
    group.timer = Date.now()

    await group.save()
    return console.log(
      `${group.name} started contribution, contribution value: ${contributionValue}`,
    )
  } catch (error) {
    return console.error('An error occurred while starting contribution', error)
  }
}

const startRotation = async (id: Number, address: String) => {
  if (!id || typeof id !== 'number') return console.log('Invalid id')
  if (!address || typeof address !== 'string' || address.trim().length === 0)
    return console.log('Invalid address')

  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    if (!(await validateIsAdmin(group, address)))
      return console.log(`${address} is not group admin`)

    switch (group.currentState) {
      case 'rotation' as CurrentState:
        return console.log(`${group.name} is already in rotation phase`)

      case 'initialization' as CurrentState:
        return console.log('Group is still in initialization phase')

      case 'contribution' as CurrentState:
        const contributionTime = group.timer
        const contributionTimeLimit = group.timeLimit
        const currentTime = new Date().getTime()

        if (currentTime < contributionTime + contributionTimeLimit) {
          return 'Contribution time limit has not elapsed yet.'
        }

        if (group.eligibleMembers.length < 2)
          return console.log('Group does not have enough eligible members')

        group.currentState = 'rotation' as CurrentState
        await handleCorrectEligibleMemberArray(id)

        await group.save()
    }

    return console.log(`${group.name} started rotation`)
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
      const memberCollateralValue = group.collateralTracking.get(memberAddress)

      if (typeof memberCollateralValue === 'number') {
        sumOfCollateral += memberCollateralValue
      }
    }
    if (sumOfCollateral === 0 || isNaN(sumOfCollateral)) {
      return console.log('No collateral value found')
    }
    console.log(sumOfCollateral)
    const averageCollateralValue = sumOfCollateral / group.groupMembers.length

    return averageCollateralValue
  } catch (error) {
    console.error(
      'An error occurred while getting the average collateral value',
      error,
    )
  }
}

const getCollateralValue = async (id: Number, address: String) => {
  const group = await GroupDB.findGroupById(id)

  try {
    const collateralValue = group.collateralTracking.get(address)
    console.log(collateralValue)
  } catch (error) {
    console.error('An error occurred while getting the collateral value', error)
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
    newGroup.groupMembers.push(group.address)
    newGroup.eligibleMembers.push(group.address)

    await newGroup.save()

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

    if (member.reputation < 1)
      return console.log('Member is not eligible to join a group')

    const group = await GroupDB.findGroupById(joinGroupInput.id)
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

    switch (group.currentState) {
      case 'initialization' as CurrentState:
        if (joinGroupInput.collateralValue < group.collateral)
          return console.log('Insufficient collateral to join this group')

        group.groupMembers.push(joinGroupInput.address)
        if (!group.isGroupMember) {
          group.isGroupMember = new Map()
        }
        group.isGroupMember.set(joinGroupInput.address, true)

        if (!group.collateralTracking) {
          group.collateralTracking = new Map()
        }
        group.collateralTracking.set(
          joinGroupInput.address,
          joinGroupInput.collateralValue,
        )

        break

      case 'contribution' as CurrentState:
        return console.log('Group is in contribution, cannot join')

      case 'rotation' as CurrentState:
        return console.log('Group is in rotation, cannot join')
    }

    await group.save()

    return console.log(`Successfully added ${member.name} to ${group.name}`)
  } catch (error) {
    console.error('An error occurred while joining a group', error)
  }
}

const contribute = async (contributeInput: ContributionType) => {
  validateContributeInput(contributeInput)

  try {
    const group = await GroupDB.findGroupById(contributeInput.id)
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
      case 'contribution' as CurrentState:
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

        await group.save()

        await handleContributionState(
          contributeInput.address,
          contributeInput.id,
          contributeInput.amount,
        )

        return console.log(
          `${contributeInput.address} contributed ${contributeInput.amount} to ${group.name}`,
        )

      case 'rotation' as CurrentState:
        if (!participant) {
          return console.log('Only participant can contribute in rotation')
        }

        if (
          !(await validateIsEligible(
            GroupDB,
            contributeInput.id,
            contributeInput.address,
          ))
        ) {
          return console.log(
            'Not eligible to contribute in rotation, please wait for the next contribution phase',
          )
        }

        await handleRotationState(
          contributeInput.address,
          contributeInput.id,
          contributeInput.amount,
        )

        return console.log(
          `${contributeInput.address} contributed ${contributeInput.amount} to ${group.name}`,
        )

      default:
        return console.log(
          "Can only contribute in 'contribution' or 'rotation' state",
        )
    }
  } catch (error) {
    console.error('An error occurred while contributing', error)
  }
}

const disburse = async (disburseInput: DeleteGroupType) => {
  validateDeleteGroupInput(disburseInput)

  try {
    const group = await GroupDB.findGroupById(disburseInput.id)
    const amountToDisburse = group.balance
    let contributionTime = group.timer
    const contributionTimeLimit = group.timeLimit
    const currentTime = new Date().getTime()

    if (currentTime < contributionTime + contributionTimeLimit) {
      return 'Contribution time limit has not elapsed yet.'
    }

    //? penalize eligible members that did not contribute
    await penalize(disburseInput.id)
    const recipientAddress = group.eligibleMembers[0]
    const member = await MemberDB.getMemberByAddress(recipientAddress)
    if (!member) return console.log('Member not found')

    //? fetch participant data of the recipient address
    const participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === recipientAddress
      })

    if (!participant) return console.log('Participant not found')
    if (!participant.hasDonated)
      return console.log('Participant has not donated')
    if (participant.hasReceivedFunds)
      return console.log('Participant has received funds for this round')

    //? send the group balance to recipient
    await handleDisbursement(
      disburseInput.id,
      amountToDisburse,
      recipientAddress,
    )
    group.balance = 0
    participant.hasReceivedFunds = true
    participant.amountCollected += amountToDisburse

    await group.save()

    await handleResetParticipantHasDonatedState(disburseInput.id)

    //? move the recipient address to the back of the array
    await handleCorrectEligibleMemberArray(disburseInput.id)

    await group.save()

    //? check if all participant has received funds
    const hasAllParticipantReceivedFunds = await handleCheckIfAllParticipantsHaveReceivedFunds(
      disburseInput.id,
    )

    if (hasAllParticipantReceivedFunds) {
      //? call end rotation
      return console.log('All participants have received funds')
    }

    contributionTime = new Date().getTime()

    await group.save()

    return console.log(
      `Successfully disbursed ${amountToDisburse} to ${member.name}`,
    )
  } catch (error) {
    console.error('An error occurred while disbursing', error)
  }
}

/**utility functions */
//todo: yet to be tested
const penalize = async (id: Number) => {
  if (!id || typeof id !== 'number') {
    return console.log('Invalid id')
  }

  try {
    const group = await GroupDB.findGroupById(id)
    let memberToBePenalized

    for (let memberAddress of group.eligibleMembers) {
      const participant = group.participants
        .flat()
        .find((participant: FullParticipantType) => {
          return participant.participantAddress === memberAddress
        })

      if (!participant.hasDonated) {
        participant.reputation -= 1
        memberToBePenalized = participant.name
      }

      await group.save()

      if (
        group.collateralTracking.get(memberAddress) - group.contributionValue >
        0
      ) {
        if (participant.reputation > 0) {
          await handleRemoveEligibilityStatus(id, memberAddress)
        } else if (participant.reputation <= 0) {
          await handleRemoveMember(id, memberAddress)
        }
      } else {
        await handleRemoveMember(id, memberAddress)
      }
    }

    await group.save()
    return console.log(`Successfully penalized ${memberToBePenalized}`)
  } catch (error) {
    return console.log('An error occurred while penalizing members', error)
  }
}

const updateContributionTimeLimit = async (
  timeLimitInput: DeleteGroupType,
  newTimeLimit: Number,
) => {
  validateDeleteGroupInput(timeLimitInput)

  try {
    const group = await GroupDB.findGroupById(timeLimitInput.id)
    const admin = await MemberDB.getMemberByAddress(timeLimitInput.address)

    const isGroupAdmin = await validateIsAdmin(group, admin)
    if (!isGroupAdmin) {
      return console.log('Not admin of this group')
    }

    group.timeLimit = newTimeLimit
    await group.save()

    return console.log('Time limit updated')
  } catch (error) {
    console.error(
      'An error occurred while updating contribution time limit',
      error,
    )
  }
}

const handleRemoveMember = async (id: Number, memberAddress: String) => {
  try {
    const group = await GroupDB.findGroupById(id)
    const member = await MemberDB.getMemberByAddress(memberAddress)
    if (!group) return console.log('Group not found')
    if (!member) return console.log('Member not found')
    await handleDeleteParticipant(id, memberAddress)

    group.isGroupMember.delete(memberAddress)
    group.collateralTracking.delete(memberAddress)

    member.reputation--
    await group.save()
  } catch (error) {
    console.error('An error occurred while removing member', error)
  }
}

const handleRemoveEligibilityStatus = async (
  id: number,
  memberAddress: String,
) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    const amountToDeductFromCollateral = group.balance
    const newCollateralValue =
      group.collateralTracking.get(memberAddress) - amountToDeductFromCollateral
    group.collateralTracking.set(memberAddress, newCollateralValue)

    await handleDeleteParticipant(id, memberAddress)

    await group.save()
  } catch (error) {
    console.error('An error occurred while removing eligibility status', error)
  }
}

const handleContributionState = async (
  address: String,
  id: Number,
  amount: Number,
) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    const participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === address
      })

    if (!participant) return console.log('Participant not found')

    participant.hasDonated = true
    participant.timeStamp = Date.now()
    participant.isEligible = true

    group.balance += amount
    group.eligibleMembers.push(address)
    group.isEligibleMember.set(participant.participantAddress, true)

    await group.save()
  } catch (error) {
    console.error('An error occurred while updating contribution state', error)
  }
}

const handleDeleteParticipant = async (id: Number, memberAddress: String) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    group.eligibleMembers.splice(
      group.eligibleMembers.indexOf(memberAddress),
      1,
    )

    group.isEligibleMember.set(memberAddress, false)

    const participantIndex = group.participants.findIndex(
      (participantArray: FullParticipantType[]) =>
        participantArray.some(
          (participant: FullParticipantType) =>
            participant.participantAddress === memberAddress,
        ),
    )

    if (participantIndex > -1) {
      group.participants.splice(participantIndex, 1)
      await group.save()
      return console.log('Successfully deleted participant')
    } else {
      return console.log('Participant not found in the group')
    }
  } catch (error) {
    console.error('An error occurred while deleting participant', error)
  }
}

const handleRotationState = async (
  address: String,
  id: Number,
  amount: Number,
) => {
  const group = await GroupDB.findGroupById(id)
  if (!group) return console.log('Group not found')

  try {
    const participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === address
      })
    if (!participant) return console.log('Participant not found')
    if (!participant.isEligible)
      return console.log('Participant is not eligible')

    participant.amountDonated += amount
    participant.hasDonated = true
    participant.timeStamp = Date.now()
    participant.reputation += 1

    group.balance += amount

    await group.save()
  } catch (error) {
    console.error('An error occurred while updating rotation state', error)
  }
}

const handleDisbursement = async (
  id: Number,
  amount: Number,
  address: String,
) => {
  //? smart contract disbursement function goes here
}

const handleCheckIfAllParticipantsHaveReceivedFunds = async (id: Number) => {
  let hasAllParticipantsReceivedFunds = false
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    for (let memberAddress of group.eligibleMembers) {
      const participant = group.participants
        .flat()
        .find((participant: FullParticipantType) => {
          return participant.participantAddress === memberAddress
        })

      let numberOfParticipantThatHasReceivedFunds = 0
      if (participant.hasReceivedFunds) {
        numberOfParticipantThatHasReceivedFunds++
      }

      if (
        numberOfParticipantThatHasReceivedFunds === group.eligibleMembers.length
      ) {
        hasAllParticipantsReceivedFunds = true
      }
    }
    await group.save()
    return hasAllParticipantsReceivedFunds
  } catch (error) {
    console.error(
      'An error occurred while checking if all participants have received funds',
      error,
    )
  }
}

const handleResetParticipantHasDonatedState = async (id: Number) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')
    for (let memberAddress of group.eligibleMembers) {
      const participant = group.participants
        .flat()
        .find((participant: FullParticipantType) => {
          return participant.participantAddress === memberAddress
        })

      participant.hasDonated = false
    }
    await group.save()
  } catch (error) {
    console.error(
      "An error occurred while resetting participant's donation state",
      error,
    )
  }
}

const handleCorrectEligibleMemberArray = async (id: Number) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    group.eligibleMembers.push(group.eligibleMembers.shift())
    await group.save()
  } catch (error) {
    console.error(
      'An error occurred while correcting eligible member array',
      error,
    )
  }
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
  updateContributionTimeLimit,
  penalize,
  disburse,
}
