const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  //Deploy the token to a blockchain
  deployer.deploy(Token);
  const token = await Token.deployed();

  //Deplloy the contract that handles the exchange (token exchange service)
  deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  //Transfer all tokens to the major ethswap wallet
  await token.transfer(ethSwap.address, '100000000000000000');
};
