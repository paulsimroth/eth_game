const Marketplace = artifacts.require("Marketplace");
const GameToken = artifacts.require("GameToken");
const GameCoin = artifacts.require("GameCoin");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, GameToken.address, GameCoin.address);
};
