pragma solidity >=0.4.21 <0.6.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Exchange";
    Token public token;

    //Fixed exchange rate
    uint public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable{
        //Calculate tokens
        uint tokenAmount = msg.value * rate;

        //Ensure master wallet have enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        //Transfer all tokens to user
        token.transfer(msg.sender, tokenAmount);

        //Emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // User cannot sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        //Calculate the amount of tokens to get back
        uint etherAmount = _amount / rate ;

        // Require that EthSwap wallet has enough Ether
        require(address(this).balance >= etherAmount);

        //Perform the sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        //Emit sold event
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
}