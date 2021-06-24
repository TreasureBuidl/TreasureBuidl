pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

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
contract TreasureMaps is ERC721 {
    // Counter for unique loot IDs.
    uint256 public mapIDs_;
    // Storage for treasure map information.
    struct TreasureMap {
        // The address that added this treasure map.
        address creator;
        // Cost in native tokens to explore this map.
        uint256 callValueTotal;
        // Array of target contract addresses.
        address[] callTargets;
        // Array of encoded function signature and parameters for execution at 
        // target.
        bytes[] callData;
        // Array of `msg.value`'s for target calls. 
        uint[] callValues;
        // Count of all users who have execute map instructions.
        uint256 explores;
        // // If the map is active.
        // bool activeMap;
        // // If the map has a fee.
        // uint256 mapFee;
    }
    // Map IDs to treasure map instructions.
    mapping(uint256 => TreasureMap) public treasureMaps_;

    event TreasureMapAdded(
        address indexed creator,
        uint256 indexed mapID,
        string description,
        address[] callTargets,
        bytes[] callData,
        uint[] callValues
    );

    event MapExplored(
        address indexed explorer,
        uint256 indexed mapID
    );

    constructor() ERC721("Treasure Maps", "tMAP") {

    }

    function exploreMap(uint256 _mapID) public returns(
        uint256,
        address[] memory,
        bytes[] memory,
        uint[] memory
    ) {
        // Noting exploration.
        treasureMaps_[_mapID].explores += 1;
        // Emitting exploration.
        emit MapExplored(
            msg.sender,
            _mapID
        );

        return (
            treasureMaps_[_mapID].callValueTotal,
            treasureMaps_[_mapID].callTargets,
            treasureMaps_[_mapID].callData,
            treasureMaps_[_mapID].callValues
        );
    }

    /**
     * @param   _targetAddr Array of target contract addresses.
     * @param   _functionSig Array of targeted function signatures at matching 
     *          address.
     * @param   _callData Array of encoded parameters for function at target.
     * @param   _callValues Array of `msg.value`'s for target calls.
     */
    function createTreasureMap(
        string calldata _description,
        address[] calldata _targetAddr,
        string[] calldata _functionSig,
        bytes[] calldata _callData,
        uint[] calldata _callValues
    )
        external
        returns(uint256 mapID)
    {
        require(
            _targetAddr.length == _functionSig.length &&
            _functionSig.length == _callData.length &&
            _callData.length == _callValues.length,
            "MAP: Array lengths mismatch"
        );
        // Incrementing the counter for maps created.
        mapIDs_ += 1;
        // Returning map ID.
        mapID = mapIDs_;
        // Counter for map native token cost.
        uint256 callCost;
        // Storage for encoded function calls.
        bytes[] memory generatedCallData;
        // Transforming data for efficient storage.
        for (uint256 i = 0; i < _targetAddr.length; i++) {
            // Encoding function calls (signature and data)
            generatedCallData[i] = abi.encodePacked(
                bytes4(keccak256(bytes(_functionSig[i]))), 
                _callData[i]
            );
            callCost += _callValues[i];
        }
        // Storing the new map.
        treasureMaps_[mapID] = TreasureMap({
            creator: msg.sender,
            callValueTotal: callCost,
            callTargets: _targetAddr,
            callData: generatedCallData,
            callValues: _callValues,
            explores: 0
        });
        // Emitting data.
        emit TreasureMapAdded(
            msg.sender,
            mapID,
            _description,
            _targetAddr,
            generatedCallData,
            _callValues
        );
    }

    function executeMap(
        address _treasureMaps,
        uint256 _mapID
    )
        external
    {
        // TODO this code would be inside the escrow protected by onlyOwner
        // Need testing, might want it here so you can call delegate call
        // from the escrow allowing for context correct execution. 
        (
            uint256 callValueTotal,
            address[] memory callTargets,
            bytes[] memory callData,
            uint[] memory callValues
        ) = TreasureMaps(_treasureMaps).exploreMap(
            _mapID
        );
        // // Ensures the map exists
        // require(
        //     map.creator != address(0),
        //     "MAP: Map does not exist"
        // );
        
        // // Executing map instructions
        // for (uint i = 0; i < map.callTargets.length; i++) {
        //     (bool success, bytes memory returnData) = map.callTargets[i].call{
        //         value: map.callValues[i]
        //     }(
        //         map.callData[i]
        //     );
        //     require(success, "MAP: Exploration failed");
        // }


    }
}