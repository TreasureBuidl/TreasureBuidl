import { HardhatUserConfig } from "hardhat/config";
import "tsconfig-paths/register";
import "hardhat-docgen";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  docgen: {
    path: "./docs/gen-docs/",
    clear: true,
    runOnCompile: true,
  },
  gasReporter: {
    enabled: true,
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`]
    },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //   accounts: [`${process.env.MAIN_PRV_KEY}`]
    // }
  }
};

export default config;
