export enum Protocol {
  Aave,
  Compound,
  Uniswap
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
  protocol: Protocol;
  operation: Operation;
}

// #TODO: not all of them, just the ones from the designs
export enum Token {
  aUSDC,
  aUSDT,
  cUNI,
  Dai,
  Ether,
  Uni,
  USDC,
  USDT
}

export type Amount = {
  quantity: number;
  token: Token;
}

export type Action = {
  id: string;
  type: ActionType;
  input?: Amount;
  output?: Amount;
};