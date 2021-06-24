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
        // Array of target contract addresses.
        address[] targetAddresses;
        // Array of targeted function signatures at matching address.
        string[] functionSignatures;
        // Array of encoded parameters for function at target.
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
        address[] targetAddresses,
        string[] functionSignatures,
        bytes[] callData,
        uint[] callValues
    );

    event MapExplored(
        address indexed explorer,
        uint256 indexed mapID
    );

    constructor() ERC721("Treasure Maps", "tMAP") {

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
        // Storing the new map.
        treasureMaps_[mapID] = TreasureMap({
            creator: msg.sender,
            targetAddresses: _targetAddr,
            functionSignatures: _functionSig,
            callData: _callData,
            callValues: _callValues,
            explores: 0,
            activeMap: true
        });
        // Emitting data.
        emit TreasureMapAdded(
            msg.sender,
            mapID,
            _description,
            _targetAddr,
            _functionSig,
            _callData,
            _callValues
        );
    }

    function executeMap(
        uint256 _mapID
    )
        external
    {
        TreasureMap memory map = treasureMaps_[_mapID];
        // Ensures the map exists
        require(
            map.creator != address(0),
            "MAP: Map does not exist"
        );
        // Noting exploration.
        map.explores += 1;
        // Executing map instructions
        for (uint i = 0; i < map.targetAddresses.length; i++) {
            msg.sender.value(
                map.callValues[i]
            )(
                map.targets[i], 
                map.values[i], 
                proposal.signatures[i], 
                map.calldatas[i], 
                map.eta
            );
        }

        emit MapExplored(
            msg.sender,
            _mapID
        );
    }
}