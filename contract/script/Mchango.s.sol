// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {Mchango} from "../src/Mchango.sol";
import {Script} from "forge-std/Script.sol";

contract DeployMchango is Script {
    uint256 private constant premiumFee = 2 ether;

    function run() external returns (Mchango) {
        Mchango mchango;

        vm.startBroadcast();
        mchango = new Mchango(premiumFee, address(1), address(3));
        vm.stopBroadcast();

        return mchango;
    }
}