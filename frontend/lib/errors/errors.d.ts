class MetaMaskError extends Error {
  constructor() {
    super('MetaMask is not installed')
    this.name = 'MetaMaskError'
  }
}

class ReputationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReputationError'
  }
}

class CreateMemberError extends Error {
  constructor() {
    super('Error creating a member')
    this.name = 'CreateMemberError'
  }
}

class GroupCreationError extends Error {
  constructor() {
    super('Error creating a group')
    this.name = 'GroupCreationError'
  }
}

class MetaMaskNotInstalledError extends Error {
  constructor() {
    super('MetaMask is not installed')
    this.name = 'MetaMaskNotInstalledError'
  }
}

class JoinGroupError extends Error {
  constructor() {
    super('Join group failed')
    this.name = 'JoinGroupError'
  }
}

class UpdateProfilePictureError extends Error {
  constructor() {
    super('Error updating display picture')
    this.name = 'UpdateProfilePictureError'
  }
}

class ContributionTimeError extends Error {}

class MemberNotFoundError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Member not found')
    this.name = 'MemberNotFoundError'
  }
}
class MemberAlreadyExistsError extends Error {}

class ParticipantCreationError extends Error {
  constructor() {
    super('Error creating a participant')
    this.name = 'ParticipantCreationError'
  }
}

class ParticipantNotFoundError extends Error {}

class GroupNotFoundError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Group not found')
    this.name = 'GroupNotFoundError'
  }
}
class ParticipantNotEligibleError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Participant not eligible')
    this.name = 'ParticipantNotEligibleError'
  }
}
class AdminError extends Error {
  constructor() {
    super('you do not have permission to perform this action')
    this.name = 'AdminError'
  }
}

class StartContributionError extends Error {
  constructor() {
    super('Start contribution failed')
    this.name = 'StartContributionError'
  }
}

class StartRotationError extends Error {
  constructor() {
    super('Start rotation failed')
    this.name = 'StartRotationError'
  }
}

class EndRotationError extends Error {
  constructor() {
    super('End rotation failed')
    this.name = 'EndRotationError'
  }
}

class GroupStateError extends Error {}

class SubscriptionError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Error subscribing')
    this.name = 'SubscriptionError'
  }
}

class UnsubscribeError extends Error {
  constructor() {
    super('Unsubscribe failed')
    this.name = 'UnsubscribeError'
  }
}

class GetMemberError extends Error {
  constructor() {
    super('Error fetching member')
    this.name = 'GetMemberError'
  }
}

class GetAllGroupsError extends Error {
  constructor() {
    super('Error fetching all groups')
    this.name = 'GetAllGroupsError'
  }
}

class CalculateAverageCollateralError extends Error {
  constructor() {
    super('Error calculating average collateral')
    this.name = 'CalculateAverageCollateralError'
  }
}
