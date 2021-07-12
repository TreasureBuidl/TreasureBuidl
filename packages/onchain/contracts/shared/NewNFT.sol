// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IExternallyImplementedTypedToken.sol";

abstract contract NewNFT is IExternallyImplementedTypedToken {
    struct TokenType {
        // Token name
        string name;
        // Token symbol
        string symbol;
        // Creator of token type
        address creator;
    }

    mapping(bytes32 => TokenType) private tokenTypes_;

    // Mapping of token ID to token type
    mapping(uint256 => bytes32) private tokenType_;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private owners_;

    // Mapping of owners to token type to balance. 0 type is balance total.
    mapping(address => mapping(bytes32 => uint256)) private balances_;

    //        owner =>         spender =>        token ID => approved
    mapping(address => mapping(address => mapping(uint256 => bool))) private tokenApprovals_;

    //        owner =>        operator =>      token type => approved
    mapping(address => mapping(address => mapping(bytes32 => bool)))
        private operatorApprovals_;

    //--------------------------------------------------------------------------
    // CONSTRUCTOR
    //--------------------------------------------------------------------------

    constructor() {}

    //--------------------------------------------------------------------------
    // VIEW
    //--------------------------------------------------------------------------

    function balanceOfAll(address _owner)
        external
        view
        override
        returns (uint256 balance)
    {
        return balances_[_owner][bytes32(0)];
    }

    function balanceOfType(bytes32 _type, address _owner)
        external
        view
        override
        returns (uint256 balance)
    {
        return balances_[_owner][_type];
    }

    function ownerOf(uint256 _tokenId) external view override returns (address owner) {
        return owners_[_tokenId];
    }

    function typeOf(uint256 _tokenId) external view override returns (bytes32 tokenType) {
        return tokenType_[_tokenId];
    }

    function isApprovedForToken(
        address _owner,
        address _spender,
        uint256 _tokenId
    ) external view override returns (bool) {
        return tokenApprovals_[_owner][_spender][_tokenId];
    }

    function isApprovedForType(
        address _owner,
        address _operator,
        bytes32 _type
    ) external view override returns (bool) {
        return operatorApprovals_[_owner][_operator][_type];
    }

    //--------------------------------------------------------------------------
    // (public & external) STATE MODIFYING
    //--------------------------------------------------------------------------

    function approveForToken(address _spender, uint256 _tokenId, bool _approved) external override {
        require(
            msg.sender == this.ownerOf(_tokenId),
            "Sender not owner"
        );
        tokenApprovals_[msg.sender][_spender][_tokenId] = _approved;
    }

    function approveForType(address _operator, bytes32 _type, bool _approved) external override {
        operatorApprovals_[msg.sender][_operator][_type] = _approved;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external override {
        require(
            this.ownerOf(_tokenId) == _from,
            "From is not token owner"
        );
        require(
            msg.sender == _from ||
            this.isApprovedForToken(_from, msg.sender, _tokenId) ||
            this.isApprovedForType(_from, msg.sender, this.typeOf(_tokenId)),
            "Sender not owner or approved"
        );

        _transfer(
            _from,
            _to,
            _tokenId
        );
    }

    //--------------------------------------------------------------------------
    // (private & internal) STATE MODIFYING
    //--------------------------------------------------------------------------

    function _transfer(
        address _from,
        address _to, 
        uint256 _tokenId
    ) internal {
        require(
            this.ownerOf(_tokenId) == _from,
            "From is not token owner"
        );
        require(
            _to != address(0),
            "Cannot send to 0x0 address"
        );

        bytes32 tokenType = this.typeOf(_tokenId);

        // Removing token from from
        balances_[_from][tokenType] -= 1;
        balances_[_from][bytes32(0)] -= 1;
        // Adding token to to
        balances_[_to][tokenType] += 1;
        balances_[_to][bytes32(0)] += 1;
        // Updating owner of token ID
        owners_[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId, tokenType);
    }
}
