pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Exchange";
    Token public token;

    //Fixed exchange rate
    uint public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    )

    function buyTokens() public payable{
        //Calculate tokens
        uint tokenAmount = msg.value * rate;

        //Ensure master wallet have enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        //Transfer all tokens to user
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens() public {
        //Calculate the amount of tokens to get back
        uint etherAmount = _amount / rate ;

        //Perform the sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount)
    }
}