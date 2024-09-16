// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


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
    error Mchango_TransactionFailed(string _msg);
    error Mchango_BlankCompliance();
    error Mchango_UpgradeTier();
    error Mchango_NotEnoughCollateral();
    error Mchango_NotEnoughReputation();
    error Mchango_MaxMembersReached();
    error Mchango_NotAPremiumSubscriber();
    error Mchango_NotAllFundsDisbursed();
    error Mchango_GroupDoesntExist();


    enum Tier {
        basic,
        premium,
        exclusive
    }

    struct Group {
        uint256 id;
        uint256 memberCounter;
        uint256 collateral;
        address admin;
        uint256 balance;
    }

    struct Member {
        uint id;
        address memberAddress;
    }

    /**State Variables */
    uint256 public counter;
    uint256 public memberCounter;
    uint256 public premiumFee;
    uint256 public exclusiveFee;
    uint256 private immutable FREE_PLAN_LIMIT = 5;


    address public immutable Owner;
    mapping(uint256 => Group) private idToGroup;
    mapping(address => bool) private isPremium;
    mapping(address => Member) private addressToMember;
    mapping(address => bool) public isMember;
    mapping(address => mapping(uint256 => bool)) public isGroupMember;
    mapping(address => mapping(uint256 => bool)) public isEligibleMember;
    mapping(address => mapping(uint256 => bool)) public isGroupAdmin;

    /**Events */
    event inContributionPhase(uint _id);
    event inRotationPhase(uint _id);
    event rotationEnded(uint _id);
    event memberCreated(address indexed _member, uint256 indexed _id);
    event memberKicked(address indexed _memberAddress, uint256 indexed _groupId);
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
            msg.sender == idToGroup[_id].admin || msg.sender == Owner,
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
        require(_id <= counter && _id != 0, "identifier can not be blank");
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


        uint256 amount = msg.value;
        makePayment(address(this), premiumFee);

        isPremium[msg.sender] = true;

        emit hasSubscribed(msg.sender, amount);
    }

    function unSubscribePremiumMember(address _subscriberAddress) external {
        if (!isPremium[_subscriberAddress]) {
            revert Mchango_NotAPremiumSubscriber();
        }

        isPremium[_subscriberAddress] = false;

        emit subscriptionExpired(_subscriberAddress);
    }

    function isSubscriberPremium(address _address) public view returns (bool) {
        return isPremium[_address];
    }

    function checkIsGroupMember(
        uint256 _id,
        address _memberAddress
    ) public view returns (bool) {
        return isGroupMember[_memberAddress][_id];
    }

    function checkIsEligibleMember(
        uint256 _id,
        address _memberAddress
    ) public view returns (bool) {
        return isEligibleMember[_memberAddress][_id];
    }

    function returnMemberDetails(
        address _address
    )
    public
    view
    returns (uint256, address)
    {
        Member memory member = addressToMember[_address];
        return (member.id, member.memberAddress);
    }

    function returnGroup(
        uint256 _id
    ) internal view groupExists(_id) returns (Group memory) {
        return idToGroup[_id];
    }

    function makePayment(address recipient, uint256 _value) internal {
        (bool success,) = payable(recipient).call{value: _value}("");
        if (!success) {
            revert Mchango_TransactionFailed('Payment Failed');
        }
    }

    function getMaxMembers(
        address _memberAddress
    ) internal view returns (uint256) {
        uint freePlanMemberLimit;
        if (!isSubscriberPremium(_memberAddress)) {
            freePlanMemberLimit = FREE_PLAN_LIMIT;
        }

        return freePlanMemberLimit;
    }

    function checkCollateral(address _owner, address _tokenAddress) internal view returns (uint256) {
        IERC20 token = IERC20(_tokenAddress);
        uint256 remainingAllowance = token.allowance(_owner, address(this));
        return remainingAllowance;
    }

    /***
     * @notice This function has not been implemented
     */
    function penalize(
        uint256 _id,
        uint256 _contributionValue,
        address _memberAddress
    ) external {}


    function createMember(address _address) external {
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
        emit memberCreated(_address, member_id);
    }

    function createGroup(
        uint256 _collateralValueInUsd
    ) external memberCompliance(msg.sender) {
        address _admin = msg.sender;

        counter++;
        uint256 id = counter;
        isGroupAdmin[msg.sender][id] = true;
        Group memory newGroup = Group({
            id: id,
            memberCounter: 1,
            balance: 0,
            collateral: _collateralValueInUsd,
            admin: _admin
        });

        emit hasCreatedGroup(_admin, id);
    }


    function getGroupDetails(uint256 _id) external view
    idCompliance(_id)
    groupExists(_id)
    returns (address, uint256, uint256, uint256)
    {
        Group memory group = idToGroup[_id];
        return (
            group.admin,
            group.collateral,
            group.balance,
            group.memberCounter
        );
    }


    function joinGroup(
        address _memberAddress,
        address _tokenAddress,
        uint256 _id,
        uint256 _reputationPoint
    )
    external
    memberCompliance(_memberAddress)
    idCompliance(_id)
    groupExists(_id)
    {
        if (isGroupMember[_memberAddress][_id]) {
            revert Mchango_AlreadyAMember();
        }
        if (_reputationPoint < 1) {
            revert Mchango_NotEnoughReputation();
        }

        Group memory group = returnGroup(_id);
        if (!isSubscriberPremium(_memberAddress) && group.memberCounter >= getMaxMembers(_memberAddress)) {
            revert Mchango_MaxMembersReached();
        }

        uint256 allowance = checkCollateral(_memberAddress, _tokenAddress);
        if (allowance < group.collateral) {
            revert Mchango_NotEnoughCollateral();
        }

        idToGroup[_id].memberCounter++;
        isGroupMember[_memberAddress][_id] = true;

        emit joinedGroup(_memberAddress, _id);
    }

    function kickGroupMember(
        address _groupMemberAddress,
        uint256 _id
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        idToGroup[_id].memberCounter--;
        isGroupMember[_groupMemberAddress][_id] = false;
        isEligibleMember[_groupMemberAddress][_id] = false;

        emit memberKicked(_groupMemberAddress, _id);
    }


    function contribute(
        uint256 _id,
        uint256 _contributionValue,
        address _tokenAddress
    ) external payable idCompliance(_id) groupExists(_id) memberCompliance(msg.sender) {
        Group memory group = returnGroup(_id);
        address member = msg.sender;
        uint256 collateralValue = checkCollateral(member, _tokenAddress );

        if(!isGroupMember[member][_id]) {
            revert Mchango_NotAGroupMember();
        }

        if (collateralValue < group.collateral) {
            isEligibleMember[member][_id] = false;
            revert Mchango_NotEnoughCollateral();
        }

        if (msg.value < _contributionValue) {
            revert Mchango_InsufficientContributionAmount();
        }

        idToGroup[_id].balance += msg.value;
        if(!isEligibleMember[member][_id]) {
            isEligibleMember[member][_id] = true;
        }

        makePayment(address(this), msg.value);
        emit hasDonated(msg.sender, msg.value);
    }

    function disburse(
        uint256 _id,
        uint256 _amount,
        address _memberAddress
    ) external idCompliance(_id) onlyAdmin(_id) groupExists(_id) {
        Group memory group = idToGroup[_id];


        if (!isEligibleMember[_memberAddress][_id]) {
            revert Mchango_NotAnEligibleMember();
        }
        group.balance = 0;

        makePayment(_memberAddress, _amount);
        emit hasReceivedFunds(_memberAddress, _amount);
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;
        emit premiumFeeUpdated(msg.sender, _fee);
    }
}
