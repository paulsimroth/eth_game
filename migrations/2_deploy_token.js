const Token = artifacts.require("GameToken");

module.exports = function (deployer) {
  deployer.deploy(Token, "GameToken", "GT");
};
