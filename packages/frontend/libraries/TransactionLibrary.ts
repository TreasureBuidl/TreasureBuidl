import { Protocol, Operation } from '../types/Treasure.types';


type Network = {
  id: number;
  name: string;
  contractAddress: string;
}

class ProjectLibrary {
  // The name of the protocol
  protocol: Protocol;

  // The available networks that this protocol is deployed on and the relevant contract addresses
  networks: Network[];

  // Array of all function sigs in encoding format. 
  functionSig: string[];

  // Array of all full function sigs for display purposes.
  fullFunctionSig: string[];

  // Array of descriptions for each function.
  description: string[];

  // Array of descriptions for all params for each function. 
  paramToolTip: string[];

  // Array of operation descriptions i.e. Add Liquidity, Swap, etc.
  operations: string[];

  // Array of booleans representing whether a function requires an input
  hasInput: boolean[];

  // Array of booleans representing whether a function provides an output
  hasOutput: boolean[];

  getContractAddress(networkId):string {
    for (let network of this.networks) {
      if (network.id == networkId) {
        return network.contractAddress;
      }
    }
  }
}

class UniswapV2Library extends ProjectLibrary {
  constructor() {
    super();
    this.protocol = Protocol.Uniswap;
    this.networks = [
      {
        id: 1,
        name: "Mainnet",
        contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
      {
        id: 4,
        name: "Rinkeby",
        contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      },
      {
        id: 42,
        name: "Kovan",
        contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      }
    ]
    this.functionSig = ["addLiquidity(address,address,uint,uint,uint,uint,address,uint)","removeLiquidity(address,address,uint,uint,uint,address,uint)",
      "swapExactTokensForTokens(uint,uint,address[],address,uint)", "swapTokensForExactTokens(uint,uint,address[],address,uint)"];
    this.fullFunctionSig = ["addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
      "removeLiquidity(address tokenA,address tokenB,uint liquidity,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB)",
      "swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)",
      "swapTokensForExactTokens(uint amountOut,uint amountInMax,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)"];
    this.description = ["Adds liquidity to an ERC-20 to ERC-20 pool.", "Removes liquidity from an ERC-20 to ERC-20 pool.", 
      "Swaps an exact amount of input tokens for as many output tokens as possible, along the route determined by the path. The first element of path is the input token, the last is the output token, and any intermediate elements represent intermediate pairs to trade through (if, for example, a direct pair does not exist).",
      "Receive an exact amount of output tokens for as few input tokens as possible, along the route determined by the path. The first element of path is the input token, the last is the output token, and any intermediate elements represent intermediate tokens to trade through (if, for example, a direct pair does not exist)."];
    this.paramToolTip = [
      "tokenA - The contract address of the desired token. tokenB - The contract address of the desired token. amountADesired - The amount of tokenA to add as liquidity if the B/A price is <= amountBDesired/amountADesired (A depreciates). amountBDesired - The amount of tokenB to add as liquidity if the A/B price is <= amountADesired/amountBDesired (B depreciates). amountAMin - Bounds the extent to which the B/A price can go up before the transaction reverts. Must be <= amountADesired. amountBMin - Bounds the extent to which the A/B price can go up before the transaction reverts. Must be <= amountBDesired. to - Recipient of the liquidity tokens. deadline - Unix timestamp after which the transaction will revert.",
      "tokenA - The contract address of the desired token. tokenB - The contract address of the desired token. liquidity - The amount of liquidity tokens to remove. amountAMin - The minimum amount of tokenA that must be received for the transaction not to revert. amountBMin - The minimum amount of tokenB that must be received for the transaction not to revert. to - Recipient of the underlying assets. deadline - Unix timestamp after which the transaction will revert. amountA - The amount of tokenA received. amountB - The amount of tokenB received.",
      "amountIn - The amount of input tokens to send. amountOutMin - The minimum amount of output tokens that must be received for the transaction not to revert. path - An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity. to - Recipient of the output tokens. deadline - Unix timestamp after which the transaction will revert. amounts - The input token amount and all subsequent output token amounts.",
      "amountOut - The amount of output tokens to receive. amountInMax - The maximum amount of input tokens that can be required before the transaction reverts. path - An array of token addresses. path.length must be >= 2. Pools for each consecutive pair of addresses must exist and have liquidity. to - Recipient of the output tokens. deadline - Unix timestamp after which the transaction will revert. amounts - The input token amount and all subsequent output token amounts."
    ];
    this.operations = [Operation.addLiquidity, Operation.removeLiquidity, Operation.swap, Operation.swap]; // TODO there's two swaps here, UI needs to differentiate somehow
    this.hasInput = [true, true, true, true];
    this.hasOutput = [true, true, true, true];
  }
}

class AaveLibrary extends ProjectLibrary {
  constructor() {
    super();
    this.protocol = Protocol.Aave;
    this.networks = [
      {
        id: 1,
        name: "Mainnet",
        contractAddress: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
      },
      {
        id: 42,
        name: "Kovan",
        contractAddress: "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe",
      }
    ]
    this.functionSig = ["deposit(address,uint256,address,uint16)", "withdraw(address,uint256,address)", "borrow(address,uint256,uint256,uint16,address)", 
      "repay(address,uint256,uint256,address)", "flashLoan(address,address[],uint256[],uint256[],address,bytes,uint16)"];
    this.fullFunctionSig = ["deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external", "withdraw(address asset, uint256 amount, address to) external returns (uint256)",
      "borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external", "repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external returns (uint256)",
      "flashLoan(address receiverAddress, address[] calldata assets, uint256[] calldata amounts, uint256[] modes, address onBehalfOf, bytes calldata params, uint16 referralCode) external"];
    this.description = ["Deposits a certain amount of an asset into the protocol, minting the same amount of corresponding aTokens, and transferring them to the onBehalfOf address.",
      "Withdraws amount of the underlying asset, i.e. redeems the underlying token and burns the aTokens.", "Borrows amount of asset with interestRateMode, sending the amount to msg.sender, with the debt being incurred by onBehalfOf.",
      "Repays onBehalfOf's debt amount of asset which has a rateMode.", "Sends the requested amounts of assets to the receiverAddress contract, passing the included params."];
    this.paramToolTip = [
      "asset - address of the underlying asset. amount - amount deposited, expressed in wei units. onBehalfOf - address whom will receive the aTokens. Use msg.sender when the aTokens should be sent to the caller. referralCode - referral code for our referral program. Use 0 for no referral.",
      "asset - address of the underlying asset, not the aToken. amount - amount deposited, expressed in wei units. Use type(uint).max to withdraw the entire balance. to - address that will receive the asset",
      "asset - address of the underlying asset. amount - amount to be borrowed, expressed in wei units. interestRateMode - the type of borrow debt. Stable: 1, Variable: 2. referralCode - referral code for our referral program. Use 0 for no referral code. onBehalfOf - address of user who will incur the debt. Use msg.sender when not calling on behalf of a different user.",
      "asset - address of the underlying asset. amount - amount to be borrowed, expressed in wei units. Use uint(-1) to repay the entire debt,  ONLY when the repayment is not executed on behalf of a 3rd party. In case of repayments on behalf of another user, it's recommended to send an _amount slightly higher than the current borrowed amount. rateMode - the type of borrow debt. Stable: 1, Variable: 2. onBehalfOf - address of user who will incur the debt. Use msg.sender when not calling on behalf of a different user.",
      "receiverAddress - address of the contract receiving the funds. Must implement the IFlashLoanReceiver interface. assets - addresses of the reserves to flashloan. amounts - amounts of assets to flashloan. This needs to contain the same number of elements as assets. modes - the types of debt to open if the flashloan is not returned. 0: Don't open any debt, just revert 1: stable mode debt 2: variable mode debt. onBehalfOf - if the associated mode is not 0 then the incurred debt will be applied to the onBehalfOf address. Note: onBehalfOf must already have approved sufficient borrow allowance of the associated asset to msg.sender. params - bytes-encoded parameters to be used by the receiverAddress contract. referralCode - referral code for our referral program"
    ];
    this.operations = [Operation.deposit, Operation.withdraw, Operation.borrow, Operation.repay, Operation.openFlashloan];
    this.hasInput = [true, true, false, true, false];
    this.hasOutput = [true, true, true, true, true];
  }
}

class CompoundLibrary extends ProjectLibrary {
  // NOTE: the compound functions need to be called slightly differently than the other protocols. 
  // The contract address provided here is the address of the comptroller, which has a getAllMarkets functions.
  // That function will return a list of addresses for all ctokens contracts. Those contracts define the functions
  // included below. See the compound documentation for more information.

