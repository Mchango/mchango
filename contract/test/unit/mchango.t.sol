// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DeployMchango} from "../../script/Mchango.s.sol";
import {Mchango} from "../../src/Mchango.sol";

contract MchangoTest is Script {
    /**Errors */
    error Mchango_InsufficientContributionAmount();
    error Mchango_InsufficientAmountForPremiumService();
    error Mchango_AlreadyAPremiumSubscriber();
    error Mchango_NotAMember();
    error Mchango_NotAGroupMember();
    error Mchango_NotAnEligibleMember();
    error Mchango__GroupAlreadyInRotationState();
    error Mchango_NotAllFundsDisbursed();
    error Mchango_BlankCompliance();
    error Mchango_NotEnoughReputation();

    /**Events */
    event hasSubscribed(
        address indexed _address,
        uint256 indexed _subscriptionAmount
    );
    event memberCreated(address indexed _member, uint256 indexed _id);
    event memberKicked(address indexed _memberAddress);
    event hasCreatedGroup(address indexed _address, uint256 indexed _id);
    event joinedGroup(address indexed _participant, uint256 indexed _id);
    event hasDonated(address indexed _participant, uint256 indexed _amount);
    event hasReceivedFunds(address indexed _participant, uint256 indexed _amount);
    event subscriptionExpired(address indexed _subscriber);
    event inRotationPhase(uint _id);
    event premiumFeeUpdated(address indexed _address, uint256 indexed _fee);

    /**State & Variables */
    Mchango public mchango;
    DeployMchango public deployer;
    address public User = makeAddr("3illBaby");
    address public member1 = makeAddr("3illBaby1");
    address public member2 = makeAddr("3illBaby2");
    address public member3 = makeAddr("3illBaby3");
    uint256 public constant PREMIUM_FEE = 2 ether;
    uint256 public constant COLLATERAL_VALUE_IN_USD = 100;

    function setUp() public {
        vm.startBroadcast();
        deployer = new DeployMchango();
        vm.stopBroadcast();


        mchango = deployer.run();


        vm.deal(User, 100 ether);
        vm.deal(member1, 100 ether);
        vm.deal(member2, 100 ether);
        vm.deal(member3, 100 ether);
    }

    modifier createMember(address _address) {
        vm.startPrank(_address);
        mchango.createMember(_address);
        vm.stopPrank();
        _;
    }

    function subscribePremium() internal createMember(member1) {
        vm.startPrank(member1);
        mchango.subscribePremium{value: 2 ether}();
        vm.stopPrank();
    }

    function testConstructorValuesAreProperlyInitialized() external view {
        uint256 _premiumFee = mchango.premiumFee();
        address _owner = mchango.Owner();

        bool isOwnerPremium = mchango.isSubscriberPremium(_owner);

        assert(_premiumFee == PREMIUM_FEE);
        assert(isOwnerPremium == true);
    }

    function testCreateMemberRevertsIfAddressIsBlank() external {
        vm.expectRevert(Mchango.Mchango_BlankCompliance.selector);

        vm.startPrank(member1);
        mchango.createMember(address(0));
    }

    function testEnsureFieldsAreUpdatedAfterMemberCreation() external createMember(member1) {
        uint256 _memberCounter = mchango.memberCounter();
        bool isMember = mchango.isMember(member1);
        (uint256 _memberId, address _memberAddress) = mchango.returnMemberDetails(member1);

        assert(_memberCounter == _memberId);
        assert(isMember == true);
        assert(_memberAddress == member1);
    }

    function testEventIsEmittedAfterSuccessfulMemberCreation() external {
        vm.expectEmit(true, true, false, false);
        emit memberCreated(member1, 1);

        vm.startPrank(member1);
        mchango.createMember(member1);
        vm.stopPrank();
    }

    function testSubscribePremiumRevertsWithWrongValue() external createMember(member1) {
        vm.expectRevert(Mchango.Mchango_InsufficientAmountForPremiumService.selector);

        vm.startPrank(member1);
        mchango.subscribePremium{value: 1 ether}();
        vm.stopPrank();

    }

    function testSubscribePremiumRevertsIfCallerIsNotAMember() external {
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member2);
        mchango.subscribePremium{value: 2 ether}();
        vm.stopPrank();
    }

    function testSubscribePremiumProperlyExecutes() external {
        subscribePremium();

        bool _isPremiumSubscriber = mchango.isSubscriberPremium(member1);
        assert(_isPremiumSubscriber == true);
    }

    function testSubscribePremiumRevertsIfAlreadySubscribed() external {
        subscribePremium();

        vm.expectRevert(Mchango.Mchango_AlreadyAPremiumSubscriber.selector);

        vm.startPrank(member1);
        mchango.subscribePremium{value: 2 ether}();
        vm.stopPrank();
    }

    function testUnsubscribePremiumRevertsIfAddressNotAMember() external {
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member1);
        mchango.unSubscribePremiumMember(member1);
        vm.stopPrank();
    }

    function testUnsubscribePremiumRevertsIfAddressNotAPremiumMember() external createMember(member1) {
        vm.expectRevert(Mchango.Mchango_NotAPremiumSubscriber.selector);

        vm.startPrank(member1);
        mchango.unSubscribePremiumMember(member1);
        vm.stopPrank();
    }

    function testUnsubscribePremiumSetsPremiumValueToFalse() external {
        subscribePremium();

        vm.startPrank(member1);
        mchango.unSubscribePremiumMember(member1);
        vm.stopPrank();

        bool _isPremiumSubscriber = mchango.isSubscriberPremium(member1);
        assert(_isPremiumSubscriber == false);
    }

    function testUnsubscribePremiumEmitsEvent() external {
        subscribePremium();

        vm.expectEmit(true, false, false, false);
        emit subscriptionExpired(member1);

        vm.startPrank(member1);
        mchango.unSubscribePremiumMember(member1);
        vm.stopPrank();

    }

    function testCreateGroupRevertsIfNotAMember() external {
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member1);
        mchango.createGroup(COLLATERAL_VALUE_IN_USD);
        vm.stopPrank();
    }

    function createGroup() internal createMember(member1) {
        vm.startPrank(member1);
        mchango.createGroup(COLLATERAL_VALUE_IN_USD);
        vm.stopPrank();
    }

    function testCreateGroupSuccessfullySetsValues() external {
        createGroup();

        uint256 _groupCount = mchango.counter();
        (address _admin, uint256 _collateral, uint256 _balance, uint256 _memberCounter) = mchango.getGroupDetails(1);
        bool _isGroupMember = mchango.isGroupMember(member1, 1);
        bool _isGroupAdmin = mchango.isGroupAdmin(member1, 1);

        console.log('is group member', _isGroupMember);
        console.log('collateral value', _collateral);
        console.log('group balance', _balance);
        console.log('member counter', _memberCounter);
        console.log('admin address', _admin);

        assert(_groupCount == 1);
        assert(_admin == member1);
        assert(_collateral == COLLATERAL_VALUE_IN_USD);
        assert(_balance == 0);
        assert(_memberCounter == 1);
        assert(_isGroupMember == true);
        assert(_isGroupAdmin == true);
    }

    function testCreateGroupEmitsAnEvent() external createMember(member1) {
        vm.expectEmit(true, true, false, false);
        emit hasCreatedGroup(member1, 1);

        vm.startPrank(member1);
        mchango.createGroup(COLLATERAL_VALUE_IN_USD);
        vm.stopPrank();

    }

    function testJoinGroupRevertsIfNotAMember() external {
        createGroup();

        address _tokenAddress = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
        uint256 _id = 2;
        uint256 _reputationPoint = 2;

        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member2);
        mchango.joinGroup(member2, _tokenAddress, _id, _reputationPoint);
        vm.stopPrank();
    }

    function testJoinGroupRevertsIfGroupIdIsWrong() external createMember(member2)  {
        createGroup();

        address _tokenAddress = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
        uint256 _id = 5;
        uint256 _reputationPoint = 3;

        vm.expectRevert();

        vm.startPrank(member2);
        mchango.joinGroup(member2, _tokenAddress, _id, _reputationPoint);
        vm.stopPrank();

    }

    function testJoinGroupRevertsIfReputationIsLessThan1() external createMember(member2) {
        createGroup();

        address _tokenAddress = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
        uint256 _id = 1;
        uint256 _reputationPoint = 0;

        vm.expectRevert(Mchango.Mchango_NotEnoughReputation.selector);

        vm.startPrank(member2);
        mchango.joinGroup(member2, _tokenAddress, _id, _reputationPoint );
        vm.stopPrank();
    }

    function testKickGroupMemberRevertsIfAddressIsNotAMember() external {
        createGroup();

        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member1);
        mchango.kickGroupMember(member2, 1);
        vm.stopPrank();
    }

    function testKickGroupMemberFailsIfCallerIsNotAdmin() external createMember(member2) {
        createGroup();

        vm.expectRevert();

        vm.startPrank(member2);
        mchango.kickGroupMember(member1, 1);
        vm.stopPrank();
    }

}
