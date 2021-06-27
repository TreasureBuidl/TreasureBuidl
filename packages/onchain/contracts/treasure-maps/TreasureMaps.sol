// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "./ModifiedErc721.sol";

/**
 * @author  @vonie610 (Twitter & Telegram) | @Nicca42 (GitHub)
 *  @title  TreasureMaps is an NFT that facilitates the storage and execution of
 *          treasure maps! Treasure maps are stored execution maps for 
 *          multistep onchain interactions. 
 * @notice  Treasure Maps can be created by anyone. Do not assume any level of 
 *          security measures have been taken place, and that all maps are 
 *          insecure until proven otherwise. Crypto is a wild place, look out 
 *          for yourself! 
 */
contract TreasureMaps is ModifiedErc721 {
    // Counter for unique token IDs.
    uint256 public tokenCount_;

    // Storage for the two token types within this system.
    bytes32 constant TREASURE_MAP = bytes32(keccak256("TREASURE_MAP"));
        // Treasure maps contain the targets and target function signatures.
    // Storage for treasure map information.
    struct TreasureMap {
        // The address that added this treasure map.
        address creator;
        // Array of target contract addresses.
        address[] callTargets;
        // Array of encoded function signature for execution at target.
        string[] callFunctionSigs;
        // Count of all users who have execute map instructions.
        uint256 explores;
        // // If the map is active.
        // bool activeMap;
        // // If the map has a fee.
        // uint256 mapFee;
    }
    // Token IDs (type TREASURE_MAP) to treasure map instructions.
    mapping(uint256 => TreasureMap) public treasureMaps_;

    bytes32 constant COORDINATES = bytes32(keccak256("COORDINATES"));
        // Coordinates contain the function parameters and call native values.
    struct Coordinates {
        // Cost in native tokens to explore this map.
        uint256 callValueTotal;
        // Array of parameters for execution with function.
        bytes[] callData;
        // Array of `msg.value`'s for target calls. 
        uint[] callValues;
    }
    // Token IDs (type COORDINATES) to coordinate details.
    mapping(uint256 => Coordinates) public treasureCoordinates_;

    // event TreasureMapAdded(
    //     address indexed creator,
    //     uint256 indexed mapID,
    //     string description,
    //     address[] callTargets,
    //     bytes[] callData,
    //     uint[] callValues
    // );

    // event MapExplored(
    //     address indexed explorer,
    //     uint256 indexed mapID
    // );

    event Testing(uint256 mapID, uint256 coordinatesID);

    constructor() ModifiedErc721("Treasure Maps", "tMAP") {

    }

    /**
     * @param   _targetAddr Array of target contract addresses.
     * @param   _functionSig Array of targeted function signatures at matching 
     *          address.
     * @param   _callData Array of encoded parameters for function at target.
     * @param   _callValues Array of `msg.value`'s for target calls.
     * @return  treasureMapID The token ID for the treasure map created.
     * @return  coordinatesID The token ID for the coordinates created.
     */
    function createTreasure(
        string calldata _description,
        address[] calldata _targetAddr,
        string[] calldata _functionSig,
        bytes[] calldata _callData,
        uint[] calldata _callValues
    )
        external
        returns(uint256 treasureMapID, uint256 coordinatesID)
    {
        treasureMapID = _addMap(
            msg.sender,
            _targetAddr,
            _functionSig
        );

        coordinatesID = _addCoordinates(
            msg.sender,
            _callData,
            _callValues
        );
        // TODO Emitting data. 
        emit Testing(treasureMapID, coordinatesID);
    }

    // function exploreMap(uint256 _mapID) public returns(
    //     uint256,
    //     address[] memory,
    //     bytes[] memory,
    //     uint[] memory
    // ) {
    //     // Noting exploration.
    //     treasureMaps_[_mapID].explores += 1;
    //     // Emitting exploration.
    //     emit MapExplored(
    //         msg.sender,
    //         _mapID
    //     );

    //     return (
    //         treasureMaps_[_mapID].callValueTotal,
    //         treasureMaps_[_mapID].callTargets,
    //         treasureMaps_[_mapID].callData,
    //         treasureMaps_[_mapID].callValues
    //     );
    // }

    function executeMap(
        uint256 _treasureMap,
        uint256 _treasureCoordinates
    )
        external
    {
        // TODO this code would be inside the escrow protected by onlyOwner
        // Need testing, might want it here so you can call delegate call
        // from the escrow allowing for context correct execution. 
        // (
        //     uint256 callValueTotal,
        //     address[] memory callTargets,
        //     bytes[] memory callData,
        //     uint[] memory callValues
        // ) = TreasureMaps(_treasureMaps).exploreMap(
        //     _mapID
        // );
        // // Ensures the map exists
        // require(
        //     map.creator != address(0),
        //     "MAP: Map does not exist"
        // );

        require(
            treasureMaps_[_treasureMap].creator != address(0),
            "Map does not exist"
        );

        TreasureMap memory map = treasureMaps_[_treasureMap];
        Coordinates memory coords = treasureCoordinates_[_treasureCoordinates];
        
        require(
            map.callTargets.length == coords.callData.length,
            "MAP: Coords and map mismatch"
        );
        // TODO the coordinates should know what map they can be used on

        // Storage for encoded function calls.
        bytes[] memory generatedCallData;
        // Transforming data for efficient storage.
        for (uint256 i = 0; i < map.callTargets.length; i++) {
            // Encoding function calls (signature and data)
            generatedCallData[i] = abi.encodePacked(
                bytes4(keccak256(bytes(map.callFunctionSigs[i]))), 
                coords.callData[i]
            );
        }
        
        // Executing map instructions
        for (uint i = 0; i < map.callTargets.length; i++) {
            (bool success, bytes memory returnData) = map.callTargets[i].call{
                value: coords.callValues[i]
            }(
                generatedCallData[i]
            );
            require(success, "MAP: Exploration failed");
        }
    }

    function _addMap(
        address _creator,
        address[] calldata _callTargets,
        string[] calldata _functionSigs
    )
        internal 
        returns(uint256 tokenID)
    {
        require(
            _callTargets.length == _functionSigs.length,
            "MAP: Array lengths differ"
        );

        tokenCount_ += 1;
        tokenID = tokenCount_;

        treasureMaps_[tokenID] = TreasureMap({
            creator: _creator,
            callTargets: _callTargets,
            callFunctionSigs: _functionSigs,
            explores: 0
        });

        _mint(TREASURE_MAP, _creator, tokenID);
    }

    function _addCoordinates(
        address _creator,
        bytes[] calldata _callData,
        uint256[] calldata _callValues
    )
        internal
        returns(uint256 tokenID)
    {
        require(
            _callData.length == _callValues.length,
            "MAP: Array lengths differ"
        );

        tokenCount_ += 1;
        tokenID = tokenCount_;

        // Counter for map native token cost.
        uint256 callCost;
        // Transforming data for efficient storage.
        for (uint256 i = 0; i < _callData.length; i++) {
            callCost += _callValues[i];
        }

        treasureCoordinates_[tokenID] = Coordinates({
            callValueTotal: callCost,
            callData: _callData,
            callValues: _callValues
        });

        _mint(COORDINATES, _creator, tokenID);
    }
}