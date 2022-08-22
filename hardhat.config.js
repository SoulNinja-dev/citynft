require("@nomiclabs/hardhat-waffle");
require("dotenv").config(".env");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    // goerli: {
    //   url: process.env.NODE_API_URL,
    //   accounts: [process.env.GOERLI_PRIVATE_KEY],
    // },
    rinkeby: {
      url: process.env.NODE_API_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
  },
};
