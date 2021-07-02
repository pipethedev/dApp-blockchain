const { default: Web3 } = require('web3');

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai').use(require('chai-as-promised')).should();

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', (accounts) => {
    let token, ethSwap;

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new()

        //Transfer 1M
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('Token deployment', async() => {
        it('contract has a name', async() => {
            const name = await token.name();
            assert.equal(name, 'DApp Token')
        })
    })

    describe('EthSwap deployment', async() => {
        it('contract has a name', async() => {
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap Exchange')
        })

        it('contract has a tokens', async() => {
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
});