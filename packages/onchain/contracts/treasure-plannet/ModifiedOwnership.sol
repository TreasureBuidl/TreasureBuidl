// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "../treasure-maps/ModifiedErc721.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @author  @vonie610 (Twitter & Telegram) | @Nicca42 (GitHub)
 * @author  // TODO Thornton @??? | @thornm9 (GitHub)
 * @notice  This contract has been modified away from the OZ standard Ownable in
 *          order to allow ownership to be represented by an NFT token.
 *          The owner of the NFT will have ownership rights over the owned 
 *          contract.
 * @dev     Contract module which provides a basic access control mechanism, 
 *          where there is an account (an owner) that can be granted exclusive 
 *          access to specific functions.
 *          This module is used through inheritance. It will make available the 
 *          modifier `onlyOwner`, which can be applied to your functions to 
 *          restrict their use to the owner.
 */
abstract contract ModifiedOwnership is Context {
    // Instance of the NFT token contract that represents ownership.
    ModifiedErc721 internal ownerTokenInstance_;
    // ID of the token that is the owner of contract.
    uint256 private ownerTokenID_;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor(
        address _ownerTokenInstance,
        uint256 _ownerTokenID
    ) internal {
        ownerTokenID_ = _ownerTokenID;
        ownerTokenInstance_ = ModifiedErc721(_ownerTokenInstance);
        address currentOwner = ownerTokenInstance_.ownerOf(ownerTokenID_);
        emit OwnershipTransferred(address(0), currentOwner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns(address) {
        return ownerTokenInstance_.ownerOf(ownerTokenID_);
    }

    function isOwned() public view returns(bool) {
        return true;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    modifier onlyToken() {
        require(
            _msgSender() == address(ownerTokenInstance_),
            "Ownable: ownership managed by token"
        );
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyToken() returns(bool) {
        emit OwnershipTransferred(
            ownerTokenInstance_.ownerOf(ownerTokenID_), 
            address(0)
        );

        return true;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(
        address _newOwner
    ) 
        public 
        virtual 
        onlyToken() 
        returns(bool) 
    {
        require(
            _newOwner != address(0), 
            "Ownable: new owner is the zero address"
        );
        address currentOwner = ownerTokenInstance_.ownerOf(ownerTokenID_);
        emit OwnershipTransferred(currentOwner, _newOwner);

        return true;
    }
}
