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
    event memberCreated(address indexed _member, uint256 indexed _id);
    event memberKicked(address indexed _memberAddress, uint256 indexed _groupId);
    event subscriptionExpired(address indexed _subscriber);
    event hasDonated(address indexed _participant, uint256 indexed _amount, bool indexed _hasDonated);
    event joinedGroup(address indexed _participant, uint256 indexed _id);
    event hasCreatedGroup(address indexed _address, uint256 indexed _id);
    event hasReceivedFunds(address indexed _participant, uint256 indexed _amount, bool indexed _hasReceivedFunds);
    event hasSubscribed(address indexed _address, uint256 indexed _subscriptionAmount);
    event premiumFeeUpdated(address indexed _address, uint256 indexed _fee);
    event collateralPayedOut(address indexed _from, address indexed _to, uint256 indexed _amount);

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
        require(_id <= counter && _id != 0, "invalid id");
        _;
    }

    modifier memberCompliance(address _memberAddress) {
        if (!isMember[_memberAddress]) {
            revert Mchango_NotAMember();
        }
        _;
    }




    function isSubscriberPremium(address _address) public view returns (bool) {
        return isPremium[_address];
    }

    function checkIsGroupMember(uint256 _id, address _memberAddress) public view returns (bool) {
        return isGroupMember[_memberAddress][_id];
    }

    function checkIsEligibleMember(uint256 _id, address _memberAddress) public view returns (bool) {
        return isEligibleMember[_memberAddress][_id];
    }

    function returnMemberDetails(address _address) public view returns (uint256, address) {
        Member memory member = addressToMember[_address];
        return (member.id, member.memberAddress);
    }


    function returnGroup(uint256 _id) internal view groupExists(_id) returns (Group memory) {
        return idToGroup[_id];
    }

    function makePayment(address recipient, uint256 _value) internal {
        (bool success,) = payable(recipient).call{value: _value}("");
        if (!success) {
            revert Mchango_TransactionFailed('Payment Failed');
        }
    }

    function getMaxMembers(address _memberAddress) internal view returns (uint256) {
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


    function subscribePremium() external payable subscriptionCompliance memberCompliance(msg.sender) {
        uint256 amount = msg.value;

        if (isPremium[msg.sender] == true) {
            revert Mchango_AlreadyAPremiumSubscriber();
        }

        isPremium[msg.sender] = true;
        makePayment(address(this), premiumFee);


        emit hasSubscribed(msg.sender, amount);
    }

    function unSubscribePremiumMember(address _subscriberAddress) external memberCompliance(msg.sender) {
        if (!isPremium[_subscriberAddress]) {
            revert Mchango_NotAPremiumSubscriber();
        }

        isPremium[_subscriberAddress] = false;
        emit subscriptionExpired(_subscriberAddress);
    }

    function penalize(
        uint256 _id,
        address _memberAddress,
        address _tokenAddress,
        address _receiverAddress
    ) external idCompliance(_id) groupExists(_id) onlyAdmin(_id) memberCompliance(_memberAddress) {
        require(isEligibleMember[_receiverAddress][_id], "collateral recipient is not an eligible group member");

        IERC20 token = IERC20(_tokenAddress);
        uint256 collateralValue = checkCollateral(_memberAddress, _tokenAddress);

        isEligibleMember[_memberAddress][_id] = false;
        token.transferFrom(_memberAddress, _receiverAddress, collateralValue);
        emit collateralPayedOut(_memberAddress, _receiverAddress, collateralValue);
    }


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
            memberAddress: _address
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

        Group memory group = Group({
            id: id,
            memberCounter: 1,
            balance: 0,
            collateral: _collateralValueInUsd,
            admin: _admin
        });
        isGroupAdmin[msg.sender][id] = true;
        isGroupMember[msg.sender][id] = true;
        idToGroup[id] = group;


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
        if (!isSubscriberPremium(group.admin) && group.memberCounter >= getMaxMembers(group.admin)) {
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
    ) external memberCompliance(_groupMemberAddress) idCompliance(_id) onlyAdmin(_id) groupExists(_id) {

        if (!checkIsGroupMember(_id, _groupMemberAddress)) {
            revert Mchango_NotAGroupMember();
        }

        idToGroup[_id].memberCounter--;
        isGroupMember[_groupMemberAddress][_id] = false;
        isEligibleMember[_groupMemberAddress][_id] = false;

        emit memberKicked(_groupMemberAddress, _id);
    }


    function contribute(
        uint256 _id,
        uint256 _contributionValue,
        address _tokenAddress
    ) external payable memberCompliance(msg.sender) idCompliance(_id) groupExists(_id)  {
        Group memory group = returnGroup(_id);
        address member = msg.sender;
        uint256 collateralValue = checkCollateral(member, _tokenAddress);

        if (!checkIsGroupMember(_id, member)) {
            revert Mchango_NotAGroupMember();
        }

        if (collateralValue < group.collateral) {
            isEligibleMember[member][_id] = false;
            require(collateralValue >= group.collateral, "insufficient collateral");
        }

        if (msg.value < _contributionValue) {
            revert Mchango_InsufficientContributionAmount();
        }

        idToGroup[_id].balance += msg.value;
        if (!checkIsEligibleMember(_id, member)) {
            isEligibleMember[member][_id] = true;
        }

        makePayment(address(this), msg.value);
        emit hasDonated(msg.sender, msg.value, true);
    }

    function disburse(
        uint256 _id,
        uint256 _amount,
        address _memberAddress
    ) external memberCompliance(_memberAddress) idCompliance(_id) groupExists(_id) onlyAdmin(_id)  {
        if (!checkIsEligibleMember(_id, _memberAddress)) {
            revert Mchango_NotAnEligibleMember();
        }
        idToGroup[_id].balance = 0;

        makePayment(_memberAddress, _amount);
        emit hasReceivedFunds(_memberAddress, _amount, true);
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;
        emit premiumFeeUpdated(msg.sender, _fee);
    }
}
