export enum Protocol {
  Aave = 'Aave V2',
  Compound = 'Compound',
  TreasureBuidl = 'Treasure Buidl',
  Uniswap = 'Uniswap V2',
  Balancer = 'Balancer V1',
  StakeDao = 'Stake Dao',
}

// #TODO: not all of them, just the ones from the designs
export enum Operation {
  addLiquidity = 'ADD LIQUIDITY',
  batchSwap = 'BATCH SWAP',
  borrow = 'BORROW',
  collectComp = 'COLLECT COMP',
  deposit = 'DEPOSIT',
  flashloan = 'FLASHLOAN',
  queryBatchSwap = 'QUERY BATCH SWAP',
  removeLiquidity = 'REMOVE LIQUIDITY',
  repay = 'REPAY',
  supply = 'SUPPLY',
  swap = 'SWAP TOKEN',
  withdraw = 'WITHDRAW',
}

export type ActionType = {
  protocol: Protocol
  operation: Operation
}

// #TODO: not all of them, just the ones from the designs
export enum Token {
  aUNI = 'aUNI',
  aUSDC = 'aUSDC',
  aUSDT = 'aUSDT',
  cUNI = 'cUNI',
  cUSDT = 'cUSDT',
  cUSDC = 'cUSDC',
  Dai = 'DAI',
  Ether = 'ETH',
  Uni = 'UNI',
  USDC = 'USDC',
  USDT = 'USDT',
}

// #TODO: these are for KOVAN only currently, update how we retrieve these
// #TODO: find these addresses
export enum TokenAddress {
  aUNI = '',
  aUSDC = '0x02F626c6ccb6D2ebC071c068DC1f02Bf5693416a',
  aUSDT = '0xA01bA9fB493b851F4Ac5093A324CB081A909C34B',
  cUNI = '',
  cUSDT = '0x3f0a0ea2f86bae6362cf9799b523ba06647da018',
  cUSDC = '0x4a92e71227d294f041bd82dd8f78591b75140d63',
  Dai = '0x1528F3FCc26d13F7079325Fb78D9442607781c8C',
  Ether = '',
  Uni = '',
  USDC = '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5',
  USDT = '0xf3e0d7bf58c5d455d31ef1c2d5375904df525105',
}

export type Amount = {
  quantity?: number
  token: Token
}

export type ContractInfo = {
  address: string
  functionSig: string
  paramTypes: string[]
  paramNames: string[]
  paramToolTips: string[]
}

export type Action = {
  id: string
  type: ActionType
  input?: Amount
  output?: Amount
  iconUrl: string
  cardUrl: string
  cssClass: string
  inputToOutput: Function
  contracts?: ContractInfo
}
