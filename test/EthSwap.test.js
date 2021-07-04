const { assert } = require('chai');
const { default: Web3 } = require('web3');

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai').use(require('chai-as-promised')).should();

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) => {
    let token, ethSwap;

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)

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

    describe('Buy Tokens', async() => {
        let result;
        before(async () => {
            result = await ethSwap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'Ether') })
        })
        it('Buy Tokens instantly for a fixed price', async() => {
            //check investor balance before purchase
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('100'))

            //Get ethSwap balance after purchase
            let ethSwapBalance;
            ethSwapBalance = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('999900'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)

            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

            //Testing events

            const event = result.logs[0].args;
            assert.equal(event.account, investor);
            asset.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100'), { from: investor });
            assert.equal(event.rate.toString(), '100');
        })
    })

    describe('Sell Tokens', async() => {
        let result;

        before(async () => {
            await token.approve(ethSwap.address, tokens('100'), { from: investor })
            result = await ethSwap.sellTokens(tokens('100'), { from: investor })
        })

        it('It allows users to instantly sell tokens for a fixed price', async() => {

            //Check the investor balance after purchase
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('100'))

        })
    })
});