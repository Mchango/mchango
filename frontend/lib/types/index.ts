export type CreateMemberType = {
  id: Number
  name: string
  email: string
  username: string
  country: string
  phone: string
  memberAddress: string
}

export type GroupType = {
  id: Number
  name: String
  description: String
  profilePicture?: String
  collateral: Number
  contributionValue?: Number
  admin: String
  balance?: Number
  timer?: Number
  timeLimit?: Number
  isGroupMember?: Map<String, Boolean>
  groupMembers?: Array<String>
  isEligibleMember?: Map<String, Boolean>
  eligibleMembers?: Array<String>
  participants?: Array<ParticipantType>
  collateralTracking?: Map<String, Number>
  currentState?: CurrentState
}

export type DeleteGroupType = {
  id: Number
  address: String
}

export type GroupStateType = {
  initialization: 'initialization'
  contribution: 'contribution'
  rotation: 'rotation'
}
export type CurrentState =
  | GroupStateType['initialization']
  | GroupStateType['contribution']
  | GroupStateType['rotation']

export type PremiumType = {
  address: String
  amount: Number
}

export type MemberValidationType = {
  address: String
  memberDB: any
}

export type GroupValidationType = {
  id: Number
  groupDB: any
  address: String
}

export type ParticipantType = {
  group: any
  participantAddress: String
  name: String
  amountDonated: Number
}

export type FullParticipantType = {
  name: String
  participantAddress: String
  amountDonated: Number
  amountCollected: Number
  timeStamp: Date
  isBanned: Boolean
  isEligible: Boolean
  hasReceivedFunds: Boolean
  hasDonated: Boolean
  reputation: Number
}

export type JoinGroupType = {
  id: Number
  address: String
  collateralValue: Number
}

export type joinCreatedGroupType = {
  id: number
  amount: string
  collateralValue: number
  reputationPoint: number
}

export type GroupIdValidationType = {
  groupDB: any
  id: Number
}

export type StartContributionType = {
  id: Number
  address: String
  timeLimit: Number
}

export type ContributionType = {
  id: Number
  address: String
  amount: Number
}
