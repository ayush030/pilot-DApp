import logo from './logo.svg';
import './App.css';

import {useState} from 'react';
import {ethers} from 'ethers'; // acts like backend for the dapp
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'; // import the contract ABI(application binary interface)


const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // replace with your deployed contract address

function App() {
    // store greeting in local state of react. Has nothing to do with smart contract.
    const [greeting, setGreetingValueState] = useState();

    // request access to the user's Ethereum account. This works regardless of the wallet you are using.
    async function requestAccount() {
        // pops up a wallet window to ask the user to connect their wallet/account selection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    // call the smart contract, read the greeting value from the contract
    async function fetchGreeting() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // get contract object. It exposes methods to interact with the contract, written in Gretting.sol
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
    if (!greeting) return; // if greeting is empty, do nothing

        if (typeof window.ethereum !== 'undefined') {
            await requestAccount(); // populates the window.ethereum object with the user's accounts

            // create a provider to interact with the Ethereum network
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // you need a signer to send a new transaction to the blockchain.
            const signer = provider.getSigner(); // get the signer to sign transactions

            // ethers.Contract constructor works with either signer or provider. When you provide provider the contract is read-only, and when you provide signer, the contract is writable.
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

            try {
                const transaction = await contract.setGreeting(greeting); // call the setGreeting function in the contract
                await transaction.wait(); // wait for the transaction to be mined
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
