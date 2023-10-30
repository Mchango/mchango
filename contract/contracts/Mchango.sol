// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/** @author Mchango
 *  @notice This contract needs to be updated
 */
contract Mchango {
    /**
     * todo: update the rotation logic
     * todo: update group storage state
     * todo: update group access
     * todo: implement automatic deduction
     */

    //!Project Events
    event hasCreatedGroup(address indexed _address, string _description);
    event hasDonated(address indexed _participant, uint256 _amount);
    event fundsReleased(address indexed _participant, uint256 _amount);
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

    //!Project Enums

    enum State {
        notStarted,
        inProgress,
        completed
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
        address admin;
        string name;
        string description;
        uint256 balance;
        uint256 contributionValue;
        address[] groupMembers;
        address[] eligibleMembers;
        mapping(address => Participant) participants;
        State currentState;
    }

    struct Participant {
        string name;
        address participantAddress;
        uint256 amountDonated;
        uint256 amountCollected;
        uint256 timeStamp;
        bool isBanned;
        bool isEligble;
        bool hasReceivedFunds;
    }

    //!Project States
    uint256 public premiumFee;
    uint256 public exclusiveFee;
    Group[] public allGroups;
    address[] public admins;
    address private immutable Owner;
    mapping(address => uint256[]) adminToGroupIndexes;
    mapping(address => bool) public isPremium;
    mapping(address => bool) public isExclusive;
    mapping(address => Subscriber) public addressToSubscriber;

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
    modifier onlyAdmin(address _groupAdmin) {
        bool isAdmin = false;
        uint256[] storage groupIndexes = adminToGroupIndexes[_groupAdmin];
        for (uint256 i = 0; i < groupIndexes.length; i++) {
            if (allGroups[groupIndexes[i]].admin == _groupAdmin) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Only group admin can perform this action");
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

    modifier groupCompliance() {
        require(
            adminToGroupIndexes[msg.sender].length == 0,
            "You have already created a group"
        );
        _;
    }

    modifier groupExsist(address _adminAddress) {
        bool exists = false;
        uint256[] storage groupIndexes = adminToGroupIndexes[_adminAddress];
        for (uint256 i = 0; i < groupIndexes.length; i++) {
            if (allGroups[groupIndexes[i]].admin == _adminAddress) {
                exists = true;
                break;
            }
        }
        require(exists, "This group does not exist");
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

    //!Inrernal Functions
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

    function findIndexOfAddress(
        address[] storage array,
        address target
    ) internal view returns (uint256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == target) {
                return i;
            }
        }
        return type(uint256).max;
    }

    function setPremiumFee(uint256 _fee) external onlyOwner {
        premiumFee = _fee;
    }

    function setExclusiveFee(uint256 _fee) external onlyOwner {
        exclusiveFee = _fee;
    }

    //! this function creates a new group
    function createGroup(
        string memory _groupDescription,
        string memory _name,
        uint256 _contributionValue
    ) external groupCompliance {
        address admin = msg.sender;

        Group storage newGroup = allGroups.push();
        newGroup.admin = admin;
        newGroup.name = _name;
        newGroup.description = _groupDescription;
        newGroup.balance = 0;
        newGroup.contributionValue = _contributionValue;
        newGroup.currentState = State.notStarted;

        if (isSubscriberPremium(admin)) {
            newGroup.groupMembers = new address[](20);
        } else if (isSubscriberExclusive(admin)) {
            newGroup.groupMembers = new address[](50);
        } else {
            newGroup.groupMembers = new address[](10);
        }

        uint256 groupIndex = allGroups.length - 1;
        adminToGroupIndexes[admin].push(groupIndex);

        admins.push(admin);

        emit hasCreatedGroup(admin, _groupDescription);
    }

    function getGroupDetails(
        address _admin
    )
        external
        view
        groupExsist(_admin)
        returns (
            string memory,
            string memory,
            uint256,
            address,
            address[] memory
        )
    {
        uint256 groupIndex = adminToGroupIndexes[_admin][0];
        Group storage group = allGroups[groupIndex];

        return (
            group.name,
            group.description,
            group.balance,
            group.admin,
            group.groupMembers
        );
    }

    function addGroupMembers(
        string memory _name,
        address _memberAddress
    ) external onlyAdmin(msg.sender) groupExsist(msg.sender) {
        Group storage group = allGroups[adminToGroupIndexes[msg.sender][0]];

        require(
            group.currentState == State.notStarted,
            "Cannot add members after collection has started"
        );
        if (isSubscriberPremium(msg.sender)) {
            require(
                group.groupMembers.length <= 20,
                "Maximum number of members reached"
            );
        } else if (isSubscriberExclusive(msg.sender)) {
            require(
                group.groupMembers.length <= 50,
                "Maximum number of members reached"
            );
        } else {
            require(
                group.groupMembers.length <= 10,
                "Maximum number of members reached"
            );
        }

        group.participants[_memberAddress] = Participant({
            name: _name,
            participantAddress: _memberAddress,
            amountDonated: 0,
            amountCollected: 0,
            timeStamp: 0,
            isBanned: false,
            isEligble: false,
            hasReceivedFunds: false
        });

        group.groupMembers.push(_memberAddress);
    }

    function setContributionValue(
        uint256 _value
    ) external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        allGroups[groupIndex].contributionValue = _value;
    }

    function kickGroupMember(
        address _groupMemberAddress
    ) external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        uint256 indexToRemove = findIndexOfAddress(
            group.groupMembers,
            _groupMemberAddress
        );
        require(
            indexToRemove < group.groupMembers.length,
            "Address not found in group members"
        );

        group.groupMembers[indexToRemove] = group.groupMembers[
            group.groupMembers.length - 1
        ];
        group.groupMembers.pop();

        emit memberKicked(group.name, _groupMemberAddress);
    }

    function donate(address _adminAddress) external payable {
        uint256[] storage groupIndexes = adminToGroupIndexes[_adminAddress];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.inProgress,
            "You can only donate when the state is in progress"
        );
        require(
            group.contributionValue != 0,
            "Contribution value must be more than zero"
        );
        require(
            msg.value == group.contributionValue,
            "Insufficient amount to contribute"
        );

        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "This transaction failed");

        group.balance += msg.value;
        group.participants[msg.sender].amountDonated += msg.value;
        group.participants[msg.sender].isEligble = true;
        group.eligibleMembers.push(msg.sender);

        emit hasDonated(msg.sender, msg.value);
    }

    function startCollection() external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.notStarted,
            "Collection has already started"
        );

        group.currentState = State.inProgress;
    }

    function endCollection() external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.inProgress,
            "Collection has not started"
        );

        group.currentState = State.completed;
    }

    function releaseCollection(
        address _receiver
    ) external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.completed,
            "Can not release collection while donation is still in progress"
        );

        Participant storage receiver = group.participants[_receiver];
        require(
            receiver.isEligble &&
                !receiver.hasReceivedFunds &&
                !receiver.isBanned,
            "This user is not allowed to receive funds"
        );

        uint256 amountToReceive = group.balance;
        uint256 coolDown;

        if (isSubscriberPremium(msg.sender)) {
            coolDown = 6 days;
            uint256 premiumDeduction = (amountToReceive * 15) / 1000;
            amountToReceive -= premiumDeduction;
        } else if (isSubscriberExclusive(msg.sender)) {
            coolDown = 6 days;
        } else {
            coolDown = 30 days;
            uint256 premiumDeduction = (amountToReceive * 3) / 100;
            amountToReceive -= premiumDeduction;
        }

        require(amountToReceive > 0, "No funds to release");

        require(
            receiver.timeStamp == 0 ||
                block.timestamp > receiver.timeStamp + coolDown,
            "You are still in a cooldown period"
        );

        (bool success, ) = payable(receiver.participantAddress).call{
            value: amountToReceive
        }("");
        require(success, "This transaction was not successful");

        receiver.amountCollected = amountToReceive;
        receiver.hasReceivedFunds = true;
        receiver.timeStamp = block.timestamp;

        uint256 indexToRemove = findIndexOfAddress(
            group.eligibleMembers,
            _receiver
        );
        require(
            indexToRemove < group.eligibleMembers.length,
            "Receiver not found in the list of eligible members"
        );
        group.eligibleMembers[indexToRemove] = group.eligibleMembers[
            group.eligibleMembers.length - 1
        ];
        group.eligibleMembers.pop();
        group.eligibleMembers.push(_receiver);

        emit fundsReleased(_receiver, amountToReceive);
    }

    function resetEligibility() external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.inProgress,
            "Donation period not in progress"
        );

        for (uint256 i = 0; i < group.groupMembers.length; i++) {
            address member = group.groupMembers[i];
            group.participants[member].isEligble = true;
            group.participants[member].hasReceivedFunds = false;
        }
    }

    function moderateParticipant(
        address _participant,
        bool _verdict
    ) external onlyAdmin(msg.sender) {
        uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
        require(groupIndexes.length > 0, "Group does not exist");

        uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
        Group storage group = allGroups[groupIndex];

        require(
            group.currentState == State.notStarted,
            "Group is not in join state"
        );

        group.participants[_participant].isBanned = _verdict;

        emit participantVerdicit(_verdict, _participant);
    }

    receive() external payable {}
}
