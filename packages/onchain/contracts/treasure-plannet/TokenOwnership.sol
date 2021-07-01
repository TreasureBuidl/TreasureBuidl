// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "../treasure-maps/ModifiedErc721.sol";
import "./ModifiedOwnership.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract TokenOwnership is ModifiedErc721 {
    bytes32 constant OWNER_TOKEN = bytes32(keccak256("OWNER_TOKEN"));

    address public factory_;

    uint256 public tokenIDCounter_;
    // Token ID     => Owned contract
    mapping(uint256 => address) public ownedContracts_;

    modifier onlyFactory() {
        require(
            msg.sender == factory_,
            "Caller is not factory"
        );
        _;
    }

    constructor() 
        ModifiedErc721(
            "Owner Token",
            "OWT"
        )
    {

    }

    function setFactory(address _factory) external {
        require(
            factory_ == address(0),
            "Factory has already been set"
        );
        factory_ = _factory;
        // FUTURE should probably have some kind of ownership setting so that
        // the factory can transfer its minting rights.
    }

    function mintOwnershipToken(
        address _to
    )
        external
        onlyFactory()
        returns(uint256 tokenID)
    {
        tokenIDCounter_ += 1;
        tokenID = tokenIDCounter_;

        _mint(
            OWNER_TOKEN,
            _to,
            tokenID
        );
    }

    function linkOwnershipToken(
        uint256 _tokenID,
        address _ownedContract
    )
        external
        onlyFactory()
    {
        require(
            ownedContracts_[_tokenID] == address(0),
            "Ownership has already been linked"
        );
        require(
            ModifiedOwnership(_ownedContract).isOwned(),
            "Owned contract invalid"
        );

        ownedContracts_[_tokenID] = _ownedContract;
    } 

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenID
    ) 
        internal 
        override 
    {
        ModifiedOwnership ownedContract = ModifiedOwnership(
            ownedContracts_[_tokenID]
        );
        if(_to == address(0)) {
            // If token is being burnt
            ownedContract.renounceOwnership();
        } else if(
            _from != address(0) &&
            _to != address(0)
        ) {
            // If token is being transferred
            ownedContract.transferOwnership(_to);
        }
    }
}
