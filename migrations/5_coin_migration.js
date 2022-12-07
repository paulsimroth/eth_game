//ERC20 Token
const GameCoin = artifacts.require("GameCoin");

module.exports = function (deployer) {
  deployer.deploy(GameCoin, "GameCoin" , "GCT");
};