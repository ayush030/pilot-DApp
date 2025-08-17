// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol"; // to use console logging in Hardhat

// A contract is a collection of functions and data (state) that resides at a specific address on the Ethereum blockchain.
contract Greeter {
    string private greeting;

    // event GreetingChanged(string newGreeting);

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    // read rule
    function greet() public view returns (string memory) {
        return greeting;
    }

    // write rule
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
        // emit GreetingChanged(_greeting);
    }
}