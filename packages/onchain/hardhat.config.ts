import { HardhatUserConfig } from "hardhat/config";
import "tsconfig-paths/register";
import "hardhat-docgen";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";

dotenv.config();


/**
 * API key for using Infura. To generate keys go to https://infura.io/
 * @notice  Never hard code API keys within a file that is tracked by git.
 *          This file is tracked by git, as such we pull the API keys from
 *          the `.env` file.
 */
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

/**
 * Private key of deployer
 * @notice  Never hard code private keys within a file that is tracked by git.
 *          This file is tracked by git, as such we pull the private keys from
 *          the `.env` file.
 */
export const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

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
};

export default config;
