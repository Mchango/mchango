// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {Mchango} from "../src/Mchango.sol";
import {Script} from "forge-std/Script.sol";

contract DeployMchango is Script {
    uint256 private constant premiumFee = 2 ether;

    function run(address _owner) public returns (Mchango) {
        Mchango mchango;

        vm.startBroadcast();
        mchango = new Mchango(premiumFee, _owner);
        vm.stopBroadcast();

        return mchango;
    }
}
