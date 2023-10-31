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
        string description;
        uint256 balance;
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
        bool isEligble;
        bool hasReceivedFunds;
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
    uint256 private counter = 0;
    uint256 private memberCounter = 0;
    uint256 public premiumFee;
    uint256 public exclusiveFee;
    uint256[] public keys;
    uint256[] public memberKeys;
    Group[] public allGroups;
    address[] public admins;
    address private immutable Owner;
    mapping(uint256 => Group) idToGroup;
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

    modifier groupExsist(uint256 _id) {
        require(_id <= keys.length, "This group doesn't exist");
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
        uint256 _collateralValue
    ) external {
        uint256 id = counter++;
        address admin = msg.sender;

        Group storage newGroup = idToGroup[id];
        newGroup.id = id;
        newGroup.collateral = _collateralValue;
        newGroup.admin = admin;
        newGroup.name = _name;
        newGroup.description = _groupDescription;
        newGroup.balance = 0;
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
        groupExsist(_id)
        returns (
            string memory,
            string memory,
            uint256,
            address,
            address[] memory
        )
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
     * @notice //!function requires an update
     */

    function joinGroup(
        uint256 _id,
        string memory _name
    ) external groupExsist(_id) {
        Group storage group = idToGroup[_id];
        address _memberAddress = msg.sender;

        require(
            group.currentState == State.initialization,
            "Cannot add members after contribution or collection has started"
        );
        require(
            group.groupMembers.length < getMaxMembers(_memberAddress),
            "Maximum number of members reached"
        );

        if (!isMember[_memberAddress]) {
            uint256 memberId = memberCounter++;
            group.participants[_memberAddress] = Participant({
                name: _name,
                participantAddress: _memberAddress,
                amountDonated: 0,
                amountCollected: 0,
                timeStamp: 0,
                isBanned: false,
                isEligble: false,
                hasReceivedFunds: false,
                reputation: 1
            });

            memberKeys.push(memberId);

            addressToMember[_memberAddress] = Member({
                id: memberId,
                name: _name,
                memberAddress: _memberAddress,
                amountDonated: 0,
                amountCollected: 0,
                reputation: 1
            });

            isMember[_memberAddress] = true;
        } else {
            require(
                addressToMember[_memberAddress].reputation > 0,
                "Not enough reputation to join group"
            );
            group.participants[_memberAddress].reputation = addressToMember[
                _memberAddress
            ].reputation;
        }

        group.groupMembers.push(_memberAddress);
    }

    //! This function is called when the group state is in contribution
    function defineContributionValue(uint256) internal {
        //? Acess the group loop through collateral tracking array
        //? find the average of the values in the array
        //? update the contributionValue
    }

    //! This function requires an update
    // function kickGroupMember(
    //     address _groupMemberAddress
    // ) external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     uint256 indexToRemove = findIndexOfAddress(
    //         group.groupMembers,
    //         _groupMemberAddress
    //     );
    //     require(
    //         indexToRemove < group.groupMembers.length,
    //         "Address not found in group members"
    //     );

    //     group.groupMembers[indexToRemove] = group.groupMembers[
    //         group.groupMembers.length - 1
    //     ];
    //     group.groupMembers.pop();

    //     emit memberKicked(group.name, _groupMemberAddress);
    // }

    /**
     * @notice //! This function requires an update
     *
     */
    // function donate(address _adminAddress) external payable {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[_adminAddress];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.inProgress,
    //         "You can only donate when the state is in progress"
    //     );
    //     require(
    //         group.contributionValue != 0,
    //         "Contribution value must be more than zero"
    //     );
    //     require(
    //         msg.value == group.contributionValue,
    //         "Insufficient amount to contribute"
    //     );

    //     (bool success, ) = payable(address(this)).call{value: msg.value}("");
    //     require(success, "This transaction failed");

    //     group.balance += msg.value;
    //     group.participants[msg.sender].amountDonated += msg.value;
    //     group.participants[msg.sender].isEligble = true;
    //     group.eligibleMembers.push(msg.sender);

    //     emit hasDonated(msg.sender, msg.value);
    // }

    /**
     * @notice //!this function requires an update
     * ? This purpose of this function is to set the state enum to contribution
     */
    // function startCollection() external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.notStarted,
    //         "Collection has already started"
    //     );

    //     group.currentState = State.inProgress;
    // }

    /**
     * @notice //! This function requires an update
     * ? The purpose of this function is to set the enum state to rotation
     */
    // function endCollection() external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.inProgress,
    //         "Collection has not started"
    //     );

    //     group.currentState = State.completed;
    // }

    /**
     * @notice //! this function needs to be updated
     */
    // function releaseCollection(
    //     address _receiver
    // ) external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.completed,
    //         "Can not release collection while donation is still in progress"
    //     );

    //     Participant storage receiver = group.participants[_receiver];
    //     require(
    //         receiver.isEligble &&
    //             !receiver.hasReceivedFunds &&
    //             !receiver.isBanned,
    //         "This user is not allowed to receive funds"
    //     );

    //     uint256 amountToReceive = group.balance;
    //     uint256 coolDown;

    //     if (isSubscriberPremium(msg.sender)) {
    //         coolDown = 6 days;
    //         uint256 premiumDeduction = (amountToReceive * 15) / 1000;
    //         amountToReceive -= premiumDeduction;
    //     } else if (isSubscriberExclusive(msg.sender)) {
    //         coolDown = 6 days;
    //     } else {
    //         coolDown = 30 days;
    //         uint256 premiumDeduction = (amountToReceive * 3) / 100;
    //         amountToReceive -= premiumDeduction;
    //     }

    //     require(amountToReceive > 0, "No funds to release");

    //     require(
    //         receiver.timeStamp == 0 ||
    //             block.timestamp > receiver.timeStamp + coolDown,
    //         "You are still in a cooldown period"
    //     );

    //     (bool success, ) = payable(receiver.participantAddress).call{
    //         value: amountToReceive
    //     }("");
    //     require(success, "This transaction was not successful");

    //     receiver.amountCollected = amountToReceive;
    //     receiver.hasReceivedFunds = true;
    //     receiver.timeStamp = block.timestamp;

    //     uint256 indexToRemove = findIndexOfAddress(
    //         group.eligibleMembers,
    //         _receiver
    //     );
    //     require(
    //         indexToRemove < group.eligibleMembers.length,
    //         "Receiver not found in the list of eligible members"
    //     );
    //     group.eligibleMembers[indexToRemove] = group.eligibleMembers[
    //         group.eligibleMembers.length - 1
    //     ];
    //     group.eligibleMembers.pop();
    //     group.eligibleMembers.push(_receiver);

    //     emit fundsReleased(_receiver, amountToReceive);
    // }

    // function resetEligibility() external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.inProgress,
    //         "Donation period not in progress"
    //     );

    //     for (uint256 i = 0; i < group.groupMembers.length; i++) {
    //         address member = group.groupMembers[i];
    //         group.participants[member].isEligble = true;
    //         group.participants[member].hasReceivedFunds = false;
    //     }
    // }

    /**
     * @notice //! This function needs an update
     */
    // function moderateParticipant(
    //     address _participant,
    //     bool _verdict
    // ) external onlyAdmin(msg.sender) {
    //     uint256[] storage groupIndexes = adminToGroupIndexes[msg.sender];
    //     require(groupIndexes.length > 0, "Group does not exist");

    //     uint256 groupIndex = groupIndexes[groupIndexes.length - 1];
    //     Group storage group = allGroups[groupIndex];

    //     require(
    //         group.currentState == State.notStarted,
    //         "Group is not in join state"
    //     );

    //     group.participants[_participant].isBanned = _verdict;

    //     emit participantVerdicit(_verdict, _participant);
    // }

    receive() external payable {}
}
