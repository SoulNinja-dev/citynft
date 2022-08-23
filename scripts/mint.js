// 0xe7dac11acd0a04b6c8daa37d3d6223ba301d418a
const { Contract } = require("ethers");
const { ethers } = require("hardhat");
const CityAbi = require("./City.json");
const { SequenceIndexerClient } = require("@0xsequence/indexer");
const indexer = new SequenceIndexerClient(
  "https://rinkeby-indexer.sequence.app/"
);

const CONTRACT_ADDRESS = "0x50DD7a0EBCE3E336e896df3b30Ad7fC0480677a3";
// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  // const cityFactory = await hre.ethers.getContractFactory("City");
  // const cityContract = await cityFactory.deploy();

  const abi = CityAbi.abi;
  const cityContract = new Contract(CONTRACT_ADDRESS, abi, owner);
  console.log("Contract deployed to:", cityContract.address);

  const city1 = await cityContract.mintTo(
    owner.address,
    ethers.utils.parseEther("0.08"),
    {
      gasLimit: 500000,
      value: ethers.utils.parseEther("0.08"),
    }
  );
  console.log(`City minted to ${owner.address} @ ${city1.hash}`);

  const currentTokenId = await cityContract.getCurrentToken();
  console.log(`currentTokenId: ${currentTokenId}`);
};

// get tokens owned by [address];
const getTokensOwnedByAddress = async () => {
  const tokenids = await indexer.getTokenBalances({
    accountAddress: "0x9503C1A5440F92190fE9035B01BF8d5159ea106f",
    contractAddress: CONTRACT_ADDRESS,
    includeMetadata: true,
  });
  return tokenids;
};

const runMain = async () => {
  try {
    await main();
    // const tokenids = await getTokensOwnedByAddress();
    // tokenids.balances.forEach((token) => {
    //   console.log(token.tokenMetadata);
    // });
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();

/*
find out how to start and stop money stream
link it to walletId tokenId
if someone else buys that (then stop that stream and switch it over to this new guy)
*/
