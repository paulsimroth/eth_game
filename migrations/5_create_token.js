const _token_migration = require("./3_token_migration");

const Marketplace = artifacts.require("Marketplace");
const NFToken = artifacts.require("NFToken");

module.exports = (deployer) => deployer
  .then( () => createToken1())
  .then( () => createToken2())
  .then( () => createToken3())
  .then( () => mintTokens());

async function createToken1() { 
  (await NFToken.deployed()).create(0, "");
};

async function createToken2() { 
  (await NFToken.deployed()).create(0, "");
};

async function createToken3() { 
  (await NFToken.deployed()).create(0, "");
};

function mintTokens() {
  NFToken.deployed().then(instance => {
    instance._mint(Marketplace.address, 1, 30);
    instance._mint(Marketplace.address, 2, 20);
    instance._mint(Marketplace.address, 3, 10);
  })
};