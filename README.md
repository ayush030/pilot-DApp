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
   - Keep track of Greeter contract address. ex: Here `0x5fbdb2315678afecb367f032d93f642f64180aa3`
   - This deployment will be required every time node starts. So, you can create a script to automate this process.

## Interact with the contract
1. Edit the `src/App.js` file in the `react-dapp` directory

2. Add the following code to the `App.js` file:
    ```javascript
    import logo from './logo.svg';
    import './App.css';
    
    import {useState} from 'react';
    import {ethers} from 'ethers'; // acts like backend for the dapp
    import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
    
    
    const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // replace with your deployed contract address
    
    function App() {
    const [greetingState, setGreetingValueState] = useState();

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function fetchGreeting() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {
                const data = await contract.greet();
                console.log('data: ', data);
            } catch (err) {
                console.error("Error fetching greeting:", err);
            }
        } else {
            console.log("Ethereum object not found. Install MetaMask.");
        }
    }

    async function setGreeting() {
    if (!greetingState) return;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); // get the signer to sign transactions
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

            try {
                const transaction = await contract.setGreeting(greetingState);
                await transaction.wait();
                console.log('Transaction successful:', transaction);
                await fetchGreeting()
            } catch (err) {
                console.error("Error setting greeting:", err);
            }
        } else {
            console.log("Ethereum object not found. Install MetaMask.");
        }
    }

    return (
        <div className="App">
         <header className="App-header">
             <button onClick={fetchGreeting}>Fetch Greeting</button>
             <button onClick={setGreeting}>Set Greeting</button>
             <input onChange={e=> setGreetingValueState(e.target.value)} placeholder="Set greeting" />
         </header>
        </div>
     );
    }
    
    export default App;
    ```
   
3. Start the React app
    ```shell
    npm start
    ```
   This will start the React app on `http://localhost:3000` where you can interact with the contract.

4. Open the React app in your browser and interact with the contract using the buttons and input field.
   - Click on "Fetch Greeting" to fetch the current greeting from the contract.
   - Enter a new greeting in the input field and click on "Set Greeting" to set a new greeting in the contract.
   - You should see the greeting being updated in the console and in the contract state.

## Token exchange
1. Create a Token contract for enabling exchange medium.
    - Create a `Token.sol` file in the `contracts` directory
    - Add the Token contract and required methods to file:
    ```solidity
    pragma solidity ^0.8.0;

    import "hardhat/console.sol";
    
    contract Token {
        string public name = "Recluze token";
        string public symbol = "REC";
        uint public totalSupply = 1000;
    
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
    ```

    - Compile the contract
    ```shell
    npx hardhat compile
    ``` 
2. Update scripts/deploy.js to deploy Token contract
    ```javascript
        // get the Token contract to deploy
        const Token = await hre.ethers.getContractFactory("Token");
        const token = await Token.deploy();
        
        await token.deployed();
        console.log("Token deployed to:", token.address);
    ```
3. Run the deploy script 
    ```shell
    npx hardhat run scripts/deploy.js --network localhost
    Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    ```
4. Add the newly created token(s) to wallet:
    - Open metamask and select "Import tokens"
    - Enter the Token contract address displayed in the console after deployment. ex: Here `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
    - Click on "Add Custom Token"
    - Click on "Import Tokens"
    - This should display the token balance in metamask


5. You can now send tokens from one account to another using metamask.