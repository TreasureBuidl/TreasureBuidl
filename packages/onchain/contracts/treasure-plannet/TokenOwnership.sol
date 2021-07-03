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
    // Contract owner => Token ID
    mapping(address => uint256) public contractOwners_;

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

    /**
     * @param   _owner Address of the owner. 
     * @return  address The address of the contract that the owner owns. 
     */
    function getOwnedContract(address _owner) external view returns(address) {
        uint256 tokenID = contractOwners_[_owner];
        return ownedContracts_[tokenID];
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

    /**
     * @param   _to Address receiving ownership token. 
     * @notice  All storage for owner to owned contract is handled in the 
     *          `_beforeTokenTransfer` function.
     *          Only the factory can mint tokens.
     */
    function mintOwnershipToken(
        address _to
    )
        external
        onlyFactory()
        returns(uint256 tokenID)
    {
        tokenIDCounter_ += 1;
        tokenID = tokenIDCounter_;

        require(
            contractOwners_[_to] == 0,
            "Owner has token"
        );

        _mint(
            OWNER_TOKEN,
            _to,
            tokenID
        );
    }

    /**
     * @param   _tokenID ID of the minted token.
     * @param   _ownedContract Address of the owned contract.
     * @notice  Only the factory can link owner tokens to owned contracts. 
     */
    function linkOwnershipToken(
        uint256 _tokenID,
        address _ownedContract
    )
        external
        onlyFactory()
    {
        ModifiedOwnership owned = ModifiedOwnership(_ownedContract);
        require(
            ownedContracts_[_tokenID] == address(0),
            "Ownership has already been linked"
        );
        require(
            owned.isOwned(),
            "Owned contract invalid"
        );
        ownedContracts_[_tokenID] = _ownedContract;
    }

    /**
     * @param   _from The address that the token is being moved from. If this is
     *          the 0x0 address, the token is being minted. 
     * @param   _to The address that the token is being moved to. If this is the
     *          0x0 address, the token is being burnt. 
     * @param   _tokenID The ID of the token. 
     * @notice  This hook is called within the ModifiedErc721 on mint, burn and
     *          all variations of transfer. Within this function the address of
     *          the current owner is tracked. 
     */
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
            contractOwners_[address(0)] = _tokenID;

        } else if(_from == address(0)) {
            // If token is being minted
            contractOwners_[_to] = _tokenID;

        } else if(
            _from != address(0) &&
            _to != address(0)
        ) {
            // If token is being transferred
            ownedContract.transferOwnership(_to);
            contractOwners_[_from] = 0;
            contractOwners_[_to] = _tokenID;
        }
    }
}
