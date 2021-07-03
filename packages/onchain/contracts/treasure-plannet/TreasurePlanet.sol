// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "../treasure-maps/TreasureMaps.sol";
import "./ModifiedOwnership.sol";
// Receiver for ERC721
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// Receiver for ERC1155
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

/**
 * @author  @vonie610 (Twitter & Telegram) | @Nicca42 (GitHub)
 * @notice  This contract allows for the storage of ERC 20 | 721 | 1155 so long
 *          they do not require smart receiver hooks. 
 *          // FUTURE allow for future standard hooks to be implemented?
 */
contract TreasurePlanet is ModifiedOwnership, IERC721Receiver, IERC1155Receiver {
    TreasureMaps public maps_;

    bytes4 private constant _INTERFACE_ID_ERC721 = bytes4(
        keccak256(
            "onERC721Received(address,address,uint256,bytes)"
        )
    );
    bytes4 private constant _INTERFACE_ID_ERC1155 = bytes4(
        keccak256(
            "onERC1155Received(address,address,uint256,uint256,bytes)"
        )
    );
    bytes4 private constant _INTERFACE_ID_ERC1155_BATCH = bytes4(
        keccak256(
            "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"
        )
    );

    /**
     * @param   _treasureMaps Address of the treasure map contract. 
     */
    constructor(
        address _treasureMaps,
        address _ownerTokenInstance,
        uint256 _ownerTokenID
    ) 
        ModifiedOwnership(
            _ownerTokenInstance,
            _ownerTokenID
        )
        public
    {
        maps_ = TreasureMaps(_treasureMaps);
    }

    /**
     * @param   _mapToken ID for the map token. 
     * @notice  Allows the treasure planet to hold any asset that doesn't 
     *          require specific smart contract receiver hooks. 
     */
    function execute(
        uint256 _mapToken
    )
        external
        onlyOwner()
    {
        (
            address[] memory callTargets,
            uint256[] memory callValues,
            bytes[] memory callData
        ) = maps_.getTreasureMap(_mapToken);
        
        require(
            callTargets.length != 0,
            "Map does not exist"
        );

        // Executing map instructions
        for (uint i = 0; i < callTargets.length; i++) {
            (bool success, bytes memory returnData) = callTargets[i].call{
                    value: callValues[i]
                }(
                    callData[i]
                );
            require(success, "MAP: Exploration failed");
        }
    }

    function supportsInterface(
        bytes4 _interfaceId
    ) 
        external 
        view 
        override 
        returns(bool) 
    {
        if(_interfaceId == _INTERFACE_ID_ERC721) {
            return true;
        } else if(_interfaceId == _INTERFACE_ID_ERC1155) {
            return true;
        } else if(_interfaceId == _INTERFACE_ID_ERC1155_BATCH) {

        } else {
            return false;
        }
    }

    function onERC721Received(
        address operator, 
        address from, 
        uint256 tokenId, 
        bytes calldata data
    ) 
        external 
        override
        returns(bytes4) 
    {
        return _INTERFACE_ID_ERC721;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external
        override
        returns(bytes4) 
    {
        return _INTERFACE_ID_ERC1155;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
        external
        override
        returns(bytes4)
    {
        return _INTERFACE_ID_ERC1155_BATCH;
    }
}