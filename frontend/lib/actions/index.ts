import { connectToDB } from './lib/mongoose.js';
import Member from './lib/models/Member.js';
import Group from './lib/models/GroupModel.js';

/**
 * todo: test all functions
 * todo: create the penalize function
 * todo: create the disburse function
 */
const premiumPrice = 1000;
const memberDB = {
  getMemberByAddress: async (address) => {
    return await Member.findOne({ memberAddress: address });
  },

  createMember: async ({ name, address, id }) => {
    return await Member.create({
      id: id,
      name: name,
      memberAddress: address,
      amountDonated: 0,
      amountCollected: 0,
      reputation: 1,
      isPremiumSubscriber: false,
    });
  },
};

const groupDB = {
  createGroup: async ({ _collateral, _address, _name, _description }) => {
    return await Group.create({
      id: 0,
      collateral: _collateral,
      contributionValue: 0,
      admin: _address,
      name: _name,
      description: _description,
      balance: 0,
      timer: 0,
      timeLimit: 0,
      isGroupMember: new Map().set(_address, true),
      isEligibleMember: new Map().set(_address, true),
      currentState: 'initialization',
    });
  },

  findAndUpdateGroup: async ({ _id }) => {
    return await Group.findOneAndUpdate({
      id: _id,
    });
  },
};

const validateUser = async (_group, _address) => {
  let isUser = false;
  if (_group.isGroupMember.get(_address, true)) return (isUser = true);
  console.log('is user a group member', isUser);
};

const validateParticipant = async (_group, _address) => {
  let isParticipant = false;
  const participant = _group.participants
    .flat() // Flatten the array to remove nested arrays
    .find((participant) => {
      console.log('Checking Participant:', participant);
      return participant.participantAddress === _address;
    });

  if (participant) {
    isParticipant = true;
    return console.log('Participant exists');
  }

  return isParticipant;
};

const validateGroupId = async (_id) => {
  let isGroup = false;

  try {
    const group = await Group.findOne({ id: _id });
    if (group) {
      isGroup = true;
      return isGroup;
    }
  } catch (error) {
    console.log('Group does not exist');
  }
};

const validateIsEligible = async (_group, _address) => {
  let isEligible = false;
  if (_group.isEligibleMember.get(_address, true)) return (isEligible = true);
  console.log('is user eligible', isEligible);
};

const validateIsAdmin = async (_group, _address) => {
  let isAdmin = false;
  if (_group.admin === _address) return (isAdmin = true);
  console.log('is user admin', isAdmin);
};

const validateIsMember = async (_address) => {
  let isMember = false;
  try {
    const member = await memberDB.getMemberByAddress(_address);
    if (member.memberAddress === _address) {
      isMember = true;
      return isMember;
    }
  } catch (error) {
    console.log('Member does not exist');
  }
};

const validateIsPremiumSubscriber = async (_address) => {
  let isPremiumSubscriber = false;
  try {
    const member = await memberDB.getMemberByAddress(_address);
    if (member.isPremiumSubscriber === true)
      return (isPremiumSubscriber = true);
  } catch (error) {
    console.log('Member does not exist');
  }
};

const createMember = async ({ _name, _address, _id }) => {
  if (!_name || !_address || !_id) return console.log('Invalid input data');

  try {
    const memberFound = await memberDB.getMemberByAddress(_address);

    if (memberFound) {
      console.log('Member exists');
    }

    const newMember = await memberDB.createMember({
      name: _name,
      address: _address,
      id: _id,
    });

    console.log(newMember.name);
    console.log(newMember.memberAddress);
  } catch (error) {
    console.error('An error occurred while creating a new member', error);
  }
};

const getMember = async ({ _address }) => {
  if (!_address) return console.log('Invalid input data');

  const isMember = await validateIsMember(_address);
  if (!isMember) return console.log('Not a member');

  try {
    const member = await memberDB.getMemberByAddress(_address);
    console.log(member);
  } catch (error) {
    console.error('An error occurred while getting a member', error);
  }
};

const subscribePremiumMember = async ({ _address, _amount }) => {
  if (!_address) return console.log('Invalid input data');
  if (_amount < premiumPrice)
    return console.log('Amount is less than the premium price');
  const isMember = await validateIsMember(_address);
  if (!isMember) return console.log('Not a member');
  try {
    let isPremiumSubscriber = await validateIsPremiumSubscriber(_address);
    if (isPremiumSubscriber)
      return console.log('Member is already a premium subscriber');

    const member = await memberDB.getMemberByAddress(_address);
    member.isPremiumSubscriber = true;

    await member.save();

    isPremiumSubscriber = await validateIsPremiumSubscriber(_address);
    console.log(`is ${_address} a premium subscriber?`, isPremiumSubscriber);
  } catch (error) {
    console.error(
      'An error occurred while subscribing a premium member',
      error
    );
  }
};

