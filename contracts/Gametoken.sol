// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameToken is ERC1155 {

    constructor(string memory uri) ERC1155(uri){

    }

    /**
    * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
    * Calls {_mint} to handle minting.
    */
    function mint(address to, uint256 id, uint256 amount) public returns (bool) {
        _mint(to, id, amount, "");
        return true;
    }
}