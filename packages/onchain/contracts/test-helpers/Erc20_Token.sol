// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Erc20_Token is ERC20 {
    constructor(
        string memory name_, 
        string memory symbol_
    ) ERC20(name_, symbol_) {

    }

    function mint(address _to, uint256 _amount) external returns(bool){
        _mint(_to, _amount);

        return true;
    }
}