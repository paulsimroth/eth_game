// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract GameToken is ERC20 {

    constructor(string memory _name, string memory _symbol) ERC20("GameToken", "EGT") {}

    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
}