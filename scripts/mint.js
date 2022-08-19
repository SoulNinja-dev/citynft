// 0xe7dac11acd0a04b6c8daa37d3d6223ba301d418a
const { Contract } = require("ethers");
const { ethers } = require("hardhat");
const CityAbi = require("./City.json");

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  // const cityFactory = await hre.ethers.getContractFactory("City");
  // const cityContract = await cityFactory.deploy();
  const abi = CityAbi.abi;
  const cityContract = new Contract(
    "0xe7dac11acd0a04b6c8daa37d3d6223ba301d418a",
    abi,
    owner
  );

  console.log("Contract deployed to:", cityContract.address);
  const city = await cityContract.mintTo(
    owner.address,
    ethers.utils.parseEther("0.03"),
    {
      gasLimit: 500000,
      value: ethers.utils.parseEther("0.03"),
    }
  );
  console.log(`City minted to ${owner.address} @ ${city.hash}`);

  // get value returned by cityContract.mintTo
  const cityItemId = await city.wait();
  console.log(cityItemId);

  console.log(city);
  const value = await cityContract.getTokenValue(1);
  console.log(`token value: ${value}`);
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
