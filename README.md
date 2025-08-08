# pilot-DApp

Pre-requisites
1. Node JS for creating DApp(De-centralized application)
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
    ``npx create-react-app react-dapp``

5. install npm dependency packages  
 - Ethers - Node.JS library for interacting with the Ethereum blockchain  
 - Hardhat - for creating local blockchain node  
    ```
    npm install ethers hardhat @nomiclabs/hardhat-waffle \
    ethereum-waffle chai \
    @nomiclabs/hardhat-ethers
    ```
   
6. create hardhat configuration file
    ```
    npx hardhat
    ```
   - Select "Create a basic sample project"
   - Install the dependencies when prompted
   - This will create a `hardhat.config.js` file in the root directory

7. add artifacts and network conf in hardhat.config.js

8. create a local blockchain node
    ```
    npx hardhat node
    ```

9. add hardhat integration with metamask. Specify the localhost network in metamask by specifying 
   - RPC URL as ```http://localhost:8545```  
   - Chain ID as ```1337```
   - Name as ```Hardhat Local Node```