const createGroup = async ({ _collateral, _address, _name, _description }) => {
  if (!_collateral || !_address || !_name || !_description)
    return console.log('Invalid input data');

  try {
    const memberFound = await memberDB.getMemberByAddress(_address);

    if (!memberFound) {
      return console.log('Not a member');
    }

    const isPremiumSubscriber = await validateIsPremiumSubscriber(_address);
    if (!isPremiumSubscriber) {
      if (memberFound.numberOfGroupsCreated >= 2)
        return console.log(
          'Member has reached the maximum number of groups, upgrade to premium to create more groups'
        );
    }

    const newGroup = await groupDB.createGroup({
      _collateral: _collateral,
      _address: _address,
      _name: _name,
      _description: _description,
    });

    memberFound.numberOfGroupsCreated++;
    await memberFound.save();

    const newParticipant = {
      name: _name,
      participantAddress: _address,
      amountDonated: 0,
      amountCollected: 0,
      timeStamp: Date.now(),
      isBanned: false,
      isEligible: true,
      hasReceivedFunds: false,
      hasDonated: false,
      reputation: 1,
    };
    newGroup.participants.push(newParticipant);
    await newGroup.save();

    console.log(newGroup.name);
    console.log(newGroup.description);
    console.log(newGroup.admin);
  } catch (error) {}
};

const joinGroup = async ({ _id, _address, _collateralValue }) => {
  //? validate input data
  if (!_address || !_collateralValue) return console.log('Invalid input data');

  //? validate group id
  const isIdValid = await validateGroupId(_id);
  if (!isIdValid) return console.log('Invalid group id');

  try {
    const member = await memberDB.getMemberByAddress(_address);

    if (!member) {
      return console.log('Not a member');
    }

    const memberName = member.name;

    const group = await groupDB.findAndUpdateGroup({
      _id: _id,
    });

    if (!group) {
      console.log('Group not found');
      return;
    }
    const adminAddress = group.admin;
    const isAdminPremiumSubscriber = await validateIsPremiumSubscriber(
      adminAddress
    );

    if (!isAdminPremiumSubscriber) {
      const participant = group.participants
        .flat() // Flatten the array to remove nested arrays
        .find((participant) => {
          if (participant.length > 5)
            return console.log(
              'Max number of participants reached, subscribe to premium to increase the number of participants'
            );
        });
    }

    const isNotANewUser = await validateUser(group, _address);
    if (isNotANewUser === true) return console.log('User already exists');

    const isValidated = await validateParticipant(group, _address);
    if (isValidated === true) return console.log('Participant already exists');
    const collateral = group.collateral;
    if (_collateralValue < collateral) {
      return console.log(
        `Insufficient amount to join group, please pay the ${collateral} Ether`
      );
    }

    group.groupMembers.push(_address);
    group.isGroupMember = new Map().set(_address, true);
    group.collateralTracking = new Map().set(_address, 0);

    const newParticipant = {
      name: memberName,
      participantAddress: _address,
      amountDonated: 0,
      amountCollected: 0,
      timeStamp: Date.now(),
      isBanned: false,
      isEligible: true,
      hasReceivedFunds: false,
      hasDonated: false,
      reputation: 1,
    };

    group.participants.push(newParticipant);
    await group.save();

    console.log(`Successfully added ${newParticipant.name} to ${group.name}`);
  } catch (error) {
    console.log(error);
  }
};

const getParticipantData = async ({ _id, _address }) => {
  const isIdValid = await validateGroupId(_id);
  if (!isIdValid) return console.log('Invalid group id');

  try {
    const memberFound = await memberDB.getMemberByAddress(_address);

    if (memberFound) {
      console.log('Member exists');
    }

    const updatedGroup = await groupDB.findAndUpdateGroup({
      _id: _id,
    });

    const participant = updatedGroup.participants
      .flat() // Flatten the array to remove nested arrays
      .find((participant) => {
        return participant.participantAddress === _address;
      });

    if (!participant) {
      console.log('Participant not found in the group');
      return null;
    }

    console.log(participant);

    return participant;
  } catch (error) {}
};

