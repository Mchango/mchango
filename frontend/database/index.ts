"use server"

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

enum State {
  Initialization = 'initialization',
  Contribution = 'contribution',
  Rotation = 'rotation',
}

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
      email: member.email,
      username: member.username,
      country: member.country,
      phone: member.phone,
      profilePicture: 'https://i.imgur.com/34g785y.png',
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
      admin: group.admin,
      name: group.name,
      description: group.description,
      profilePicture: group.profilePicture
        ? group.profilePicture
        : 'https://i.imgur.com/34g785y.png',
      balance: group.balance ? group.balance : 0,
      timer: group.timer ? group.timer : 0,
      timeLimit: group.timeLimit ? group.timeLimit : 0,
      isGroupMember: group.isGroupMember
        ? group.isGroupMember
        : new Map().set(group.admin, true),
      isEligibleMember: group.isEligibleMember
        ? group.isEligibleMember
        : new Map().set(group.admin, true),
      currentState: group.currentState
        ? group.currentState
        : ('initialization' as CurrentState),
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
/**state functions */
const startContribution = async (
  startContributionInput: StartContributionType,
): Promise<number> => {
  validateStartContributionInput(startContributionInput)
  try {
    const group = await GroupDB.findGroupById(startContributionInput.id)

    if (
      !(await validateIsAdmin(
        GroupDB,
        startContributionInput.id,
        startContributionInput.address,
      ))
    ) {
      throw new AdminError()
    }

    const contributionValue = await getAverageCollateralValue({
      id: startContributionInput.id,
      address: startContributionInput.address,
    })

    if (contributionValue === 0 || contributionValue === undefined) {
      throw new Error('No contribution value found')
    }

    if (group.currentState === (State.Contribution as CurrentState)) {
      throw new GroupStateError(
        `${group.name} is already in contribution state`,
      )
    }

    group.contributionValue = contributionValue
    group.currentState = 'contribution' as CurrentState
    group.timeLimit = startContributionInput.timeLimit
    group.timer = Date.now()

    await group.save()
    return contributionValue
  } catch (error) {
    console.error('An error occurred while starting contribution', error)
    throw new StartContributionError()
  }
}

const startRotation = async (id: Number, address: String) => {
  if (!id || typeof id !== 'number') return console.log('Invalid id')
  if (!address || typeof address !== 'string' || address.trim().length === 0)
    return console.log('Invalid address')

  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) return console.log('Group not found')

    if (!(await validateIsAdmin(GroupDB, id, address)))
      return console.log(`${address} is not group admin`)

    switch (group.currentState) {
      case State.Rotation as CurrentState:
        throw new GroupStateError(`${group.name} is already in rotation state`)

      case State.Initialization as CurrentState:
        throw new GroupStateError(`${group.name} is not in contribution state`)

      case State.Contribution as CurrentState:
        await validateContributionTime(group)

        if (group.eligibleMembers.length < 2)
          throw new Error('Not enough eligible members')

        group.currentState = State.Rotation as CurrentState
        await handleRotateParticipant(id)

        await group.save()
    }

    return console.log(`${group.name} started rotation`)
  } catch (error) {
    console.error('An error occurred while starting rotation', error)
    throw new StartRotationError()
  }
}

const endRotation = async (group: any) => {
  try {
    for (let memberAddress in group.groupMembers) {
      if (group.isEligibleMember.get(memberAddress)) {
        const eligibleMembersIndex = group.eligibleMembers.indexOf(
          memberAddress,
        )
        if (eligibleMembersIndex !== -1) {
          group.eligibleMembers.splice(eligibleMembersIndex, 1)
        }
        group.isEligibleMember.delete(memberAddress)
      }
      const participantFlat = group.participants.flat()
      const participant = participantFlat.find(
        (p: FullParticipantType) => p.participantAddress === memberAddress,
      )

      if (participant) {
        const participantIndex = group.participants.findIndex(
          (participantArray: FullParticipantType[]) =>
            participantArray.some(
              (p) => p.participantAddress === memberAddress,
            ),
        )

        if (participantIndex > -1) {
          group.participants.splice(participantIndex, 1)
          console.log('Successfully deleted participant')
        }
      }
    }

    group.contributionValue = 0
    group.timer = 0
    group.timeLimit = 0
    group.currentState = 'initialization' as CurrentState
    return console.log(`${group.name} ended rotation`)
  } catch (error) {
    console.log('An error occurred while ending rotation', error)
    throw new EndRotationError()
  }
}

