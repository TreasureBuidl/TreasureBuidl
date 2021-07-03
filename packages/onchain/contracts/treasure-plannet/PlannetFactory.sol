// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "./TokenOwnership.sol";
import "./TreasurePlanet.sol";

/**
 * @author  @vonie610 (Twitter & Telegram) | @Nicca42 (GitHub)
 * @dev     Deploys and sets up all the required links. Mints an ownership token
 *          for each deployed planet. 
 * @notice  This contract allows for single transaction deployment of a treasure
 *          planet. 
 * 
 *          !! Transferring the ownership token transfers ownership rights to 
 *          the planet. 
 */
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

    /**
     * @notice  Mints an ownership token to the caller, then deploys a treasure
     *          planet. After deployment this function will then link the 
     *          ownership token to the deployed planet. 
     * 
     *          !! Transferring the ownership token transfers ownership rights 
     *          to the planet. 
     */
    function createTreasurePlanet() external {
        uint256 tokenID = tokenOwnership_.mintOwnershipToken(msg.sender);

        TreasurePlanet treasurePlanet = new TreasurePlanet(
            treasureMaps_,
            address(tokenOwnership_),
            tokenID
        );

        tokenOwnership_.linkOwnershipToken(
            tokenID,
            address(treasurePlanet)
        );

        emit TreasurePlanetCreated(
            msg.sender,
            tokenID,
            address(treasurePlanet)
        );
    }
}