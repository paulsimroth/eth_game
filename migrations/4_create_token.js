const _token_migration = require("./2_token_migration");

const Marketplace = artifacts.require("Marketplace");
const GameToken = artifacts.require("GameToken");

module.exports = (deployer) => deployer
/*   .then( () => createToken1())
  .then( () => createToken2())
  .then( () => createToken3()) */
  .then( () => mintTokens());

/* async function createToken1() { 
  (await NFToken.deployed()).create(0, "");
};

async function createToken2() { 
  (await NFToken.deployed()).create(0, "");
};

async function createToken3() { 
  (await NFToken.deployed()).create(0, "");
}; */

function mintTokens() {
  GameToken.deployed().then(instance => {
    instance.mint(Marketplace.address, 1, 30);
    instance.mint(Marketplace.address, 2, 20);
    instance.mint(Marketplace.address, 3, 10);
  })
};