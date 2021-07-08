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

export type Amount = {
  quantity?: number
  token: Token
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
}
