pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Exchange";
    Token public token;

    //Fixed exchange rate
    uint public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable{
        //Calculate tokens
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}