const Marketplace = artifacts.require("Marketplace");
const GameToken = artifacts.require("GameToken");

module.exports = (deployer) => deployer
  .then( () => mintTokens());

function mintTokens() {
  GameToken.deployed().then(instance => {
    instance.mint(Marketplace.address, 1, 30);
    instance.mint(Marketplace.address, 2, 20);
    instance.mint(Marketplace.address, 3, 10);
  })
};