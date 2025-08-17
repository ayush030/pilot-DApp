# pilot-DApp

## Pre-requisites
1. Node.JS for creating DApp(De-centralized application)
2. HardHat for creating local blockchain node
3. Metamask wallet extension for connecting to the local blockchain node

[//]: # ([)

[//]: # (Wallet recovery phrase)

[//]: # (   1. visual)

[//]: # (   2. siren)

[//]: # (   3. script)

[//]: # (   4. mix)

[//]: # (   5. river)

[//]: # (   6. between)

[//]: # (   7. club)

[//]: # (   8. tooth)

[//]: # (   9. love)

[//]: # (   10. birth)

[//]: # (   11. whip)

[//]: # (   12. hurdle)

[//]: # (])

4. create react app
    ```shell
    npx create-react-app react-dapp
   ```
   
5. install npm dependency packages  
 - Ethers - Node.JS library for interacting with the Ethereum blockchain  
 - Hardhat - for creating local blockchain node  
    ```shell
    npm install ethers hardhat @nomiclabs/hardhat-waffle \
    ethereum-waffle chai \
    @nomiclabs/hardhat-ethers
    ```
   
6. create hardhat configuration file
    ```shell
    npx hardhat
    ```
   - Select "Create a basic sample project"
   - Install the dependencies when prompted
   - This will create a `hardhat.config.js` file in the root directory

7. add artifacts and network conf in hardhat.config.js

8. create a local blockchain node
    ```shell
    npx hardhat node
    ```

9. add hardhat integration with metamask. Specify the localhost network in metamask by specifying 
   - RPC URL as ```http://localhost:8545```  
   - Chain ID as ```1337``` configured in `hardhat.config.js` file
   - Name as ```Hardhat Local Node```

## Create a sample contract

1. create a sample contract
    - Create a `contracts` directory in the root directory
    - Create a `Greeting.sol` file in the `contracts` directory
    - Add the following code to file:
    ```solidity
    // SPDX-License-Identifier: Unlicense

    pragma solidity ^0.8.0;

    import "hardhat/console.sol"; // to use console logging in Hardhat

    contract Greeter {
    string private greeting;
    
        constructor(string memory _greeting) {
            console.log("Deploying a Greeter with greeting:", _greeting);
            greeting = _greeting;
        }
    
        function greet() public view returns (string memory) {
            return greeting;
        }
    
        function setGreeting(string memory _greeting) public {
            console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
            greeting = _greeting;
        }
    }
    ```
2. compile the contract ```npx hardhat compile```. This will create a `src/artifacts` directory in the root directory with the compiled contracts in `artifacts/contracts` directory, including the bytecode.

3. Add testAccount in metamask using private key. This should display the test account balance in metamask. This will require public key of the reciever bank. Copy it from the metamask.

4. You can try sending from your newly created/imported account to another TEST account in metamask. This will though some warnings/errors in hardhat console like-
```shell
eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0x5b07003baf157b988b853ea80c2e75e7f18743c9

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0x5b07003baf157b988b853ea80c2e75e7f18743c9

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0x5b07003baf157b988b853ea80c2e75e7f18743c9

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0x5b07003baf157b988b853ea80c2e75e7f18743c9

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0x5b07003baf157b988b853ea80c2e75e7f18743c9

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

eth_call
  WARNING: Calling an account which is not a contract
  From: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:   0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

eth_blockNumber (4)
eth_getTransactionCount
eth_sendRawTransaction
  Transaction: 0x41d5e8ba2d801f6d73db5d11676d30fd22f2cade73717457ac3bca1cd42d47fc
  From:        0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:          0x5b07003baf157b988b853ea80c2e75e7f18743c9
  Value:       1. ETH
  Gas used:    21000 of 21000
  Block #1:    0x9cd7ebc0b7e52e6bd08fb6b9fd755b73de177ce6a15de33fbc3b9c187caf558e
```

## Deploy the contract

1. Create a `scripts` directory in the root directory
2. Create a `deploy.js` file in the `scripts` directory
3. Add the following code to the `deploy.js` file:
```javascript
    // require the Hardhat Runtime Environment explicitly
    // This is optional when running scripts with `npx hardhat run <script>`
    // but useful for running the script in a standalone fashion
    // or testing the script.
    const hre = require("hardhat");
    
    async function main() {
        // hardhat always run the compile task(byte-code) when running a script with its cli.
        // If you want to run the compile task manually, you can use `await hre.run('compile');`
        
        // get the contract to deploy
        const Greeter = await hre.ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, Hardhat!");
        
        await greeter.deployed();
        console.log("Greeter deployed to:", greeter.address);
    }
    main()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
```

4. Run the deploy script
    ```shell
    npx hardhat run scripts/deploy.js --network localhost
    ```
   - This will deploy the contract to the local blockchain node and display the contract address in the console.
   - This should display the following output in the console:
   ```shell
   Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```

    ```shell Hardhat console
    eth_sendTransaction
    Contract deployment: Greeter
    Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
    Transaction:         0x73954d0f2edc6bcbb429d8470204714db70f4e61cfd380ebf8100d4e3c84a223
    From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    Value:               0 ETH
    Gas used:            588080 of 588080
    Block #1:            0x411a8c838a866c4fa03df37372afeeec9f63dc459e63765206346d799a132b5b
    
    console.log:
    Deploying a Greeter with greeting: Hello, Hardhat!
    
    eth_chainId
   ```
   - Keep track of Greeter contract address. Here `0x5fbdb2315678afecb367f032d93f642f64180aa3`
   - This deployment will be required every time node starts. So, you can create a script to automate this process.

## Interact with the contract

