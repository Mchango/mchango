export type CreateMemberType = {
  id: Number
  name: String
  memberAddress: String
}

export type GroupType = {
  id: Number
  name: String
  description: String
  address: String
  collateral: Number
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
  address: String
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
