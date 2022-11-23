const Marketplace = artifacts.require("Marketplace");
const GameToken = artifacts.require("GameToken");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, GameToken.address);
};
