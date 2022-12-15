// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    IERC1155 private _token;
    IERC20 private _coin;

    mapping (uint256 => uint256) price;

    constructor(IERC1155 tokenAddress, IERC20 coinAddress) {
        require(address(tokenAddress) != address(0));
        require(address(coinAddress) != address(0));

        _token = tokenAddress;
        _coin = coinAddress;

        price[1] = 10;
        price[2] = 20;
        price[3] = 30;
    }

    fallback() external payable{
        
    }

    function balanceOf(address account) public view returns (uint256) {
        require(account != address(0));
        return _coin.balanceOf(account);
    }

    function buyToken(uint256 tokenId, uint256 buyOffer) public payable {
        //Check for correct amount and correct tokenId
        require(buyOffer >= price[tokenId] && price[tokenId] != 0);
        require(balanceOf(msg.sender) >= price[tokenId]);
        _coin.transferFrom(msg.sender, address(this), buyOffer);
        _token.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        
    }

    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data) external returns(bytes4){
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
}