/**Subscription functions */
const subscribePremium = async (input: PremiumType): Promise<string> => {
  validatePremiumInput({
    address: input.address,
    amount: input.amount,
  })
  if (input.amount < PREMIUM_FEE) {
    throw new SubscriptionError('Amount is less than premium fee')
  }

  try {
    const isMember = await validateIsMember({
      memberDB: MemberDB,
      address: input.address,
    })
    if (!isMember) {
      throw new MemberNotFoundError('Member not found')
    }

    let isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: input.address,
    })
    if (isPremiumSubscriber)
      throw new SubscriptionError('Member is already premium subscriber')

    const member = await MemberDB.getMemberByAddress(input.address)
    member.isPremiumSubscriber = true
    member.subscriptionStartTime = new Date()
    await member.save()
    return 'Successfully purchased premium services'
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while making this subscription')
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

  if (!isMember) throw new MemberNotFoundError('Member not found')

  try {
    let isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: address,
    })

    if (!isPremiumSubscriber)
      throw new Error('Member is not premium subscriber')

    const member = await MemberDB.getMemberByAddress(address)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    if (
      member.subscriptionStartTime &&
      new Date(member.subscriptionStartTime) <= thirtyDaysAgo
    ) {
      member.isPremiumSubscriber = false
    } else {
      throw new Error('Subscription is not expired')
    }
    await member.save()
    return 'Subscription Expired'
  } catch (error) {
    console.error('An error occurred while unsubscribing a member', error)
    throw new UnsubscribeError()
  }
}

/**Read Functions */
const getMember = async (address: String) => {
  try {
    const member = await MemberDB.getMemberByAddress(address)
    if (!member) throw new MemberNotFoundError()
    return member
  } catch (error) {
    console.error('An error occurred while getting a member', error)
    throw new GetMemberError()
  }
}

const getAllGroups = async () => {
  try {
    const groups = await Group.find({})
    if (!groups) throw new GroupNotFoundError()
    return groups
  } catch (error) {
    console.error('An error occurred while getting all groups', error)
    throw new GetAllGroupsError()
  }
}

const getParticipantData = async (
  participantInput: DeleteGroupType,
): Promise<FullParticipantType | null | String | void> => {
  const isIdValid = await validateGroupIdInput({
    groupDB: GroupDB,
    id: participantInput.id,
  })

  if (!isIdValid) throw new Error('Invalid group id')

  try {
    const memberFound = await MemberDB.getMemberByAddress(
      participantInput.address,
    )
    if (!memberFound) throw new MemberNotFoundError('Member not found')

    const group = await GroupDB.findAndUpdateGroup(participantInput.id)
    if (!group) throw new GroupNotFoundError()

    const participantFlat = group.participant.flat()

    const participant = participantFlat.find(
      (participant: FullParticipantType) => {
        return participant.participantAddress === participantInput.address
      },
    )

    if (!participant)
      throw new ParticipantNotFoundError('Participant not found')

    return participant
  } catch (error) {
    console.error('An error occurred while getting a participant', error)
    throw new ParticipantNotFoundError()
  }
}

const getAverageCollateralValue = async (collateralInput: DeleteGroupType) => {
  try {
    const group = await GroupDB.findGroupById(collateralInput.id)

    if (!group) return console.log('Group not found')

    if (
      !(await validateIsAdmin(
        GroupDB,
        collateralInput.id,
        collateralInput.address,
      ))
    )
      throw new AdminError()

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
    const averageCollateralValue = sumOfCollateral / group.groupMembers.length

    return averageCollateralValue
  } catch (error) {
    console.error(
      'An error occurred while getting the average collateral value',
      error,
    )

    throw new CalculateAverageCollateralError()
  }
}

/**Write Functions */

const createMember = async (member: CreateMemberType) => {
  validateMemberInput({
    id: member.id,
    name: member.name,
    email: member.email,
    username: member.username,
    country: member.country,
    phone: member.phone,
    memberAddress: member.memberAddress,
  })
  try {
    const memberFound = await MemberDB.getMemberByAddress(member.memberAddress)

    if (memberFound) {
      throw new MemberAlreadyExistsError('Member already exists')
    }

    const newMember = await MemberDB.createMember(member)
    await newMember.save()

    return 'Member created'
  } catch (error) {
    console.error('An error occurred while creating a member', error)
    throw new CreateMemberError()
  }
}

