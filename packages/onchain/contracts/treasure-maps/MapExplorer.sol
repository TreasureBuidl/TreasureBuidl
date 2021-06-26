// SPDX-License-Identifier: MIT

// pragma solidity 0.8.0;

// import "./TreasureMaps.sol";

// library MapExplorer {
//     // Storage for treasure map information.
//     struct TreasureMap {
//         // The address that added this treasure map.
//         address creator;
//         // Cost in native tokens to explore this map.
//         uint256 callValueTotal;
//         // Array of target contract addresses.
//         address[] callTargets;
//         // Array of encoded function signature and parameters for execution at 
//         // target.
//         bytes[] callData;
//         // Array of `msg.value`'s for target calls. 
//         uint[] callValues;
//         // Count of all users who have execute map instructions.
//         uint256 explores;
//         // // If the map is active.
//         // bool activeMap;
//         // // If the map has a fee.
//         // uint256 mapFee;
//     }
    
//     function executeMap(
//         address _treasureMaps,
//         uint256 _mapID
//     )
//         external
//     {
//         // TODO this code would be inside the escrow protected by onlyOwner
//         // Might be able to use a library here, but then issue is passing along
//         // all this data between maps and explorer increases the stack depth,
//         // don't need to add any unnecessary clutter or gas consumption.

//         (
//             uint256 callValueTotal,
//             address[] memory callTargets,
//             bytes[] memory callData,
//             uint[] memory callValues
//         ) = TreasureMaps(_treasureMaps).exploreMap(
//             _mapID
//         );
//         // // Ensures the map exists
//         // require(
//         //     map.creator != address(0),
//         //     "MAP: Map does not exist"
//         // );
        
//         // // Executing map instructions
//         // for (uint i = 0; i < map.callTargets.length; i++) {
//         //     (bool success, bytes memory returnData) = map.callTargets[i].call{
//         //         value: map.callValues[i]
//         //     }(
//         //         map.callData[i]
//         //     );
//         //     require(success, "MAP: Exploration failed");
//         // }


//     }
// }