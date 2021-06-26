// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "../TestHelpers/SimpleMock.sol";

library TestWrapper {

    function callWrapped(
        address _wrapped,
        address[2] calldata _tokens,
        uint256[2] calldata _amounts
    ) public {
        SimpleMock wrapped_ = SimpleMock(_wrapped);

        wrapped_.swapTokens(
            _tokens[0],
            _tokens[1],
            _amounts[0],
            _amounts[1]
        );
    }
}