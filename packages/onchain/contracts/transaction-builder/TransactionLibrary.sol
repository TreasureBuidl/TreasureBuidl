pragma solidity 0.8.0;

contract TransactionLibrary {
  address public UniswapV2RinkebyAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address public UniswapV2MainAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address public UniswapV2KovanAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  string[4] public UniswapV2Functions = [
    "addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
    "removeLiquidity(address tokenA,address tokenB,uint liquidity,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB)",
    "swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)",
    "swapTokensForExactTokens(uint amountOut,uint amountInMax,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)"
  ];

  address public AaveKovanAddress = 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe; // this address is liable to change on kovan
  address public AaveMainAddress = 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9;
  string[5] public AaveFunctions = [
    "deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external",
    "withdraw(address asset, uint256 amount, address to) external returns (uint256)",
    "borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external",
    "repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external returns (uint256)",
    "flashLoan(address receiverAddress, address[] calldata assets, uint256[] calldata amounts, uint256[] modes, address onBehalfOf, bytes calldata params, uint16 referralCode) external"
  ];

  address public CompoundMainAddress = 0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b;
  address public CompoundKovanAddress = 0x5eae89dc1c671724a672ff0630122ee834098657;
  address public CompoundRinkebyAddress = 0x2eaa9d77ae4d8f9cdd9faacd44016e746485bddb;
  // comp works slightly differently to the other contracts. to call these functions, the getAllMarkets function needs to be called on the comptroller,
  // which returns a list of addresses for all ctokens, which the below functions can be used on.
  string[4] public CompoundcTokenFunctions = [
    "mint(uint mintAmount) returns (uint)", "redeem(uint redeemTokens) returns (uint)",
    "borrow(uint borrowAmount) returns (uint)", "repayBorrow(uint repayAmount) returns (uint)",
  ]
}