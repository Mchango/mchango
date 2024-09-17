// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DeployMchango} from "../../script/Mchango.s.sol";
import {Mchango} from "../../src/Mchango.sol";

contract MchangoTest is Script {
    /**Errors */
    error Mchango_InsufficientContributionAmount();
    error Mchango_InsufficientAmountForPremiumService();
    error Mchango_NotAMember();
    error Mchango_NotAGroupMember();
    error Mchango_NotAnEligibleMember();
    error Mchango__GroupAlreadyInRotationState();
    error Mchango_NotAllFundsDisbursed();
    error Mchango_BlankCompliance();

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

    function testConstructorValuesAreProperlyInitialized() external view  {
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

    function testEventIsEmittedAfterSuccessfulMemberCreation() external  {
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

    function testSubscribePremiumRevertsIfCallerIsNotAMember() external  {
        vm.expectRevert(Mchango.Mchango_NotAMember.selector);

        vm.startPrank(member2);
        mchango.subscribePremium{value: 2 ether}();
        vm.stopPrank();
    }

}
