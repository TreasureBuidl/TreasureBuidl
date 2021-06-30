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
    bytes32 constant OUTLINE = bytes32(keccak256("OUTLINE"));
        // Treasure maps contain the targets and target function signatures.
    // Storage for treasure map information.
    struct Outline {
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
    // Token IDs (type OUTLINE) to treasure map instructions.
    mapping(uint256 => Outline) public outlines_;

    bytes32 constant TREASURE_MAPS = bytes32(keccak256("TREASURE_MAPS"));
        // Treasure Maps contain the function parameters and call native values.
    struct TreasureMaps {
        // Array of target contract addresses.
        address[] callTargets;
        // Cost in native tokens to explore this map.
        uint256 callValueTotal;
        // Array of encoded function & parameters for execution at target.
        bytes[] callData;
        // Array of `msg.value`'s for target calls. 
        uint[] callValues;
    }
    // Token IDs (type TREASURE_MAPS) to coordinate details.
    mapping(uint256 => TreasureMaps) public treasureMaps_;
    // FUTURE A conditional treasure outline param which will then ignore passed
    // in variables for the ones specified in the outline. 

    event TreasureMapAdded(
        address indexed creator,
        uint256 indexed mapID,
        string description
    );

    constructor() ModifiedErc721("Treasure Maps", "tMAP") {

    }

    function getCoordinates(uint256 _ID) public view returns(
        address[] memory callTargets,
        uint256[] memory callValues,
        bytes[] memory callData
    ) {
        callTargets = treasureMaps_[_ID].callTargets;
        callValues = treasureMaps_[_ID].callValues;
        callData = treasureMaps_[_ID].callData;
    }

    /**
     * @param   _targetAddr Array of target contract addresses.
     * @param   _functionSig Array of targeted function signatures at matching 
     *          address.
     * @param   _callData Array of encoded parameters for function at target.
     * @param   _callValues Array of `msg.value`'s for target calls.
     * @return  treasureMapID The token ID for the treasure map created.
     */
    function createTreasure(
        string calldata _description,
        address[] calldata _targetAddr,
        string[] calldata _functionSig,
        bytes[] calldata _callData,
        uint[] calldata _callValues
    )
        external
        returns(uint256 treasureMapID)
    {
        treasureMapID = _addTreasureMap(
            msg.sender,
            _targetAddr,
            _functionSig,
            _callData,
            _callValues
        );
        
        emit TreasureMapAdded(
            msg.sender,
            treasureMapID,
            _description
        );
    }

    function createTreasureOutline(
        string calldata _description,
        address[] calldata _targetAddr,
        string[] calldata _functionSig
    )
        external
        returns(uint256 outlineID)
    {
        outlineID = _addOutline(
            msg.sender,
            _targetAddr,
            _functionSig
        );
    }

    function _addOutline(
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

        outlines_[tokenID] = Outline({
            creator: _creator,
            callTargets: _callTargets,
            callFunctionSigs: _functionSigs,
            explores: 0
        });

        _mint(OUTLINE, _creator, tokenID);
    }

    function _addTreasureMap(
         address _creator,
        address[] calldata _callTargets,
        string[] calldata _functionSigs,
        bytes[] calldata _callData,
        uint256[] calldata _callValues
    )
        internal
        returns(uint256 tokenID)
    {
        require(_creator != address(0), "Map does not exist");

        require(
            _callTargets.length == _functionSigs.length &&
            _callData.length == _functionSigs.length && 
            _callValues.length == _functionSigs.length,
            "MAP: Array lengths differ"
        );

        tokenCount_ += 1;
        tokenID = tokenCount_;

        // Counter for map native token cost.
        uint256 callCost;
        // Storage for encoded function calls.
        bytes[] memory generatedCallData = new bytes[](_callTargets.length);
        // Transforming data for efficient storage.
        for (uint256 i = 0; i < _callTargets.length; i++) {
            // Encoding function calls (signature and data)
            generatedCallData[i] = abi.encodePacked(
                bytes4(keccak256(bytes(_functionSigs[i]))), 
                _callData[i]
            );
            callCost += _callValues[i];
        }

        treasureMaps_[tokenID] = TreasureMaps({
            callTargets: _callTargets,
            callValueTotal: callCost,
            callData: generatedCallData,
            callValues: _callValues
        });

        _mint(TREASURE_MAPS, _creator, tokenID);
    }
}