//ERC20 Token and ERC1155 Token get deployed

//ERC20 Token
const GameCoin = artifacts.require("GameCoin");

module.exports = function (deployer) {
  deployer.deploy(GameCoin);
};

//ERC1155 Token
const GameToken = artifacts.require("GameToken");

module.exports = function (deployer) {
  deployer.deploy(GameToken, "");
};