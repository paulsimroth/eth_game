// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

//This is the ERC20 Token which gets transferred at the end of the game
//1 Coin collected in game == 1 GameToken

contract GameToken is ERC20 {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
}