// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Erc721_Token is ERC721 {

    uint256 private count;
    constructor(
        string memory name_, 
        string memory symbol_
    ) ERC721(name_, symbol_) {

    }

    function mint(address _to) external returns(bool){
        count += 1;
        _mint(_to, count);

        return true;
    }
}