const updateMemberProfilePicture = async (
  memberAddress: String,
  profilePicture: String,
) => {
  if (!memberAddress || typeof memberAddress !== 'string')
    return console.log('Invalid member address')
  if (!profilePicture || typeof profilePicture !== 'string')
    return console.log('Invalid profile picture')

  try {
    const member = await MemberDB.getMemberByAddress(memberAddress)
    if (!member) throw new MemberNotFoundError('Member not found')

    member.profilePicture = profilePicture
    await member.save()

    return console.log('Member profile picture updated')
  } catch (error) {
    console.error(
      'An error occurred while updating a member profile picture',
      error,
    )
    throw new UpdateProfilePictureError()
  }
}

const createNewParticipant = async (participant: ParticipantType) => {
  try {
    const newParticipant = {
      name: participant.name,
      participantAddress: participant.participantAddress,
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
  } catch (error) {
    console.error('An error occurred while creating a new participant', error)
    throw new ParticipantCreationError()
  }
}

const createGroup = async (group: GroupType) => {
  validateGroupInput(
    group.id,
    group.name,
    group.description,
    group.admin,
    group.collateral,
  )

  try {
    const memberFound = await MemberDB.getMemberByAddress(group.admin)
    const memberName = memberFound ? memberFound.name : 'unknown'

    if (!memberFound) {
      throw new MemberNotFoundError('Member not found')
    }

    const isPremiumSubscriber = await validateIsPremiumSubscriber({
      memberDB: MemberDB,
      address: group.admin,
    })
    if (!isPremiumSubscriber) {
      if (memberFound.numberOfGroupsCreated >= 2) {
        throw new SubscriptionError(
          'You have reached your limit, upgrade to premium',
        )
      } else {
        memberFound.numberOfGroupsCreated++
        await memberFound.save()
      }
    }

    const newGroup = await GroupDB.createGroup({
      ...group,
    })
    newGroup.groupMembers.push(group.admin)
    newGroup.eligibleMembers.push(group.admin)

    await newGroup.save()

    createNewParticipant({
      group: newGroup,
      participantAddress: group.admin as string,
      name: memberName,
      amountDonated: 0,
    })

    return console.log('Group created')
  } catch (error) {
    console.error('An error occurred while creating a group', error)
    throw new GroupCreationError()
  }
}

const updateGroupProfilePicture = async (
  id: Number,
  address: String,
  profilePicture: String,
) => {
  if (!id || typeof id !== 'number') return console.log('Invalid id')
  if (!profilePicture || typeof profilePicture !== 'string')
    return console.log('Invalid profile picture')
  if (!address || typeof address !== 'string' || address.trim().length === 0)
    return console.log('Invalid address')

  try {
    const group = await GroupDB.findGroupById(id)
    const member = await MemberDB.getMemberByAddress(address)

    if (!group) throw new GroupNotFoundError('Group not found')
    if (!member) throw new MemberNotFoundError('Member not found')

    if (member.memberAddress !== group.admin) throw new AdminError()

    group.profilePicture = profilePicture

    await group.save()

    return console.log('Group profile picture updated')
  } catch (error) {
    console.error(
      'An error occurred while updating a group profile picture',
      error,
    )

    throw new UpdateProfilePictureError()
  }
}

const deleteGroup = async (groupInput: DeleteGroupType) => {
  validateDeleteGroupInput(groupInput)
  try {
    const group = await GroupDB.findGroupById(groupInput.id)
    const admin = await MemberDB.getMemberByAddress(groupInput.address)

    if (!group) {
      throw new GroupNotFoundError('Group not found')
    }

    if (!admin) {
      throw new MemberNotFoundError('Member not found')
    }

    if (admin.memberAddress !== groupInput.address) {
      throw new AdminError()
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

    if (!member) throw new MemberNotFoundError('Member not found')

    if (member.reputation < 1)
      throw new Error('You need to have a reputation of 1 to join a group')

    const group = await GroupDB.findGroupById(joinGroupInput.id)

    const isValid = await validateGroupIdInput({
      groupDB: GroupDB,
      id: joinGroupInput.id,
    })

    if (!isValid) throw new GroupNotFoundError('Group not found')

    const adminAddress = group.admin
    const isPremiumSubscriber = await validateIsPremiumSubscriber({
      address: adminAddress,
      memberDB: MemberDB,
    })

    if (!isPremiumSubscriber) {
      if (group.groupMembers.length >= 10) throw new Error('Group is full')
    }

    const isMemberAlreadyInGroup = await validateIsMemberOfGroup({
      id: joinGroupInput.id,
      address: joinGroupInput.address,
      groupDB: GroupDB,
    })
    if (isMemberAlreadyInGroup) throw new Error('You are already in this group')

    switch (group.currentState) {
      case State.Initialization as CurrentState:
        if (joinGroupInput.collateralValue < group.collateral)
          throw new Error('Insufficient collateral')

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

      case State.Contribution as CurrentState:
        return console.log('Group is in contribution, cannot join')

      case State.Rotation as CurrentState:
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

    if (!group) throw new GroupNotFoundError('Group not found')
    if (!member) throw new MemberNotFoundError('Member not found')
    if (
      !validateIsMemberOfGroup({
        id: contributeInput.id,
        groupDB: GroupDB,
        address: contributeInput.address,
      })
    )
      throw new Error(
        `${contributeInput.address} is not a member of this group`,
      )

    let participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === contributeInput.address
      })

    switch (group.currentState) {
      case State.Contribution as CurrentState:
        if (contributeInput.amount < group.contributionValue) {
          throw new Error('Insufficient Amount')
        }

        if (participant) {
          throw new Error(
            'Already contributed, please wait for rotation to start',
          )
        }

        await createNewParticipant({
          group: group,
          participantAddress: contributeInput.address as string,
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

      case State.Rotation as CurrentState:
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
          throw new GroupStateError(
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
        throw new GroupStateError(
          "Can only contribute in 'contribution' or 'rotation' state",
        )
    }
  } catch (error) {
    console.error('An error occurred while contributing', error)
  }
}

const validateContributionTime = async (group: GroupType): Promise<void> => {
  const contributionTime = group.timer as number
  const contributionTimeLimit = group.timeLimit as number
  const currentTime = new Date().getTime()

  if (currentTime < contributionTime + contributionTimeLimit) {
    throw new ContributionTimeError(
      'Contribution time limit has not elapsed yet.',
    )
  }
}

const disburse = async (disburseInput: DeleteGroupType) => {
  validateDeleteGroupInput(disburseInput)

  try {
    const group = await GroupDB.findGroupById(disburseInput.id)
    const amountToDisburse = group.balance

    await validateContributionTime(group)

    //? penalize eligible members that did not contribute
    await penalize(group)
    const recipientAddress = group.eligibleMembers[0]

    const member = await MemberDB.getMemberByAddress(recipientAddress)
    if (!member) {
      throw new MemberNotFoundError('Member not found')
    }

    const participantFlat = group.participants.flat()

    //? fetch participant data of the recipient address
    const participant = participantFlat.find(
      (p: FullParticipantType) => p.participantAddress === recipientAddress,
    )

    if (!participant) {
      throw new ParticipantNotFoundError('Participant not found')
    }
    if (!participant.hasDonated) throw new Error('Participant has not donated')

    if (participant.hasReceivedFunds)
      throw new Error('Participant has received funds for this round')

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
    await handleRotateParticipant(disburseInput.id)

    await group.save()

    //? check if all participant has received funds
    const hasAllParticipantReceivedFunds = await handleCheckIfAllParticipantsHaveReceivedFunds(
      group,
    )

    if (hasAllParticipantReceivedFunds) {
      await endRotation(group)
    } else {
      group.timer = new Date().getTime()

      await group.save()

      return console.log(
        `Successfully disbursed ${amountToDisburse} to ${member.name}`,
      )
    }
  } catch (error) {
    console.error('An error occurred while disbursing', error)
  }
}

/**utility functions */

const penalize = async (group: any): Promise<void> => {
  try {
    const participantsFlat = group.participants.flat()
    let memberToBePenalized: string | undefined

    for (const memberAddress of group.eligibleMembers) {
      const participant = participantsFlat.find(
        (p: FullParticipantType) => p.participantAddress === memberAddress,
      )

      if (participant && !participant.hasDonated) {
        participant.reputation -= 1
        memberToBePenalized = participant.name

        const collateralIsSufficient =
          group.collateralTracking.get(memberAddress) >= group.collateralValue

        let shouldRemoveEligibility = false
        let shouldRemoveMember = false

        if (participant.reputation > 0 && collateralIsSufficient) {
          shouldRemoveEligibility = true
        }

        if (participant.reputation <= 0 || !collateralIsSufficient) {
          shouldRemoveMember = true
        }

        switch (shouldRemoveEligibility) {
          case true:
            console.log('Removing eligibility status')
            await handleRemoveEligibilityStatus(group, memberAddress)
            break
        }

        switch (shouldRemoveMember) {
          case true:
            console.log('Removing member')
            await handleRemoveMember(group, memberAddress)
            break
        }
      }
    }

    if (!memberToBePenalized) {
      console.log('No member to be penalized')
      return
    }

    console.log(`Successfully penalized ${memberToBePenalized}`)
  } catch (error) {
    console.error('An error occurred while penalizing members', error)
  }
}

const getIsPremiumSubscriber = async (address: String): Promise<Boolean> => {
  let isPremiumSubscriber = false
  try {
    const member = await MemberDB.getMemberByAddress(address)
    if (!member) throw new MemberNotFoundError('Member not found')

    if (member.isPremiumSubscriber) isPremiumSubscriber = true
    return isPremiumSubscriber
  } catch (error) {
    console.error('An error occurred while getting a member', error)
    throw new Error('An error occurred while getting a member')
  }
}

const handleRemoveMember = async (
  group: GroupType,
  memberAddress: string,
): Promise<void> => {
  try {
    const member = await MemberDB.getMemberByAddress(memberAddress)

    if (!member) {
      throw new MemberNotFoundError('Member not found')
    }

    const participantFlat = group.participants ? group.participants.flat() : []

    const participant = participantFlat.find(
      (p) => p.participantAddress === memberAddress,
    )

    if (!participant) {
      throw new ParticipantNotFoundError('Participant not found')
    }

    removeMemberFromGroup(group, memberAddress)
    decrementMemberReputation(member)

    console.log('Successfully deleted participant')
  } catch (error) {
    console.error('An error occurred while removing member:', error)
    throw error
  }
}

const handleGetNumberOfGroupsCreated = async (
  memberAddress: string,
): Promise<number> => {
  if (
    !memberAddress ||
    typeof memberAddress !== 'string' ||
    memberAddress.trim().length === 0
  ) {
    throw new Error('Invalid member address')
  }

  try {
    const member = await MemberDB.getMemberByAddress(memberAddress)
    if (!member) throw new MemberNotFoundError('Member not found')

    const numberOfGroupsCreated = member.numberOfGroupsCreated || 0
    return numberOfGroupsCreated
  } catch (error) {
    console.error(
      'An error occurred while getting number of groups created',
      error,
    )
    throw new Error('An error occurred while getting number of groups created')
    return 0
  }
}

const removeMemberFromGroup = (group: any, memberAddress: string) => {
  const indexInEligible = group.eligibleMembers.indexOf(memberAddress)
  if (indexInEligible > -1) {
    group.eligibleMembers.splice(indexInEligible, 1)
  }

  group.isGroupMember.delete(memberAddress)
  group.collateralTracking.delete(memberAddress)
  group.isEligibleMember.delete(memberAddress)

  const indexInGroupMembers = group.groupMembers.indexOf(memberAddress)
  if (indexInGroupMembers > -1) {
    group.groupMembers.splice(indexInGroupMembers, 1)
  }

  const participantIndex = group.participants.findIndex(
    (participantArray: FullParticipantType[]) =>
      participantArray.some(
        (participant) => participant.participantAddress === memberAddress,
      ),
  )

  if (participantIndex > -1) {
    group.participants.splice(participantIndex, 1)
  }
}

const decrementMemberReputation = async (member: any): Promise<void> => {
  member.reputation = Math.max(0, member.reputation - 1)
  await member.save()
}

const handleRemoveEligibilityStatus = async (
  group: any,
  memberAddress: string,
): Promise<void> => {
  try {
    if (!(group.collateralTracking instanceof Map)) {
      console.error(
        'group.collateralTracking is not initialized properly:',
        group.collateralTracking,
      )
      throw new Error('collateralTracking is not a Map')
    }
    // Deduct from collateral and update the tracking map
    const currentCollateral = group.collateralTracking?.get(memberAddress) || 0
    const newCollateralValue = currentCollateral - group.collateral
    group.collateralTracking.set(memberAddress, newCollateralValue)

    // Find and remove the participant
    const participant = group.participants
      .flat()
      .find((p: FullParticipantType) => p.participantAddress === memberAddress)
    if (!participant) {
      throw new ParticipantNotFoundError('Participant not found')
    }

    // Remove from eligible members
    const eligibleMemberIndex = group.eligibleMembers.indexOf(memberAddress)
    if (eligibleMemberIndex !== -1) {
      group.eligibleMembers.splice(eligibleMemberIndex, 1)
    }

    // Update eligibility status
    group.isEligibleMember.set(memberAddress, false)

    // Find the participant's index in the nested array and remove it
    const participantIndex = group.participants.findIndex(
      (participantArray: FullParticipantType[]) =>
        participantArray.some((p) => p.participantAddress === memberAddress),
    )

    if (participantIndex > -1) {
      group.participants.splice(participantIndex, 1)
      console.log('Successfully deleted participant')
    } else {
      console.log('Participant not found in the group')
    }
  } catch (error) {
    console.error('An error occurred while removing eligibility status:', error)
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

    const isGroupAdmin = await validateIsAdmin(
      GroupDB,
      timeLimitInput.id,
      admin,
    )
    if (!isGroupAdmin) {
      throw new AdminError()
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

const handleContributionState = async (
  address: String,
  id: Number,
  amount: Number,
) => {
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) throw new GroupNotFoundError('Group not found')

    const participant = group.participants
      .flat() //Flatten the array to remove nested array
      .find((participant: FullParticipantType) => {
        return participant.participantAddress === address
      })

    if (!participant)
      throw new ParticipantNotFoundError('Participant not found')

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
    if (!participant) {
      throw new ParticipantNotFoundError('Participant not found')
    }
    if (!participant.isEligible) {
      throw new ParticipantNotEligibleError('Participant not eligible')
    }

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

const handleCheckIfAllParticipantsHaveReceivedFunds = async (group: any) => {
  let hasAllParticipantsReceivedFunds = false
  try {
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

const handleRotateParticipant = async (id: Number) => {
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

const handleGetMemberReputationPoint = async (
  address: string,
): Promise<number> => {
  if (!address || typeof address !== 'string')
    throw new Error('Invalid address')
  try {
    const member = await MemberDB.getMemberByAddress(address)
    if (!member) throw new MemberNotFoundError('Member not found')

    const reputationPoint: number = member.reputation
    if (!reputationPoint) {
      return 0
    }
    console.log('reputationPoint', reputationPoint)
    return reputationPoint
  } catch (error) {
    console.error(
      "An error occurred while getting member's reputation point",
      error,
    )
    throw new Error('An error occurred while getting member reputation point')
  }
}

const handleGetGroupCollateralValue = async (id: number): Promise<number> => {
  if (!id || typeof id !== 'number') throw new Error('Invalid group id')
  try {
    const group = await GroupDB.findGroupById(id)
    if (!group) throw new GroupNotFoundError('Group not found')

    const collateralValue: number = group.collateral
    if (!collateralValue) {
      return 0
    }
    console.log('collateralValue', collateralValue)
    return collateralValue
  } catch (error) {
    console.error(
      'An error occurred while getting group collateral value',
      error,
    )
    throw new Error('An error occurred while getting group collateral value')
  }
}
export {
  startContribution,
  startRotation,
  endRotation,
  subscribePremium,
  unSubscribePremium,
  getMember,
  getIsPremiumSubscriber,
  getAllGroups,
  getParticipantData,
  createMember,
  createGroup,
  updateGroupProfilePicture,
  updateMemberProfilePicture,
  deleteGroup,
  joinGroup,
  contribute,
  updateContributionTimeLimit,
  penalize,
  disburse,
  handleGetNumberOfGroupsCreated,
  handleGetGroupCollateralValue,
  handleGetMemberReputationPoint,
  MemberDB,
}
