require("@nomiclabs/hardhat-waffle");


// sample hardhat task
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
    paths: {
      artifacts: "./src/artifacts",
    },
    networks: {
      hardhat: {
          chainId: 1337, // needed by metamask to add a node
      }
    }
};
