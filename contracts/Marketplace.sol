// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Marketplace {
    IERC1155 private _token;

    mapping (uint256 => uint256) price;

    constructor(IERC1155 token) {
        require(address(token) != address(0));
        _token = token;
        price[1] = 100000000000000;
        price[2] = 200000000000000;
        price[3] = 300000000000000;
    }

    fallback() external payable{
        buyToken(1);
    }

    function buyToken(uint256 tokenId) public payable {
        uint256 weiAmount = msg.value;
        //Check for correct amount and correct tokenId
        require(weiAmount >= price[tokenId] && price[tokenId] != 0);

        _token.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
    }

    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data) external returns(bytes4){
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
}