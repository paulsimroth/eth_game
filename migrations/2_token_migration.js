//ERC1155 Token
const GameToken = artifacts.require("GameToken");

module.exports = function (deployer) {
  deployer.deploy(GameToken, "");
};