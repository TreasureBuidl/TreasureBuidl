pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnershipToken is ERC721, Ownable {
  // counter for latest token id
  uint256 public tokenIds;

  // maps a token id to the treasury that it owns
  mapping (uint => address) public tokenIdToTreasury;

  constructor() ERC721("TreasuryOwner", "OWN") {}

  function mint(address _to, address _ownedTreasury) external onlyOwner {
    tokenIds++;
    _mint(_to, tokenIds);
    tokenIdToTreasury[_tokenId] = _ownedTreasury;
  }
}