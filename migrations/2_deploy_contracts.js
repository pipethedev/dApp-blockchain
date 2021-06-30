const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = function(deployer) {
  //Deploy the token to a blockchain
  deployer.deploy(Token);

  //Deplloy the contract that handles the exchange (token exchange service)
  deployer.deploy(EthSwap);
};