  constructor() {
    super();
    this.protocol = Protocol.Compound;
    this.networks = [
      {
        id: 1,
        name: "Mainnet",
        contractAddress: "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B",
      },
      {
        id: 4,
        name: "Rinkeby",
        contractAddress: "0x2EAa9D77AE4D8f9cdD9FAAcd44016E746485bddb",
      },
      {
        id: 42,
        name: "Kovan",
        contractAddress: "0x5eAe89DC1C671724A672ff0630122ee834098657",
      }
    ]
    this.functionSig = ["mint(uint)", "redeem(uint)", "borrow(uint)", "repayBorrow(uint)"];
    this.fullFunctionSig = ["mint(uint mintAmount) returns (uint)", "redeem(uint redeemTokens) returns (uint)", "borrow(uint borrowAmount) returns (uint)", "repayBorrow(uint repayAmount) returns (uint)"];
    this.description = ["The mint function transfers an asset into the protocol, which begins accumulating interest based on the current Supply Rate for the asset. The user receives a quantity of cTokens equal to the underlying tokens supplied, divided by the current Exchange Rate.",
      "The redeem function converts a specified quantity of cTokens into the underlying asset, and returns them to the user. The amount of underlying tokens received is equal to the quantity of cTokens redeemed, multiplied by the current Exchange Rate. The amount redeemed must be less than the user's Account Liquidity and the market's available liquidity.",
      "The borrow function transfers an asset from the protocol to the user, and creates a borrow balance which begins accumulating interest based on the Borrow Rate for the asset. The amount borrowed must be less than the user's Account Liquidity and the market's available liquidity.",
      "The repay function transfers an asset into the protocol, reducing the user's borrow balance."];
    this.paramToolTip = [
      "mintAmount - The amount of the asset to be supplied, in units of the underlying asset.",
      "redeemTokens - The number of cTokens to be redeemed.",
      "borrowAmount - The amount of the underlying asset to be borrowed.",
      "repayAmount - The amount of the underlying borrowed asset to be repaid. A value of -1 can be used to repay the full amount."
    ];
    this.operations = [Operation.deposit, Operation.withdraw, Operation.borrow, Operation.repay];
    this.hasInput = [true, true, false, true];
    this.hasOutput = [true, true, true, false];
  }
}

export const libraries: ProjectLibrary[] = [new UniswapV2Library(), new AaveLibrary(), new CompoundLibrary()];