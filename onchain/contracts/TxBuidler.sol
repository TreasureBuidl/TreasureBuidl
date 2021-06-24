pragma solidity 0.8.0;

import "./Wrappers/TestWrapper.sol";

contract TxBuidler {
    TestWrapper internal wrapper_;

    constructor(address _wrapper) {
        wrapper_ = TestWrapper(_wrapper);
    }


    function callWrapper(
        address _wrapped,
        address[2] calldata _tokens,
        uint256[2] calldata _amounts
    ) 
        external
    {
        wrapper_.callWrapped(
            _wrapped,
            _tokens,
            _amounts
        );
    }
}