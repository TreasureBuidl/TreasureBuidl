// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "./TokenOwnership.sol";
import "./TreasurePlanet.sol";

contract PlanetFactory {
    TokenOwnership public tokenOwnership_;
    address public treasureMaps_;

    event TreasurePlanetCreated(
        address indexed creator,
        uint256 indexed tokenID,
        address indexed planet
    );

    constructor(
        address _tokenOwnership,
        address _treasureMaps
    ) {
        tokenOwnership_ = TokenOwnership(_tokenOwnership);
        treasureMaps_ = _treasureMaps;
    }

    function createTreasurePlanet() external {
        uint256 tokenID = tokenOwnership_.mintOwnershipToken(msg.sender);

        address treasurePlanet = address(new TreasurePlanet(
            treasureMaps_,
            address(tokenOwnership_),
            tokenID
        ));

        tokenOwnership_.linkOwnershipToken(
            tokenID,
            treasurePlanet
        );

        emit TreasurePlanetCreated(
            msg.sender,
            tokenID,
            treasurePlanet
        );
    }
}