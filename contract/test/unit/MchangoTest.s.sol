// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DeployMchango} from "../../script/Mchango.s.sol";
import {Mchango} from "../../src/Mchango.sol";

contract MchangoTest is Script {
    /**Errors */
    error Mchango_GroupStateError(Mchango.State currentState);
    error Mchango_InsufficientContributionAmount();
    error Mchango_NotAGroupMember();
    error Mchango__GroupAlreadyInRotationState();
    error Mchango_NotAllFundsDisbursed();
    error Mchango_NotAnEligibleMember();

    /**Events */
    event hasSubscribed(
        address indexed _address,
        uint256 indexed _subscriptionAmount
    );
    event memberCreated(address indexed member);
    event memberKicked(address indexed _memberAddress);
    event hasCreatedGroup(address indexed _address, uint256 indexed _id);
    event joinedGroup(address indexed _participant, uint256 indexed _id);
    event hasDonated(address indexed _participant, uint256 indexed _amount);
    event hasReceivedFunds(
        address indexed _participant,
        uint256 indexed _amount
    );
    event subscriptionExpired(address indexed _subscriber);
    event inRotationPhase(uint _id);
    event premiumFeeUpdated(address indexed _address, uint256 indexed _fee);

    /**State & Variables */
    Mchango mchango;
    address User = makeAddr("3illBaby");
    address member1 = makeAddr("3illBaby1");
    address member2 = makeAddr("3illBaby2");
    address member3 = makeAddr("3illBaby3");
    uint256 public constant PREMIUM_FEE = 2 ether;

    function setUp() public {
        vm.startBroadcast();
        DeployMchango deployMchango = new DeployMchango();
        vm.stopBroadcast();
        mchango = deployMchango.run(User);
        vm.deal(User, 100 ether);
        vm.deal(member1, 100 ether);
        vm.deal(member2, 100 ether);
        vm.deal(member3, 100 ether);
    }

    modifier createMember(address member) {
        mchango.createMember(member);
        _;
    }

    function createGroup() internal createMember(member1) {
        vm.startPrank(member1);
        mchango.createGroup(member1, 1 ether, 0);
        vm.stopPrank();
    }

    function createNewMember(address _newMember) internal {
        vm.startPrank(_newMember);
        mchango.createMember(_newMember);
    }

    function testSuccessfulDeployment() public view {
        address ownerAddress = mchango.Owner();
        assert(ownerAddress == User);
    }

    function testCreatesMemberSuccessfully() public createMember(member1) {
        bool isGroupMember = mchango.isMember(member1);
        assert(isGroupMember);
    }

    function testEmitsEventAfterCreatingAMember() public {
        vm.expectEmit(true, false, false, false);
        emit memberCreated(member1);

        vm.prank(member1);
        mchango.createMember(member1);
    }

    function testEnsureMemberCannotBeCreatedTwice()
        public
        createMember(member1)
    {
        vm.expectRevert(Mchango.Mchango_AlreadyAMember.selector);
        vm.prank(member1);
        mchango.createMember(member1);
    }

    function testEnsureMemberDetailsIsUpdatedAccordingly()
        external
        createMember(member1)
    {
        (uint256 id, uint256 reputation, address memberAddress) = mchango
            .returnMemberDetails(member1);
        assert(id == 1);
        assert(reputation == 1);
        assert(memberAddress == member1);
    }

    function testEnsureNewMemberStartsWithBasicSubscription()
        public
        createMember(member1)
    {
        bool isMemberPremium = mchango.isSubscriberPremium(member1);
        assert(!isMemberPremium);
    }

    function testEnsureMemberCounterIncrement() public createMember(member1) {
        uint256 memberCount = mchango.memberCounter();
        assert(memberCount == 1);
    }

    function testContractDeploysWithRightPremiumFee() public view {
        uint256 premiumFee = mchango.premiumFee();
        assert(premiumFee == PREMIUM_FEE);
    }

    function testEnsureContractOwnerIsPremiumSubscriber() external view {
        bool isUserPremium = mchango.isSubscriberPremium(User);
        assert(isUserPremium);
    }

    function testEnsurePremiumSubscriptionFailsIfNotAMember() public {
        vm.prank(member1);
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);
        mchango.subscribePremium{value: PREMIUM_FEE}();
    }

    function testEnsurePremiumSubscriptionFailsIfAmountIsLessThanPremiumFee()
        public
        createMember(member1)
    {
        vm.prank(member1);
        vm.expectRevert(
            Mchango.Mchango_InsufficientAmountForPremiumService.selector
        );
        mchango.subscribePremium{value: 1 ether}();
    }

    function testSuccessfullPremiumSubscription()
        external
        createMember(member1)
    {
        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();

        bool isMemberPremium = mchango.isSubscriberPremium(member1);
        assert(isMemberPremium);
    }

    function testEnsureShouldRevertIfAlreadyAPremiumSubscriber()
        public
        createMember(member1)
    {
        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_AlreadyAPremiumSubscriber.selector);

        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();
    }

    function testEmitsEventsAfterPremiumSubscription()
        public
        createMember(member1)
    {
        vm.expectEmit(true, true, false, false);
        emit hasSubscribed(member1, PREMIUM_FEE);

        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();
    }

    function testEnsureCreateGroupShouldRevertIfNotAMember() public {
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);
        vm.prank(member1);
        mchango.createGroup(member1, 2 ether, 0);
    }

    function testEnsureIfNonPremiumMemberTriesToCreateMoreThan1Group()
        public
        createMember(member1)
    {
        vm.expectRevert(Mchango.Mchango_UpgradeTier.selector);
        vm.prank(member1);
        mchango.createGroup(member1, 2 ether, 1);
    }

    function testPremiumSubscribersCanCreateMoreThanASingleGroup()
        external
        createMember(member1)
    {
        vm.prank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        mchango.createGroup(member1, 2 ether, 2);
    }

    function testCreatesGroupSuccessfully() public createMember(member1) {
        vm.prank(member1);
        mchango.createGroup(member1, 2 ether, 0);
        Mchango.State groupState = Mchango.State.initialization;
        (
            uint256 _collateralValue,
            uint256 _contributionValue,
            uint256 _balance,
            uint256 _memberCount,
            address _admin,
            Mchango.State _state
        ) = mchango.getGroupDetails(1);
        assert(_collateralValue == 2 ether);
        assert(_contributionValue == 0);
        assert(_balance == 0);
        assert(_memberCount == 1);
        assert(_admin == member1);
        assert(_state == groupState);
    }

    function testEnsureEmitsAnEventAfterCreatingGroup()
        public
        createMember(member1)
    {
        vm.expectEmit(true, true, false, false);
        emit hasCreatedGroup(member1, 1);

        vm.prank(member1);
        mchango.createGroup(member1, 2 ether, 0);
    }

    function testEnsureRevertsIfNotAGroupMemberJoinsAGroup()
        public
        createMember(member1)
    {
        vm.startPrank(member1);
        mchango.createGroup(member1, 2 ether, 0);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_NotAMember.selector);
        vm.prank(member2);
        mchango.joinGroup(member2, 1, 1 ether, 1);
    }

    function testEnsureJoinGroupsRevertsIfReputationPointIsLessThan1() public {
        createGroup();
        createNewMember(member2);

        vm.expectRevert(Mchango.Mchango_NotEnoughReputation.selector);
        vm.startPrank(member2);
        mchango.joinGroup(member2, 1, 1 ether, 0);
        vm.stopPrank();
    }

    function testEnsureJoinGroupRevertsIfCollateralIsInsufficient() public {
        createGroup();
        createNewMember(member2);

        vm.expectRevert(Mchango.Mchango_NotEnoughCollateral.selector);
        vm.startPrank(member2);
        mchango.joinGroup(member2, 1, 0.5 ether, 1);
        vm.stopPrank();
    }

    function testEnsureJoinGroupRevertsIfGroupStateisNotInitialization()
        public
    {
        createGroup();
        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        createNewMember(member2);

        vm.expectRevert(
            abi.encodeWithSelector(
                Mchango.Mchango_GroupStateError.selector,
                Mchango.State.contribution
            )
        );
        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();
    }

    function testEnsureUserCanJoinGroup() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        Mchango.State groupState = Mchango.State.initialization;
        (
            uint256 _collateralValue,
            uint256 _contributionValue,
            uint256 _balance,
            uint256 _memberCount,
            address _admin,
            Mchango.State _state
        ) = mchango.getGroupDetails(1);
        bool isGroupMember = mchango.checkIsGroupMember(1, member2);
        assert(_collateralValue == 1 ether);
        assert(_contributionValue == 0);
        assert(_balance == 0);
        assert(_memberCount == 2);
        assert(_admin == member1);
        assert(_state == groupState);
        assert(isGroupMember);
    }

    function testEnsureJoinGroupRevertsIfAlreadyAMember() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_AlreadyAMember.selector);
        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();
    }

    function testEnsureJoinGroupEmitsEvent() public {
        createGroup();
        createNewMember(member2);

        vm.expectEmit(true, true, false, false);
        emit joinedGroup(member2, 1);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();
    }

    function testEnsureUnsubscribePremiumMemberRevertsIfNotPremiumMember()
        public
        createMember(member1)
    {
        vm.expectRevert(Mchango.Mchango_NotAPremiumSubscriber.selector);
        mchango.unSubscribePremiumMember(member1);
    }

    function testCanUnsubscribePremiumMember() public createMember(member1) {
        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();

        mchango.unSubscribePremiumMember(member1);
        bool isPremiumMember = mchango.isSubscriberPremium(member1);

        assert(isPremiumMember == false);
    }

    function testEnsureUnSubscribePremiumMemberEmitsAnEvent() public {
        createNewMember(member1);

        vm.startPrank(member1);
        mchango.subscribePremium{value: PREMIUM_FEE}();
        vm.stopPrank();

        vm.expectEmit(true, false, false, false);
        emit subscriptionExpired(member1);
        mchango.unSubscribePremiumMember(member1);
    }

    function testEnsureOnlyGroupAdminCanKickMembers() public {
        createGroup();

        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.expectRevert("only admin can call this function");
        vm.startPrank(member3);
        mchango.kickGroupMember(member2, 1);
        vm.stopPrank();
    }

    function testAdminCanKickGroupMembers() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.kickGroupMember(member2, 1);
        vm.stopPrank();

        bool isGroupMember = mchango.checkIsGroupMember(1, member2);
        assert(!isGroupMember);
    }

    function testEnsureKickGroupMemberEmitsAnEvent() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.expectEmit(true, false, false, false);
        emit memberKicked(member2);

        vm.startPrank(member1);
        mchango.kickGroupMember(member2, 1);
        vm.stopPrank();
    }

    function testEnsureContributeRevertsIfGroupStateIsInitialization() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.expectRevert(
            abi.encodeWithSelector(
                Mchango.Mchango_GroupStateError.selector,
                Mchango.State.initialization
            )
        );

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();
    }

    function testEnsureContributeRevertsIfAmountIsInsufficient() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.expectRevert(
            Mchango.Mchango_InsufficientContributionAmount.selector
        );

        vm.startPrank(member2);
        mchango.contribute{value: 0.5 ether}(1);
        vm.stopPrank();
    }

    function testEnsureContributeRevertsIfMemberIsNotAMember() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_NotAGroupMember.selector);
        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();
    }

    function testEnsureGroupBalanceAndContractBalanceUpdatesAccordingly()
        public
    {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        (, , uint256 _balance, , , Mchango.State _state) = mchango
            .getGroupDetails(1);
        Mchango.State expectedState = Mchango.State.contribution;
        uint256 contractBalance = address(mchango).balance;

        assert(_balance == 1 ether);
        assert(contractBalance == 2 ether);
        assert(_state == expectedState);
    }

    function testMemberIsEligibleAfteContributing() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        bool isMemberEligible = mchango.checkIsEligibleMember(1, member2);
        assert(isMemberEligible);
    }

    function testContributeEmitsAnEvent() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.expectEmit(true, true, false, false);
        emit hasDonated(member2, 1 ether);

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();
    }

    function testEnsureOnlyEligibleMembersCanContributeInRotationState()
        public
    {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_NotAnEligibleMember.selector);

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();
    }

    function testEnsureOnlyGroupAdminCanStartRotation() public {
        createGroup();
        createNewMember(member2);

        vm.expectRevert("only admin can call this function");
        vm.startPrank(member2);
        mchango.startRotation(1);
        vm.stopPrank();
    }

    function testEnsureStartRotationRevertsIfGroupStateIsInitialization()
        public
    {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.expectRevert(
            abi.encodeWithSelector(
                Mchango.Mchango_GroupStateError.selector,
                Mchango.State.initialization
            )
        );
        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();
    }

    function testAdminCanStartRotation() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        (, , , , , Mchango.State _state) = mchango.getGroupDetails(1);
        Mchango.State expectedState = Mchango.State.rotation;

        assert(_state == expectedState);
    }

    function testEnsureStartRotationRevertsIfGroupAlreadyInRotationState()
        public
    {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango__GroupAlreadyInRotationState.selector);
        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();
    }

    function testStartRotationEmitsAnEvent() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.expectEmit(true, false, false, false);
        emit inRotationPhase(1);

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();
    }

    function testEnsureOnlyAdminCanDisburse() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectRevert("only admin can call this function");

        vm.startPrank(member2);
        mchango.disburse(1, 1 ether, member2);
        vm.stopPrank();
    }

    function testEnsureDisburseCanOnlyBeCalledInRotationState() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.expectRevert(
            abi.encodeWithSelector(
                Mchango.Mchango_GroupStateError.selector,
                Mchango.State.contribution
            )
        );
        vm.startPrank(member1);
        mchango.disburse(1, 1 ether, member2);
        vm.stopPrank();
    }

    function testEnsureCannotCallDisburseIfAmountisNotEnough() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_NotAllFundsDisbursed.selector);
        vm.startPrank(member1);
        mchango.disburse(1, 0.5 ether, member2);
        vm.stopPrank();
    }

    function testCannotDisburseToAnInEligibleMember() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectRevert(Mchango.Mchango_NotAnEligibleMember.selector);
        vm.startPrank(member1);
        mchango.disburse(1, 1 ether, member3);
        vm.stopPrank();
    }

    function testAdminCanSuccessfullyDisburse() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        uint256 recipientBalanceBefore = address(member2).balance;
        console.log("recipientBalanceBefore: %s", recipientBalanceBefore);

        uint256 contractBalanceBefore = address(mchango).balance;
        console.log("contractBalanceBefore: %s", contractBalanceBefore);

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.disburse(1, 1 ether, member2);
        vm.stopPrank();

        uint256 contractBalanceAfter = address(mchango).balance;
        console.log("contractBalanceAfter: %s", contractBalanceAfter);

        uint256 recipientBalanceAfter = address(member2).balance;
        console.log("recipientBalanceAfter: %s", recipientBalanceAfter);

        (, , uint256 _balance, , , Mchango.State _state) = mchango
            .getGroupDetails(1);
        Mchango.State expectedState = Mchango.State.rotation;

        assert(_balance == 0);
        assert(_state == expectedState);
    }

    function testEnsureDisburseEmitsAnEvent() public {
        createGroup();
        createNewMember(member2);

        vm.startPrank(member2);
        mchango.joinGroup{value: 1 ether}(member2, 1, 1 ether, 1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startContribution(1, 1 ether);
        vm.stopPrank();

        vm.startPrank(member2);
        mchango.contribute{value: 1 ether}(1);
        vm.stopPrank();

        vm.startPrank(member1);
        mchango.startRotation(1);
        vm.stopPrank();

        vm.expectEmit(true, true, false, false);
        emit hasReceivedFunds(member2, 970000000000000000);

        vm.startPrank(member1);
        mchango.disburse(1, 1 ether, member2);
        vm.stopPrank();
    }

    function testEnsureOnlyOwnerCanSetPremiumFee() public {
        vm.expectRevert("Only owner can call this function");
        vm.startPrank(member1);
        mchango.setPremiumFee(1 ether);
        vm.stopPrank();
    }

    function testOwnerCanSetPremiumFee() public {
        vm.startPrank(User);
        mchango.setPremiumFee(1 ether);
        vm.stopPrank();
    }

    function testSetPremiumFeeEmitsAnEvent() public {
        vm.expectEmit(true, true, false, false);
        emit premiumFeeUpdated(User, 1 ether);

        vm.startPrank(User);
        mchango.setPremiumFee(1 ether);
        vm.stopPrank();
    }
}
