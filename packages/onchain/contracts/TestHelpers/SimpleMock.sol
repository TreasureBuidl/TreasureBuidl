// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleMock {
    
    function swapTokens(
        address _token0,
        address _token1,
        uint256 _amount0,
        uint256 _amount1
    )
        external 
    {
        require(
            IERC20(_token0).balanceOf(msg.sender) >= _amount0,
            "Sender does not own enough tokens"
        );
    }
}