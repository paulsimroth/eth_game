const Marketplace = artifacts.require("Marketplace");
const NFToken = artifacts.require("NFToken");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, NFToken.address);
};
