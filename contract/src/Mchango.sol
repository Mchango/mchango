// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
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
    uint256 private immutable SERVICE_FEE = 1;
    uint256 private immutable DRAIN_PERCENTAGE = 90;

    address public immutable Owner;
    address private OffloadAddress;
    mapping(uint256 => Group) private idToGroup;
    mapping(address => Member) private addressToMember;
    mapping(address => bool) public isMember;
    mapping(address => mapping(uint256 => bool)) public isGroupMember;
    mapping(address => mapping(uint256 => bool)) public isEligibleMember;
    mapping(address => mapping(uint256 => bool)) public isGroupAdmin;

    /**Events */
    event memberCreated(address indexed _member, uint256 indexed _id);
    event memberKicked(
        address indexed _memberAddress,
        uint256 indexed _groupId
    );
    event hasDonated(
        address indexed _participant,
        uint256 indexed _amount,
        bool indexed _hasDonated
    );
    event joinedGroup(address indexed _participant, uint256 indexed _id);
    event hasCreatedGroup(address indexed _address, uint256 indexed _id);
    event hasReceivedFunds(
        address indexed _participant,
        uint256 indexed _amount,
        bool indexed _hasReceivedFunds
    );
    event hasSubscribed(
        address indexed _address,
        uint256 indexed _subscriptionAmount
    );
    event premiumFeeUpdated(address indexed _address, uint256 indexed _fee);
    event collateralPayedOut(
        address indexed _from,
        address indexed _to,
        uint256 indexed _amount
    );
    event contractOffloaded(uint256 indexed _amount, address indexed _address);
    event offloadAddressChanged(address indexed _newAddress);
    event isEligible(address indexed _member);

    constructor(uint256 _premiumFee, address _offloadAddress) {
        premiumFee = _premiumFee;
        Owner = msg.sender;
        OffloadAddress = _offloadAddress;
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
    ) public view returns (uint256, address) {
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
            revert Mchango_TransactionFailed("Payment Failed");
        }
    }

    function checkCollateral(
        address _owner,
        address _tokenAddress
    ) internal view returns (uint256) {
        IERC20 token = IERC20(_tokenAddress);
        uint256 remainingAllowance = token.allowance(_owner, address(this));
        return remainingAllowance;
    }

    function subscribePremium()
    external
    payable
    subscriptionCompliance
    memberCompliance(msg.sender)
    {
        uint256 amount = msg.value;
        makePayment(address(this), premiumFee);

        emit hasSubscribed(msg.sender, amount);
    }

    function penalize(
        uint256 _id,
        address _memberAddress,
        address _tokenAddress,
        address _receiverAddress
    )
    external
    idCompliance(_id)
    groupExists(_id)
    onlyAdmin(_id)
    memberCompliance(_memberAddress)
    {
        require(
            isEligibleMember[_receiverAddress][_id],
            "collateral recipient is not an eligible group member"
        );

        IERC20 token = IERC20(_tokenAddress);
        uint256 collateralValue = checkCollateral(
            _memberAddress,
            _tokenAddress
        );

        isEligibleMember[_memberAddress][_id] = false;
        token.transferFrom(_memberAddress, _receiverAddress, collateralValue);
        emit collateralPayedOut(
            _memberAddress,
            _receiverAddress,
            collateralValue
        );
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

    function getGroupDetails(
        uint256 _id
    )
    external
    view
    idCompliance(_id)
    groupExists(_id)
    returns (address, uint256, uint256)
    {
        Group memory group = idToGroup[_id];
        return (
            group.admin,
            group.balance,
            group.memberCounter
        );
    }

    function joinGroup(
        address _memberAddress,
        address _tokenAddress,
        uint256 _id,
        uint256 _reputationPoint,
        uint256 _collateral,
        bool isGroupAdminPremium
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
        if (!isGroupAdminPremium && group.memberCounter >= FREE_PLAN_LIMIT) {
            revert Mchango_MaxMembersReached();
        }

        uint256 allowance = checkCollateral(_memberAddress, _tokenAddress);
        if (allowance < _collateral) {
            revert Mchango_NotEnoughCollateral();
        }

        idToGroup[_id].memberCounter++;
        isGroupMember[_memberAddress][_id] = true;

        emit joinedGroup(_memberAddress, _id);
    }

    function kickGroupMember(
        address _groupMemberAddress,
        uint256 _id
    )
    external
    memberCompliance(_groupMemberAddress)
    idCompliance(_id)
    onlyAdmin(_id)
    groupExists(_id)
    {
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
        uint256 _collateral,
        address _tokenAddress
    )
    external
    payable
    memberCompliance(msg.sender)
    idCompliance(_id)
    groupExists(_id)
    {
        Group memory group = returnGroup(_id);
        address member = msg.sender;
        uint256 collateralValue = checkCollateral(member, _tokenAddress);

        if (!checkIsGroupMember(_id, member)) {
            revert Mchango_NotAGroupMember();
        }

        if (collateralValue < _collateral) {
            isEligibleMember[member][_id] = false;
            require(
                collateralValue >= _collateral,
                "insufficient collateral"
            );
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
    )
    external
    memberCompliance(_memberAddress)
    idCompliance(_id)
    groupExists(_id)
    onlyAdmin(_id)
    {
        if (!checkIsEligibleMember(_id, _memberAddress)) {
            revert Mchango_NotAnEligibleMember();
        }
        idToGroup[_id].balance = 0;
        uint256 fee = (_amount * SERVICE_FEE) / 100;
        uint256 amountAfterFee = _amount - fee;

        makePayment(_memberAddress, amountAfterFee);
        emit hasReceivedFunds(_memberAddress, amountAfterFee, true);
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;
        emit premiumFeeUpdated(msg.sender, _fee);
    }

    function offload() external onlyOwner {
        uint256 offload_percentage = (address(this).balance *
            DRAIN_PERCENTAGE) / 100;
        uint256 offload_share = address(this).balance - offload_percentage;
        makePayment(Owner, offload_share);

        emit contractOffloaded(offload_share, msg.sender);
    }

    function setOffloadAddress(address _offloadAddress) external onlyOwner {
        OffloadAddress = _offloadAddress;
        emit offloadAddressChanged(_offloadAddress);
    }


    function toggleMemberEligibility(uint256 _groupId, uint256 _collateral, address _tokenAddress) external groupExists(_groupId) {
        address _member = msg.sender;
        bool compliant = isGroupMember[_member][_groupId];
        require(compliant == true, 'not a group member');

        uint256 allowance = checkCollateral(_member, _tokenAddress);
        require(allowance >= _collateral, 'not collateral compliant');

        isEligibleMember[_member][_groupId] = true;
        emit isEligible(_member);
    }

    function resetMemberEligibility() external {}
}