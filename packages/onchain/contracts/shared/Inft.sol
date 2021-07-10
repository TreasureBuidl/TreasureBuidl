// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Inft {

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 tokenId,
        bytes32 indexed tokenType
    );

    //--------------------------------------------------------------------------
    // VIEW 
    //--------------------------------------------------------------------------

    function balanceOfAll(address _owner) external view returns(uint256 balance);

    function balanceOfType(bytes32 _type, address _owner) external view returns(uint256 balance);

    function ownerOf(uint256 _tokenId) external view returns (address owner);

    function typeOf(uint256 _tokenId) external view returns(bytes32 tokenType);

    function isApprovedForToken(address _owner, address _spender, uint256 _tokenId) external view returns(bool);

    function isApprovedForType(address _owner, address _operator, bytes32 _type) external view returns(bool);

    // function getApproved(uint256 _tokenId) external view returns(address spender);

    // function getApprovedOfType(bytes32 _type, address _owner) external view returns(address operator);

    //--------------------------------------------------------------------------
    // (public & external) STATE MODIFYING
    //--------------------------------------------------------------------------

    function approveForToken(address _spender, uint256 _tokenId, bool _approved) external;

    function approveForType(address _operator, bytes32 _type, bool _approved) external;

    function transferFrom(address _from, address _to, uint256 _tokenId) external;
}