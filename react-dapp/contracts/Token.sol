pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Recluze token";
    string public symbol = "REC";
    uint public totalSupply = 1000;

    // lookup table to find and ensure balance of address making a transaction of token
    mapping(address => uint) balances;

    constructor() {
        // assign all initial tokens to the contract's creator
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        // ensure the sender has enough tokens to send
        require(balances[msg.sender] >= amount, "Insufficient tokens");

        // decrease the balance of the sender from the lookup table
        balances[msg.sender] -= amount;

        // increase the balance of the recipient
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns(uint) {
        return balances[account];
    }
}
