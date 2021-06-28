// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "../treasure-maps/TreasureMaps.sol";

// TODO allows for delegated execution of maps with coordinates 

contract TreasurePlanet {
    TreasureMaps public maps_;

    constructor(address _mapToken) {
        maps_ = TreasureMaps(_mapToken);
    }

    // function execute(uint256 _mapID) public {
    //     // Doesn't work because storage layouts need to be idential in 
    //     // delegatecall'ed contract 
    //     maps_.delegatecall(
    //         abi.encodeWithSignature(
    //             "executeMap(uint256)", 
    //             _mapID
    //         )
    //     );
    // }

    function execute(
        uint256 _mapToken
    )
        external
    {
        (
            address[] memory callTargets,
            uint256[] memory callValues,
            bytes[] memory callData
        ) = maps_.getCoordinates(_mapToken);
        
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
}