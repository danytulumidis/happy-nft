const { ethers } = require("hardhat");

async function main() {
    // get the contract
    const happyNFTContract = await ethers.getContractFactory("HappyNFT");

    // deploy the contract
    const deployedContract = await happyNFTContract.deploy(
        "Happy NFT",
        "HT",
    );

    // print the address of the deployed contract
    console.log(
        "Deployed Contract:",
        deployedContract.address
    );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });