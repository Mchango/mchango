// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DeployMchango} from "../../script/Mchango.s.sol";
import {Mchango} from "../../src/Mchango.sol";

contract MchangoTest is Script {
    /**Errors */
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

    function testConstructorValuesAreProperlyInitialized() external view  {
        uint256 _premiumFee = mchango.premiumFee();
        address _owner = mchango.Owner();

        bool isOwnerPremium = mchango.isSubscriberPremium(_owner);

        assert(_premiumFee == PREMIUM_FEE);
        assert(isOwnerPremium == true);
    }

}
