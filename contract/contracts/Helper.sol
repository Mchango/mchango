// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Helper {
    function stringToBytes32(
        string memory _string
    ) internal pure returns (bytes32) {
        bytes32 result;
        assembly {
            result := mload(add(_string, 32))
        }
        return result;
    }

    function removeIndex(uint _id, address[] storage _array) internal {
        for (uint i = _id; i < _array.length - 1; i++) {
            _array[i] = _array[i + 1];
        }

        _array.pop();
    }
}