const getGroup = async ({ _id }) => {
  const updatedGroup = await groupDB.findAndUpdateGroup({
    _id: _id,
  });

  console.log(updatedGroup);
};

const getAllGroups = async () => {
  const allGroups = await Group.find({});
  console.log(allGroups);
};

const getAverageOfCollateralValue = async ({ _id, _address }) => {
  let averageOfCollateralValue;
  const updatedGroup = await groupDB.findAndUpdateGroup({
    _id: _id,
  });

  const memberFound = await memberDB.getMemberByAddress(_address);
  console.log(memberFound);
  if (memberFound.memberAddress !== updatedGroup.admin)
    return console.log('Not the admin');

  for (const participant of updatedGroup.participants.flat()) {
    const participantAddress = participant.participantAddress;

    const collateralTracking =
      updatedGroup.collateralTracking.get(participantAddress);

    averageOfCollateralValue = (
      collateralTracking / updatedGroup.participants.length
    ).toFixed(2);
  }
  console.log(averageOfCollateralValue);
  return averageOfCollateralValue;
};

const startContribution = async ({ _id, _address, _timeLimit }) => {
  try {
    const updatedGroup = await groupDB.findAndUpdateGroup({
      _id: _id,
    });

    const memberFound = await memberDB.getMemberByAddress(_address);

    const isAdmin = await validateIsAdmin(updatedGroup, _address);
    if (!isAdmin) return console.log('Not the admin');

    const contributionValue = await getAverageOfCollateralValue({
      _id,
      _address,
    });

    if (updatedGroup.currentState === 'Contribution')
      return console.log('Already started contribution');
    updatedGroup.contributionValue = contributionValue;
    updatedGroup.timeLimit = _timeLimit;
    updatedGroup.timer = Date.now();
    updatedGroup.currentState = 'Contribution';
  } catch (error) {
    console.error('An error occurred', error);
  }
};

const startRotation = async ({ _id, _address }) => {
  if (!_id || !_address) return console.log('Invalid input data');

  try {
    const updatedGroup = await groupDB.findAndUpdateGroup({ _id: _id });
    const memberFound = await memberDB.getMemberByAddress(_address);
    const memberAddress = memberFound.memberAddress;

    const isAdmin = await validateIsAdmin(updatedGroup, memberAddress);
    if (!isAdmin)
      return console.log('Not the admin, only admin can begin rotation');

    const checkState = updatedGroup.currentState;
    if (checkState === 'Rotation')
      return console.log('Already started rotation');

    updatedGroup.currentState = 'Rotation';
  } catch (error) {}
};

const contribute = async ({ _id, _address, _amount }) => {
  try {
    const updatedGroup = await groupDB.findAndUpdateGroup({
      _id: _id,
    });

    const memberFound = await memberDB.getMemberByAddress(_address);
    const memberAddress = memberFound.memberAddress;

    const isGroupMember = validateUser(updatedGroup, memberAddress);
    if (!isGroupMember) return console.log('Not a member of this group');

    const isValidated = await validateParticipant(updatedGroup, memberAddress);
    if (!isValidated)
      return console.log('Participant not eligible not make contribution');

    const checkState = updatedGroup.currentState;

    if (checkState === 'Contribution ' || checkState === 'Initialization') {
      const contributionValue = updatedGroup.contributionValue;
      if (_amount < contributionValue)
        return console.log('Insufficient amount');

      updatedGroup.balance += _amount;
      updatedGroup.eligibleMembers.push(memberAddress);
      updatedGroup.isEligible = new Map().set(memberAddress, true);

      const participant = await getParticipantData({
        _id: _id,
        _address: _address,
      });

      participant.amountDonated += _amount;
      participant.hasDonated = true;
      participant.timesStamp = Date.now();
      participant.reputation += 1;
    } else if (checkState === 'Rotation') {
      const isUserEligible = await validateIsEligible(
        updatedGroup,
        memberAddress
      );
      if (!isUserEligible)
        return console.log(
          'Not eligible, only eligible can contribute in rotation state'
        );
      const participant = await getParticipantData({
        _id: _id,
        _address: _address,
      });
      participant.amountDonated += _amount;
      participant.hasDonated = true;
      participant.timesStamp = Date.now();
      participant.reputation += 1;
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};

const main = async () => {
  await connectToDB();
};

main().catch((error) => {
  process.exitCode = 1;
  console.log(error);
});

