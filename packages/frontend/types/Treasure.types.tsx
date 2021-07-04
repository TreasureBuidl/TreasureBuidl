export enum Protocol {
  Aave = 'Aave V2',
  Compound = 'Compound',
  TreasureBuidl = 'Treasure Buidl',
  Uniswap = 'Uniswap V2',
  Balancer = 'Balancer V1',
}

// #TODO: not all of them, just the ones from the designs
export enum Operation {
  addLiquidity = 'ADD LIQUIDITY',
  borrow = 'BORROW',
  closeFlashloan = 'CLOSE FLASHLOAN',
  collectComp = 'COLLECT COMP',
  deposit = 'DEPOSIT',
  openFlashloan = 'OPEN FLASHLOAN',
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
  aUSDC = 'aUSDC',
  aUSDT = 'aUSDT',
  cUNI = 'cUNI',
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
}
