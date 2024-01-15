import {
  GroupType,
  CreateMemberType,
  ContributionType,
  PremiumType,
  MemberValidationType,
  GroupValidationType,
  DeleteGroupType,
  JoinGroupType,
  GroupIdValidationType,
  StartContributionType,
} from '../lib/types'

export const validateMemberInput = (memberInput: CreateMemberType) => {
  if (
    !memberInput.name ||
    typeof memberInput.name !== 'string' ||
    memberInput.name.trim().length === 0
  ) {
    throw new Error('Invalid name')
  }

  if (
    !memberInput.memberAddress ||
    typeof memberInput.memberAddress !== 'string' ||
    memberInput.memberAddress.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (!memberInput.id || typeof memberInput.id !== 'number') {
    throw new Error('Invalid id')
  }
}

export const validateGroupInput = (groupInput: GroupType) => {
  if (!groupInput.id || typeof groupInput.id !== 'number') {
    throw new Error('Invalid id')
  }
  if (
    !groupInput.name ||
    typeof groupInput.name !== 'string' ||
    groupInput.name.trim().length === 0
  ) {
    throw new Error('Invalid name')
  }

  if (
    !groupInput.description ||
    typeof groupInput.description !== 'string' ||
    groupInput.description.trim().length === 0
  ) {
    throw new Error('Invalid description')
  }

  if (
    !groupInput.address ||
    typeof groupInput.address !== 'string' ||
    groupInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (!groupInput.collateral || typeof groupInput.collateral !== 'number') {
    throw new Error('Invalid collateral')
  }
}

export const validatePremiumInput = (premiumInput: PremiumType) => {
  if (
    !premiumInput.address ||
    typeof premiumInput.address !== 'string' ||
    premiumInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (!premiumInput.amount || typeof premiumInput.amount !== 'number') {
    throw new Error('Invalid amount')
  }
}

export const validateIsMember = async (
  memberValidationInput: MemberValidationType,
) => {
  let isMember = false

  try {
    const member = await memberValidationInput.memberDB.getMemberByAddress(
      memberValidationInput.address,
    )

    console
    if (member.memberAddress === memberValidationInput.address) {
      isMember = true
    }

    return isMember
  } catch (error) {
    console.error('Error in validateIsMember: ', error)
  }
}

export const validateIsMemberOfGroup = async (
  groupValidationInput: GroupValidationType,
) => {
  let isGroupMember = false

  try {
    const group = await groupValidationInput.groupDB.findGroupById(
      groupValidationInput.id,
    )
    if (group.isGroupMember.get(groupValidationInput.address, true)) {
      return (isGroupMember = true)
    }
  } catch (error) {
    console.error('Error in validateIsMemberOfGroup: ', error)
  }
}

export const validateIsEligible = async (
  group: any,
  address: String,
): Promise<Boolean | void | String> => {
  let isEligible = false

  try {
    if (group.isEligibleMember.get(address, true)) {
      isEligible = true
    }

    return isEligible
  } catch (error) {
    console.error('Error in validateIsEligible: ', error)
  }
}

export const validateIsPremiumSubscriber = async (
  premiumInput: MemberValidationType,
) => {
  let isPremiumSubscriber = false
  try {
    const member = await premiumInput.memberDB.getMemberByAddress(
      premiumInput.address,
    )
    if (member.isPremiumSubscriber === true) {
      isPremiumSubscriber = true
    }

    return isPremiumSubscriber
  } catch (error) {
    console.error('Error in validateIsPremiumSubscriber: ', error)
  }
}

export const validateDeleteGroupInput = (deleteGroupInput: DeleteGroupType) => {
  if (!deleteGroupInput.id || typeof deleteGroupInput.id !== 'number') {
    throw new Error('Invalid id')
  }

  if (
    !deleteGroupInput.address ||
    typeof deleteGroupInput.address !== 'string' ||
    deleteGroupInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }
}

export const validateJoinGroupInput = (joinGroupInput: JoinGroupType) => {
  if (!joinGroupInput.id || typeof joinGroupInput.id !== 'number') {
    throw new Error('Invalid id')
  }

  if (
    !joinGroupInput.address ||
    typeof joinGroupInput.address !== 'string' ||
    joinGroupInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (
    !joinGroupInput.collateralValue ||
    typeof joinGroupInput.collateralValue !== 'number'
  ) {
    throw new Error('Invalid collateral value')
  }
}

export const validateGroupIdInput = async (
  groupIdInput: GroupIdValidationType,
) => {
  if (!groupIdInput.id || typeof groupIdInput.id !== 'number') {
    throw new Error('Invalid id')
  }

  let isGroupIdValidated = false

  try {
    const group = await groupIdInput.groupDB.findGroupById(groupIdInput.id)
    if (group) {
      isGroupIdValidated = true
    }
    return isGroupIdValidated
  } catch (error) {
    return console.log('Error in validateGroupIdInput: ', error)
  }
}

export const validateStartContributionInput = (
  startContributionInput: StartContributionType,
) => {
  if (
    !startContributionInput.id ||
    typeof startContributionInput.id !== 'number'
  ) {
    throw new Error('Invalid id')
  }

  if (
    !startContributionInput.address ||
    typeof startContributionInput.address !== 'string' ||
    startContributionInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (
    !startContributionInput.timeLimit ||
    typeof startContributionInput.timeLimit !== 'number'
  ) {
    throw new Error('Invalid time limit')
  }
}

export const validateIsAdmin = async (group: any, address: String) => {
  let isAdmin = false
  try {
    if ((group.Admin = address)) {
      isAdmin = true
    }

    return isAdmin
  } catch (error) {
    console.error('Error in validateIsAdmin: ', error)
  }
}

export const validateContributeInput = (contributeInput: ContributionType) => {
  if (!contributeInput.id || typeof contributeInput.id !== 'number') {
  }
  if (
    !contributeInput.address ||
    typeof contributeInput.address !== 'string' ||
    contributeInput.address.trim().length === 0
  ) {
    throw new Error('Invalid address')
  }

  if (!contributeInput.amount || typeof contributeInput.amount !== 'number') {
    throw new Error('Invalid amount')
  }
}
