// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Mchango {
    /**Errors */
    error Mchango__GroupAlreadyInContributionState();
    error Mchango__GroupAlreadyInRotationState();
    error Mchango_AlreadyAPremiumSubscriber();
    error Mchango_InsufficientAmountForPremiumService();
    error Mchango_InsufficientContributionAmount();
    error Mchango_NotAMember();
    error Mchango_AlreadyAMember();
    error Mchango_NotAnEligibleMember();
    error Mchango_NotAGroupMember();
    error Mchango_TransactionFailed();
    error Mchango_BlankCompliance();
    error Mchango_UpgradeTier();
    error Mchango_NotEnoughCollateral();
    error Mchango_NotEnoughReputation();
    error Mchango_GroupStateError(State currentState);
    error Mchango_MaxMembersReached();
    error Mchango_NotAPremiumSubscriber();
    error Mchango_NotAllFundsDisbursed();
    error Mchango_GroupDoesntExist();

    /**Type Declarations */
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

    struct Group {
        uint256 id;
        uint256 memberCounter;
        string collateral;
        address admin;
        uint256 balance;
    }

    struct Member {
        uint id;
        address memberAddress;
        uint256 reputation;
    }

    /**State Variables */
    uint256 public counter;
    uint256 public memberCounter;
    uint256 public premiumFee;
    uint256 public exclusiveFee;

    uint256[] private keys;
    uint256[] private memberKeys;
    address[] private admins;
    address public immutable Owner;

    mapping(uint256 => Group) private idToGroup;
    mapping(address => bool) private isPremium;
    mapping(address => Member) private addressToMember;
    mapping(address => bool) public isMember;

    /**Events */
    event inContributionPhase(uint _id);
    event inRotationPhase(uint _id);
    event rotationEnded(uint _id);
    event memberCreated(address indexed member);
    event memberKicked(address indexed _memberAddress);
    event subscriptionExpired(address indexed _subscriber);
    event hasDonated(address indexed _participant, uint256 indexed _amount);
    event joinedGroup(address indexed _participant, uint256 indexed _id);
    event hasCreatedGroup(address indexed _address, uint256 indexed _id);
    event hasReceivedFunds(
        address indexed _participant,
        uint256 indexed _amount
    );
    event participantVerdict(bool _isBanned, address indexed _participant);
    event hasSubscribed(
        address indexed _address,
        uint256 indexed _subscriptionAmount
    );
    event premiumFeeUpdated(address indexed _address, uint256 indexed _fee);

    /**
     * @param _premiumFee this sets the fee for a premium subscription
     */
    constructor(uint256 _premiumFee) {
        premiumFee = _premiumFee;
        Owner = msg.sender;
        isPremium[msg.sender] = true;
    }

    receive() external payable {}

    /**Modifiers */
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

    modifier subscriptionCompliance() {
        if (msg.value < premiumFee) {
            revert Mchango_InsufficientAmountForPremiumService();
        }
        _;
    }

    modifier groupExists(uint256 _id) {
        if (_id > counter) {
            revert Mchango_GroupDoesntExist();
        }
        _;
    }

    modifier idCompliance(uint256 _id) {
        require(_id <= counter, "identifier can not be blank");

        _;
    }

    modifier memberCompliance(address _memberAddress) {
        if (!isMember[_memberAddress]) {
            revert Mchango_NotAMember();
        }
        _;
    }

    /**
     * @dev Function Refactored, Subscriber storage has been moved to database
     */
    function subscribePremium() external payable subscriptionCompliance {
        if (isMember[msg.sender] != true) {
            revert Mchango_NotAMember();
        }

        if (isPremium[msg.sender] == true) {
            revert Mchango_AlreadyAPremiumSubscriber();
        }

        address subscriberAddress = msg.sender;

        uint256 amount = msg.value;
        makePayment(address(this), premiumFee);

        isPremium[subscriberAddress] = true;

        emit hasSubscribed(subscriberAddress, amount);
    }

    function isSubscriberPremium(address _address) public view returns (bool) {
        return isPremium[_address];
    }

    function checkIsGroupMember(
        uint256 _id,
        address _memberAddress
    ) public view returns (bool) {
        return idToGroup[_id].isGroupMember[_memberAddress];
    }

    function checkIsEligibleMember(
        uint256 _id,
        address _memberAddress
    ) public view returns (bool) {
        return idToGroup[_id].isEligibleMember[_memberAddress];
    }

    function returnMemberDetails(
        address _address
    )
        public
        view
        memberCompliance(_address)
        returns (uint256, uint256, address)
    {
        Member memory member = addressToMember[_address];
        return (member.id, member.reputation, member.memberAddress);
    }

    function returnGroup(
        uint256 _id
    ) internal view groupExists(_id) returns (Group storage) {
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

    function makePayment(address recipient, uint256 _value) internal {
        (bool success, ) = payable(recipient).call{value: _value}("");
        if (!success) {
            revert Mchango_TransactionFailed();
        }
    }

    function getMaxMembers(
        address _memberAddress
    ) internal view returns (uint256) {
        uint freePlanMemberLimit;
        if (!isSubscriberPremium(_memberAddress)) {
            freePlanMemberLimit = 10;
        }

        return freePlanMemberLimit;
    }

    /***
     * @dev Refactored and made compatible with backend operations
     */
    function penalize(
        uint256 _id,
        uint256 _contributionValue,
        address _memberAddress
    ) external {
        Group storage group = idToGroup[_id];

        if (group.collateralTracking[_memberAddress] >= _contributionValue) {
            group.collateralTracking[_memberAddress] -= _contributionValue;
            addressToMember[_memberAddress].reputation -= 1;
            group.isEligibleMember[_memberAddress] = false;
        } else {
            group.contributionValue - group.collateralTracking[_memberAddress];
            addressToMember[_memberAddress].reputation -= 2;
            group.isGroupMember[_memberAddress] = false;

            emit memberKicked(_memberAddress);
        }
    }

    /***
     * @dev Refactored and made compatible with backend operations
     */
    function createMember(address _address) external returns (uint256) {
        if (_address == address(0)) {
            revert Mchango_BlankCompliance();
        }
        if (isMember[_address]) {
            revert Mchango_AlreadyAMember();
        }
        memberCounter++;
        uint256 member_id = memberCounter;
        isMember[_address] = true;
        Member memory newMember = Member({
            id: member_id,
            memberAddress: _address,
            reputation: 1
        });
        addressToMember[_address] = newMember;
        memberKeys.push(member_id);
        emit memberCreated(_address);

        return member_id;
    }

    /**
     * @dev Refactored and made compatible with backend operations
     */
    function createGroup(
        uint256 _collateralValue
    ) external memberCompliance(msg.sender) returns (uint256 _id) {
        address _admin = msg.sender;

        counter++;
        uint256 id = counter;

        Group storage newGroup = returnGroup(id);
        newGroup.id = id;
        newGroup.memberCounter = 1;
        newGroup.collateral = _collateralValue + 0 ether;
        newGroup.admin = _admin;
        newGroup.balance = 0;
        newGroup.currentState = State.initialization;
        newGroup.isGroupMember[_admin] = true;
        newGroup.isEligibleMember[_admin] = true;

        keys.push(id);
        admins.push(_admin);

        emit hasCreatedGroup(_admin, id);

        return id;
    }

    /**
     * @dev Refactored and made compatible with backend operations
     */
    function getGroupDetails(
        uint256 _id
    )
        external
        view
        idCompliance(_id)
        groupExists(_id)
        returns (uint256, uint256, uint256, uint256, address, State)
    {
        Group storage group = idToGroup[_id];

        return (
            group.collateral,
            group.contributionValue,
            group.balance,
            group.memberCounter,
            group.admin,
            group.currentState
        );
    }

    /**
     * @dev Refactored and made compatible with backend operations
     */
    function joinGroup(
        address _memberAddress,
        uint256 _id,
        uint256 _groupCollateralValue,
        uint256 _reputationPoint
    )
        external
        payable
        memberCompliance(_memberAddress)
        idCompliance(_id)
        groupExists(_id)
    {
        if (_reputationPoint < 1) {
            revert Mchango_NotEnoughReputation();
        }

        Group storage group = returnGroup(_id);

        if (msg.value < _groupCollateralValue) {
            revert Mchango_NotEnoughCollateral();
        }
        if (group.currentState != State.initialization) {
            revert Mchango_GroupStateError(group.currentState);
        }

        if (group.isGroupMember[_memberAddress]) {
            revert Mchango_AlreadyAMember();
        }

        //? Check if the group has reached its maximum number of members
        if (group.memberCounter >= getMaxMembers(_memberAddress)) {
            revert Mchango_MaxMembersReached();
        }

        group.memberCounter++;
        group.isGroupMember[_memberAddress] = true;
        makePayment(address(this), msg.value);
        group.collateralTracking[_memberAddress] = msg.value;

        emit joinedGroup(_memberAddress, _id);
    }

    /**
     * @dev Refactored and made compatible with backend operations
     */
    function unSubscribePremiumMember(address _subscriberAddress) external {
        if (!isPremium[_subscriberAddress]) {
            revert Mchango_NotAPremiumSubscriber();
        }

        isPremium[_subscriberAddress] = false;

        emit subscriptionExpired(_subscriberAddress);
    }

    function kickGroupMember(
        address _groupMemberAddress,
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);

        group.isGroupMember[_groupMemberAddress] = false;
        group.isEligibleMember[_groupMemberAddress] = false;
        emit memberKicked(_groupMemberAddress);
    }

    // todo: this func is pending testing
    function contribute(
        uint256 _id
    ) external payable idCompliance(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);

        if (group.currentState == State.initialization) {
            revert Mchango_GroupStateError(group.currentState);
        }

        if (msg.value < group.contributionValue) {
            revert Mchango_InsufficientContributionAmount();
        }

        //? Check if the sender is eligible to contribute
        if (getGroupState(_id) == State.contribution) {
            if (!group.isGroupMember[msg.sender]) {
                revert Mchango_NotAGroupMember();
            }

            group.balance += msg.value;
            group.isEligibleMember[msg.sender] = true;

            makePayment(address(this), msg.value);

            //? Add the sender to the eligible members list
        } else if (getGroupState(_id) == State.rotation) {
            if (!group.isEligibleMember[msg.sender]) {
                revert Mchango_NotAnEligibleMember();
            }

            group.balance += msg.value;

            makePayment(address(this), msg.value);
        }

        emit hasDonated(msg.sender, msg.value);
    }

    /**
     * @dev refactored and made compatible with backend operations
     */
    function startContribution(
        uint256 _id,
        uint256 _contributionValue
    ) external idCompliance(_id) onlyAdmin(_id) {
        Group storage group = returnGroup(_id);
        if (group.currentState == State.contribution) {
            revert Mchango__GroupAlreadyInContributionState();
        }
        group.currentState = State.contribution;
        group.contributionValue = _contributionValue;

        emit inContributionPhase(_id);
    }

    /**
     * @notice //!Functionality has been tested
     * ? The purpose of this function is to set the enum state to rotation
     */
    function startRotation(
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = returnGroup(_id);
        State state = group.currentState;
        if (state == State.rotation) {
            revert Mchango__GroupAlreadyInRotationState();
        }

        if (state != State.contribution && state == State.initialization) {
            revert Mchango_GroupStateError(state);
        }
        group.currentState = State.rotation;

        emit inRotationPhase(_id);
    }

    /**
     * todo: this function is pending testing
     * @dev //? this function ends the rotation period
     */
    function endRotation(
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = idToGroup[_id];

        //? require all the funds in rotation has been disbursed
        if (group.balance > 0) {
            revert Mchango_NotAllFundsDisbursed();
        }
        //? Reset the state to initialization
        group.currentState = State.initialization;

        emit rotationEnded(_id);
    }

    /**
     * @dev refactored and made compatible with backend operations
     */
    function disburse(
        uint256 _id,
        uint256 _amount,
        address _memberAddress
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group storage group = idToGroup[_id];
        State state = group.currentState;
        uint256 amountToDisburse = _amount + 0 ether;
        if (state != State.rotation) {
            revert Mchango_GroupStateError(state);
        }

        if (_amount != group.balance) {
            revert Mchango_NotAllFundsDisbursed();
        }

        if (!group.isEligibleMember[_memberAddress]) {
            revert Mchango_NotAnEligibleMember();
        }

        //? 3% fee is subracted from the amount to disburse
        uint256 fee = (amountToDisburse * 3) / 100;
        uint256 balance = amountToDisburse - fee;
        group.balance = 0;

        makePayment(_memberAddress, balance);
        emit hasReceivedFunds(_memberAddress, balance);
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;

        emit premiumFeeUpdated(msg.sender, _fee);
    }
}
