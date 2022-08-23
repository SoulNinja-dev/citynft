// 0xe7dac11acd0a04b6c8daa37d3d6223ba301d418a
const { Contract } = require("ethers");
const { ethers } = require("hardhat");
const CityAbi = require("./City.json");
const { SequenceIndexerClient } = require("@0xsequence/indexer");
const indexer = new SequenceIndexerClient(
  "https://rinkeby-indexer.sequence.app/"
);

const CONTRACT_ADDRESS = "0x54988b724aeb4d04e3e9c2Ce811D366D6EFfA8e7";

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const abi = CityAbi.abi;
  const cityContract = new Contract(CONTRACT_ADDRESS, abi, owner);
  console.log("Contract deployed to:", cityContract.address);

  const city = await cityContract.mint(
    owner.address,
    ethers.utils.parseEther("0.01"),
    6969,
    {
      gasLimit: 500000,
      value: ethers.utils.parseEther("0.01"),
    }
  );
  console.log(`City minted to ${owner.address} @ ${city.hash}`);
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
