// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Helper.sol";

/**
 * todo: create a function to add new member
 * todo: refactor join group function
 */

/* Errors */
error Mchango__GroupAlreadyInContributionState();
error Mchango__GroupAlreadyInRotationState();

contract Mchango {
    //!Project Events
    event hasCreatedGroup(address indexed _address, string _description);
    event hasDonated(address indexed _participant, uint256 _amount);
    event hasReceivedFunds(address indexed _participant, uint256 _amount);
    event memberKicked(string _name, address indexed _memberAddress);
    event participantVerdicit(bool _isBanned, address indexed _participant);
    event joinedGroup(
        address indexed _participant,
        string _groupName,
        uint256 _time
    );
    event hasSubscribed(
        address indexed _address,
        Tier _subscriptionPlan,
        uint256 _subscriptionAmount
    );
    event inContributionPhase(uint _id);
    event inRotationPhase(uint _id);
    event rotationEnded(uint _id);

    //!Project Enums

    enum State {
        initialization,
        contribution,
        rotation
    }

    enum Tier {
        basic,
        premium,
        exclusive
    }

    //! Project Structs

    struct Subscriber {
        address subscriberAddress;
        Tier subscriptionTier;
        uint256 timeStamp;
    }

    struct Group {
        uint256 id;
        uint256 collateral;
        uint256 contributionValue;
        address admin;
        string name;
        bytes32 description;
        uint256 balance;
        uint256 timer;
        uint256 timeLimit;
        address[] groupMembers;
        address[] eligibleMembers;
        mapping(address => Participant) participants;
        mapping(address => uint256) collateralTracking;
        State currentState;
    }

    struct Participant {
        string name;
        address participantAddress;
        uint256 amountDonated;
        uint256 amountCollected;
        uint256 timeStamp;
        bool isBanned;
        bool isEligible;
        bool hasReceivedFunds;
        bool hasDonated;
        uint256 reputation;
    }

    struct Member {
        uint id;
        string name;
        address memberAddress;
        uint256 amountDonated;
        uint256 amountCollected;
        uint256 reputation;
    }

    //!Project States
    uint256 private counter;
    uint256 private memberCounter;
    uint256 public premiumFee;
    uint256 public exclusiveFee;
    uint256[] private keys;
    uint256[] private memberKeys;
    Group[] public allGroups;
    address[] public admins;
    address private immutable Owner;
    mapping(uint256 => Group) public idToGroup;
    mapping(address => uint256[]) adminToGroup;
    mapping(address => bool) public isPremium;
    mapping(address => bool) public isExclusive;
    mapping(address => Subscriber) public addressToSubscriber;
    mapping(address => Member) public addressToMember;
    mapping(address => bool) private isMember;

    /**
     * ! Project constructor
     * @param _premiumFee this sets the fee for a premium subscription
     * @param _exclusiveFee this sets the fee for a exclusive subscription
     */
    constructor(uint256 _premiumFee, uint256 _exclusiveFee) {
        premiumFee = _premiumFee;
        exclusiveFee = _exclusiveFee;
        Owner = msg.sender;
        isExclusive[msg.sender] = true;
    }

    //!Project Modifiers
    modifier onlyAdmin(uint256 _id) {
        require(
            msg.sender == idToGroup[_id].admin,
            "only admin can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "Only owner can call this function");
        _;
    }

    modifier subscriptionCompliance(uint256 _fee) {
        require(
            msg.value == _fee,
            "Insufficient amount to make this subscription"
        );
        _;
    }

    modifier contributionCompliance(uint256 _id, uint256 _value) {
        Group storage group = idToGroup[_id];
        require(
            _value == group.contributionValue,
            "Not enough amount to participate"
        );
        _;
    }

    modifier collateralCompliance(uint256 _value, uint256 _id) {
        require(
            _value >= returnGroup(_id).collateral,
            "Not enough collateral to join group"
        );
        _;
    }

    modifier groupExists(uint256 _id) {
        require(_id <= keys.length, "This group doesn't exist");
        _;
    }

    modifier idCompliance(uint256 _id) {
        require(_id <= counter, "identifier can not be blank");

        _;
    }

    modifier notInitialization(uint256 _id) {
        Group storage group = returnGroup(_id);
        require(
            group.currentState != State.initialization,
            "Can only contribute when contribution state is in effect"
        );
        _;
    }

    //? This function allows users to subscribe for a premium service
    function subscribePremium()
        external
        payable
        subscriptionCompliance(premiumFee)
    {
        address subscriberAddress = msg.sender;
        Tier subscriberPlan = Tier.premium;

        Subscriber memory subscriber = Subscriber({
            subscriberAddress: subscriberAddress,
            subscriptionTier: subscriberPlan,
            timeStamp: block.timestamp
        });

        uint256 amount = msg.value;
        (bool success, ) = payable(address(this)).call{value: amount}("");
        require(success, "This transaction failed");

        isPremium[subscriberAddress] = true;
        addressToSubscriber[subscriberAddress] = subscriber;

        emit hasSubscribed(subscriberAddress, subscriberPlan, amount);
    }

    //? This function allows users to pay for an exclusive subscription
    function subscribeExclusive()
        external
        payable
        subscriptionCompliance(exclusiveFee)
    {
        address subscriberAddress = msg.sender;
        Tier subscriberPlan = Tier.exclusive;

        Subscriber memory subscriber = Subscriber({
            subscriberAddress: subscriberAddress,
            subscriptionTier: subscriberPlan,
            timeStamp: block.timestamp
        });

        uint256 amount = msg.value;
        (bool success, ) = payable(address(this)).call{value: amount}("");
        require(success, "This transaction failed");

        isExclusive[subscriberAddress] = true;
        addressToSubscriber[subscriberAddress] = subscriber;

        emit hasSubscribed(subscriberAddress, subscriberPlan, amount);
    }

    /**
     * @dev these are helper functions that are used internally by major functions
     *
     */
    //!Internal Functions
    function isSubscriberPremium(
        address _address
    ) internal view returns (bool) {
        return isPremium[_address];
    }

    function isSubscriberExclusive(
        address _address
    ) internal view returns (bool) {
        return isExclusive[_address];
    }

    //! this function has been tested
    function returnGroup(uint256 _id) internal view returns (Group storage) {
        return idToGroup[_id];
    }

    function increaseReputation(address _address) internal returns (uint256) {
        addressToMember[_address].reputation++;
        return addressToMember[_address].reputation;
    }

    function getGroupState(uint256 _id) internal view returns (State) {
        Group storage group = idToGroup[_id];

        return group.currentState;
    }

    function makePayment(uint256 _value) internal {
        (bool success, ) = payable(address(this)).call{value: _value}("");
        require(success, "This transaction failed");
    }

    function getMaxMembers(
        address _memberAddress
    ) internal view returns (uint256) {
        if (isSubscriberPremium(_memberAddress)) {
            return 20;
        } else if (isSubscriberExclusive(_memberAddress)) {
            return 50;
        } else {
            return 10;
        }
    }

    function checkIsEligibleMember(uint256 _id) internal view returns (bool) {
        Group storage group = idToGroup[_id];
        bool isEligible = false;

        for (uint i = 0; i < group.eligibleMembers.length; i++) {
            if (group.eligibleMembers[i] == msg.sender) {
                isEligible = true;
                break;
            }
        }

        return isEligible;
    }

    //? this function returns eligble member in a group
    function getEligibleMember(uint256 _id) internal view returns (address) {
        Group storage group = returnGroup(_id);
        address eligibleMember = group.eligibleMembers[0];
        require(
            group.participants[eligibleMember].isEligible,
            "Member is not eligible to receive funds"
        );

        return eligibleMember;
    }

    //? this function perforns arithmetic to get new balance
    function getNewBalance(uint256 _id) internal view returns (uint256) {
        Group storage group = returnGroup(_id);

        uint256 balance = group.balance;
        uint256 gasEstimate = gasleft();
        uint256 balanceAfterGasEstimate = balance - gasEstimate;
        uint256 balanceToBeSent = balanceAfterGasEstimate -
            (balanceAfterGasEstimate / 100);

        return balanceToBeSent;
    }

    /**
     * @dev This function was written this way to successfully return the defaulters in memory
     */
    function getDefaulters(
        uint256 _id
    ) internal view groupExists(_id) returns (address[] memory defaulters) {
        Group storage group = returnGroup(_id);

        require(
            group.currentState == State.rotation,
            "Function can only be called in rotation state"
        );

        uint256 defaulterCount = 0;

        //? Count the number of defaulters
        for (uint256 i = 0; i < group.groupMembers.length; i++) {
            if (!group.participants[group.groupMembers[i]].hasDonated) {
                defaulterCount++;
            }
        }

        //? Initialize the array with the correct length
        defaulters = new address[](defaulterCount);
        uint256 index = 0;

        //? Populate the array with defaulter addresses
        for (uint256 i = 0; i < group.groupMembers.length; i++) {
            address member = group.groupMembers[i];
            if (!group.participants[member].hasDonated) {
                defaulters[index] = member;
                index++;
            }
        }

        return defaulters;
    }

    function collateralAndDisciplineTrigger(
        uint256 _id,
        address[] memory _defaulters
    ) internal {
        Group storage group = returnGroup(_id);

        for (uint256 i = 0; i < _defaulters.length; i++) {
            uint256 collateralAmount = group.collateralTracking[_defaulters[i]];

            if (collateralAmount >= group.contributionValue) {
                address defaulterToMove = _defaulters[i];
                handleExcessCollateral(defaulterToMove, _id);
            } else if (collateralAmount < group.contributionValue) {
                address defaulterToMove = _defaulters[i];
                handleLessCollateral(defaulterToMove, _id);
            }
        }
    }

    /**
     * @dev this function uses the shift method of array removal, it preserves the order of the array but is less gas eefficient
     */
    function handleExcessCollateral(address _defaulter, uint256 _id) internal {
        Group storage group = returnGroup(_id);

        //? Subtract contributionValue from collateralAmount
        group.collateralTracking[_defaulter] -= group.contributionValue;
        addressToMember[_defaulter].reputation -= 1;

        //? Find the index of defaulterToMove in eligibleMembers array
        uint256 indexToRemove = Helper.calculateIndexToRemove(
            _defaulter,
            group.eligibleMembers
        );

        //? Remove the defaulter from eligibleMembers array
        Helper.shiftAndRemoveIndex(indexToRemove, group.eligibleMembers);
    }

    /**
     * @dev this function uses the shift method of array removal, it preserves the order of the array but is less gas eefficient
     * @dev when a group member has collateral value less than the contribution amount, he is removed from the group
     */
    function handleLessCollateral(address _defaulter, uint256 _id) internal {
        Group storage group = returnGroup(_id);

        group.contributionValue - group.collateralTracking[_defaulter];
        addressToMember[_defaulter].reputation -= 2;

        //? Find index of defaulter in eligibleMembers array
        uint256 indexToRemove = Helper.calculateIndexToRemove(
            _defaulter,
            group.eligibleMembers
        );

        //? Remove the defaulter from eligibleMembers array
        Helper.shiftAndRemoveIndex(indexToRemove, group.eligibleMembers);

        //? remove the member from the groupMembers array
        Helper.removeAddress(_defaulter, group.groupMembers);

        emit memberKicked(group.participants[_defaulter].name, _defaulter);
    }

    //? this function is triggered when the disburse function is called
    //? this ensures contributions can be tracked and rotations can be managed till all members hasReceived state is true;
    function resetMembersDonationState(uint _id) internal {
        Group storage group = idToGroup[_id];
        for (uint i = 0; i < group.eligibleMembers.length; i++) {
            group.participants[group.eligibleMembers[i]].hasDonated = false;
            group.participants[group.eligibleMembers[i]].timeStamp = 0;
        }
    }

    /***
     * @dev //! These are external functions
     * @dev This function has been tested and it works
     */
    //? this function creates a new group
    function createGroup(
        string memory _groupDescription,
        string memory _name,
        uint256 _contributionTimeLimit,
        uint256 _collateralValue
    ) external {
        uint256 id = counter++;
        address admin = msg.sender;

        uint256 newContributionTimeLimit = _contributionTimeLimit + 0 seconds;
        uint256 definedCollateralValue = _collateralValue + 0 ether;

        Group storage newGroup = returnGroup(id);
        newGroup.id = id;
        newGroup.collateral = definedCollateralValue;
        newGroup.admin = admin;
        newGroup.name = _name;
        newGroup.description = Helper.stringToBytes32(_groupDescription);
        newGroup.balance = 0;
        newGroup.timeLimit = newContributionTimeLimit;
        newGroup.currentState = State.initialization;

        if (isSubscriberPremium(admin)) {
            newGroup.groupMembers = new address[](20);
        } else if (isSubscriberExclusive(admin)) {
            newGroup.groupMembers = new address[](50);
        } else {
            newGroup.groupMembers = new address[](10);
        }

        keys.push(id);
        adminToGroup[admin].push(id);
        admins.push(admin);

        emit hasCreatedGroup(admin, _groupDescription);
    }

    function getGroupDetails(
        uint256 _id
    )
        external
        view
        idCompliance(_id)
        groupExists(_id)
        returns (string memory, bytes32, uint256, address, address[] memory)
    {
        Group storage group = idToGroup[_id];

        return (
            group.name,
            group.description,
            group.balance,
            group.admin,
            group.groupMembers
        );
    }

    /**
     * @dev this function has been updated and is ready for testing
     *
     */
    function joinGroup(
        uint256 _id,
        string memory _name
    )
        external
        payable
        idCompliance(_id)
        groupExists(_id)
        collateralCompliance(msg.value, _id)
    {
        Group storage group = returnGroup(_id);
        address _memberAddress = msg.sender;

        require(
            group.currentState == State.initialization,
            "Cannot add members after contribution or collection has started"
        );

        //? Check if the group has reached its maximum number of members
        require(
            group.groupMembers.length < getMaxMembers(_memberAddress),
            "Maximum number of members reached"
        );

        //? Check if the sender is already a member
        if (!isMember[_memberAddress]) {
            //? Make payment
            makePayment(msg.value);
            group.collateralTracking[_memberAddress] = msg.value;

            uint256 memberId = memberCounter++;

            //? Create a new participant
            Participant storage participant = group.participants[
                _memberAddress
            ];
            participant.name = _name;
            participant.participantAddress = _memberAddress;
            participant.hasDonated = false;
            participant.reputation = 1;

            memberKeys.push(memberId);

            // Create a new member
            Member storage member = addressToMember[_memberAddress];
            member.id = memberId;
            member.name = _name;
            member.memberAddress = _memberAddress;
            member.reputation = 1;

            //? Set the member status to true
            isMember[_memberAddress] = true;
        } else {
            //? If the sender is already a member, update their reputation
            require(
                addressToMember[_memberAddress].reputation > 0,
                "Not enough reputation to join group"
            );
            group.participants[_memberAddress].reputation = addressToMember[
                _memberAddress
            ].reputation;
        }

        //? Add the sender to the group's members list
        group.groupMembers.push(_memberAddress);

        emit joinedGroup(_memberAddress, group.name, block.timestamp);
    }

    function defineContributionValue(
        uint256 _id
    )
        internal
        view
        idCompliance(_id)
        onlyAdmin(_id)
        groupExists(_id)
        returns (uint256)
    {
        Group storage group = returnGroup(_id);
        uint256 sumCollateral = 0;
        for (uint256 i = 0; i < group.eligibleMembers.length; i++) {
            sumCollateral += group.collateralTracking[group.eligibleMembers[i]];
        }
        uint256 contributionValue = sumCollateral /
            group.eligibleMembers.length;
        return contributionValue;
    }

    //! This function requires an update
    function kickGroupMember(
        address _groupMemberAddress,
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);
        Helper.removeAddress(_groupMemberAddress, group.groupMembers);

        //? This removes an address while maintaining the order of the array
        Helper.shiftAndRemoveAddress(
            _groupMemberAddress,
            group.eligibleMembers
        );

        group.participants[_groupMemberAddress].isBanned = true;
        group.participants[_groupMemberAddress].isEligible = false;
        emit memberKicked(group.name, _groupMemberAddress);
    }

    function contribute(
        uint256 _id
    )
        external
        payable
        idCompliance(_id)
        groupExists(_id)
        contributionCompliance(_id, msg.value)
        notInitialization(_id)
        returns (string memory)
    {
        Group storage group = returnGroup(_id);

        //? Check if the sender is an eligible member of the group
        require(
            group.collateralTracking[msg.sender] == group.collateral,
            "Not a valid member of this group"
        );

        //? Check if the sender is eligible to contribute
        bool isEligible = checkIsEligibleMember(_id);

        if (getGroupState(_id) == State.contribution) {
            require(
                isEligible,
                "Only eligible members can contribute in the contribution state"
            );

            makePayment(msg.value);

            //? Update participant's contribution and eligibility
            Participant storage participant = group.participants[msg.sender];
            participant.amountDonated += msg.value;
            participant.timeStamp = block.timestamp;
            participant.isEligible = true;
            participant.reputation = increaseReputation(msg.sender);
            participant.hasDonated = true;

            //? Add the sender to the eligible members list
            group.eligibleMembers.push(msg.sender);
        } else if (getGroupState(_id) == State.rotation) {
            require(
                isEligible,
                "Only eligible members can contribute in the rotation state"
            );

            makePayment(msg.value);

            //? Update participant's contribution and reputation
            Participant storage participant = group.participants[msg.sender];
            participant.amountDonated += msg.value;
            participant.timeStamp = block.timestamp;
            participant.hasDonated = true;
            participant.reputation = increaseReputation(msg.sender);

            //? This ensures that contributers are arranged in order of their contribution
            uint indexToRemove = Helper.calculateIndexToRemove(
                msg.sender,
                group.eligibleMembers
            );
            Helper.shiftAndRemoveIndex(indexToRemove, group.eligibleMembers);
            group.eligibleMembers.push(msg.sender);
        }

        emit hasDonated(msg.sender, msg.value);

        //? Return a success message
        return "Contribution successful";
    }

    /**
     * @notice //!this function requires an update
     * ? This purpose of this function is to set the state enum to contribution
     */
    function startContribution(
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);
        if (group.currentState == State.contribution) {
            revert Mchango__GroupAlreadyInContributionState();
        }
        group.currentState = State.contribution;
        group.contributionValue = defineContributionValue(_id);

        emit inContributionPhase(_id);
    }

    /**
     * @notice //! This function requires an update
     * ? The purpose of this function is to set the enum state to rotation
     */
    function startRotation(
        uint256 _id,
        uint256 _timeLimit
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);
        if (group.currentState == State.rotation) {
            revert Mchango__GroupAlreadyInRotationState();
        }
        require(
            group.currentState == State.contribution &&
                group.currentState != State.initialization,
            "Not currently in Contribution State"
        );

        group.currentState = State.rotation;
        group.timeLimit = _timeLimit;
        group.timer = block.timestamp;

        emit inRotationPhase(_id);
    }

    /**
     * @dev //? this function ends the rotation period
     */
    function endRotation(
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = idToGroup[_id];

        for (uint i = 0; i < group.eligibleMembers.length; i++) {
            address participantAddress = group.eligibleMembers[i];
            require(
                group.participants[participantAddress].hasReceivedFunds == true,
                "Not all participants have received funds"
            );

            //? Clear the participant's data
            delete group.participants[participantAddress];
        }

        //? Clear the eligibleMembers array
        for (uint i = 0; i < group.eligibleMembers.length; i++) {
            group.eligibleMembers[i] = group.eligibleMembers[
                group.eligibleMembers.length - 1
            ];
            group.eligibleMembers.pop();
        }

        //? require all the funds in rotation has been disbursed
        require(
            group.balance == 0,
            "There is still funds left in group balance"
        );
        //? Reset the state to initialization
        group.currentState = State.initialization;

        emit rotationEnded(_id);
    }

    function penalize(uint256 _id) internal {
        Group storage group = idToGroup[_id];
        require(
            group.currentState == State.rotation,
            "Group not in rotation state yet"
        );
        require(block.timestamp > (group.timer + group.timeLimit));

        address[] memory defaults = getDefaulters(_id);

        collateralAndDisciplineTrigger(_id, defaults);
    }

    /**
     * @notice //! This function releases the accumlated funds for that round
     * @dev //? this function is extremely sensitive and any change should be reported
     */
    function disburse(
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = idToGroup[_id];
        require(
            group.currentState == State.rotation,
            "Can only call disburse in rotation state"
        );

        //? penalize defaulters
        penalize(_id);

        //? get the eligible member
        address eligibleParticipant = getEligibleMember(_id);

        //? access the particpants array
        Participant memory participant = group.participants[
            eligibleParticipant
        ];
        require(participant.hasDonated, "this participant hasn't contributed");
        //? update the amountCollectes state
        uint256 amount = getNewBalance(_id);
        participant.amountCollected = amount;

        //? update the timestamp
        participant.timeStamp = block.timestamp;

        //? update the has receivedFunds state
        participant.hasReceivedFunds = true;
        (bool sent, ) = payable(participant.participantAddress).call{
            value: amount
        }("");
        require(sent, "transaction failed");

        //? push eligible member to the back of the array
        uint indexToRemove = Helper.calculateIndexToRemove(
            participant.participantAddress,
            group.eligibleMembers
        );

        //? check if address is already in last position
        if (indexToRemove != group.eligibleMembers.length - 1) {
            Helper.shiftAndRemoveIndex(indexToRemove, group.eligibleMembers);
        }
        group.eligibleMembers.push(participant.participantAddress);

        resetMembersDonationState(_id);
        group.timer = block.timestamp;

        emit hasReceivedFunds(participant.participantAddress, amount);
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;
    }

    function setExclusiveFee(uint256 _fee) external onlyOwner {
        exclusiveFee = _fee;
    }

    /**
     * @notice //! This function needs an update
     */
    function moderateParticipant(
        address _participant,
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        require(_participant != address(0), "enter a participant to moderate");
        Group storage group = returnGroup(_id);

        for (uint256 i = 0; i < group.eligibleMembers.length; i++) {
            if (group.eligibleMembers[i] == _participant) {
                group.eligibleMembers[i] = group.groupMembers[i + 1];
            }
            group.eligibleMembers.pop();
        }
        group.participants[_participant].isBanned = true;

        //? decrement reputation
        group.participants[_participant].reputation--;
        group.participants[_participant].isEligible = false;
    }

    receive() external payable {}
}
