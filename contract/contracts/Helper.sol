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

    function calculateIndexToRemove(
        address _addressToRemove,
        address[] storage _array
    ) internal view returns (uint indexToRemove) {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _addressToRemove) {
                indexToRemove = i;
            }
        }
    }

    function shiftAndRemoveIndex(uint _id, address[] storage _array) internal {
        for (uint i = _id; i < _array.length - 1; i++) {
            _array[i] = _array[i + 1];
        }

        _array.pop();
    }

    function removeAddress(
        address _addressToRemove,
        address[] storage _array
    ) internal {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _addressToRemove) {
                _array[i] = _array[_array.length - 1];
            }
            _array.pop();
        }
    }

    function shiftAndRemoveAddress(
        address _addressToRemove,
        address[] storage _array
    ) internal {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] == _addressToRemove) {
                _array[i] = _array[i + 1];
            }
            _array.pop();
        }
    }
}
