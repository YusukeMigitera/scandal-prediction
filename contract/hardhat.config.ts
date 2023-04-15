import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_ACCOUNT_KEY || ""],
    },
  },
};

export default config;
