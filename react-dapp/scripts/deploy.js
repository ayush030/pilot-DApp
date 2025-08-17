// require the Hardhat Runtime Environment explicitly
// This is optional when running scripts with `npx hardhat run <script>` but useful for running the script in a standalone fashion
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