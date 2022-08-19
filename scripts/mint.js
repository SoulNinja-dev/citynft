const { ethers } = require("hardhat");

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const cityFactory = await hre.ethers.getContractFactory("City");
  const cityContract = await cityFactory.deploy();

  console.log("Contract deployed to:", cityContract.address);
  const city = await cityContract.mintTo(owner.address, {
    gasLimit: 500000,
    value: ethers.utils.parseEther("0.08"),
  });
  console.log(`City minted to ${owner.address} @ ${city.hash}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
