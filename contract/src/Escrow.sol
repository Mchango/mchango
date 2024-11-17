pragma solidity ^0.8.19;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Escrow {
    address private owner;
    uint256 private immutable DRAIN_PERCENTAGE = 1;

    event AddressChanged(address indexed _newAddress, address indexed _caller);
    event CollateralReleased(address indexed _to, uint256 indexed _amount);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'Unauthorized');
        _;
    }

    function updateAdminAddress(address _address) external onlyOwner {
        owner = _address;
        emit AddressChanged(_address, msg.sender);
    }

    function releaseCollateral(address _to, uint256 _amount, address _tokenAddress) external onlyOwner {
        require(_amount < address(this).balance, 'invalid amount');
        IERC20 token = IERC20(_tokenAddress);
        uint256 tax = (_amount * DRAIN_PERCENTAGE) / 100;

        uint256 amountAfterTax = _amount - tax;

        token.transfer(_to, amountAfterTax);
        emit CollateralReleased(_to, amountAfterTax);
    }
}