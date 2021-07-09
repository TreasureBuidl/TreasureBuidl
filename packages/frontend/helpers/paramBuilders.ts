import { Token, TokenAddress } from "types/Treasure.types"
const { DateTime } = require("luxon");

export type DepositInput = {
  token: Token
  amount: string
  toAddress: string
}


export const buildDepositParams = (params: DepositInput) => {
  const asset = TokenAddress[params.token]
  const amount = params.amount
  const onBehalfOf = params.toAddress
  const referralCode = "0"

  return [
    asset,
    amount,
    onBehalfOf,
    referralCode,
  ]
}

export type WithdrawInput = {
  token: Token
  amount: string
  toAddress: string
}

export const buildWithdrawParams = (params: WithdrawInput) => {
  const asset = TokenAddress[params.token]
  const amount = params.amount
  const to = params.toAddress

  return [
    asset,
    amount,
    to,
  ]
}

export type SwapExactTokensInput = {
  tokenA: Token
  tokenB: Token
  amountIn: string
  toAddress: string
}

export const buildSwapExactTokensParams = (params: SwapExactTokensInput) => {
  const amountIn = params.amountIn
  // #TODO: fix logic for amountOut
  const amountOutMin = "0"
  // #TODO: fix, currently only retrieving KOVAN token addresses
  const tokenAddresses = [TokenAddress[params.tokenA], TokenAddress[params.tokenB]]
  const to = params.toAddress
  const deadline = DateTime.now().setZone('UTC').plus({minutes: 1}).ts.toString()

  return [
    amountIn,
    amountOutMin,
    tokenAddresses,
    to,
    deadline,
  ]
}

export const encodeParams = (paramTypes: string[], params: string[], web3): string => {
  let encoded: string[] = []

  for (let i = 0; i < params.length; i++) {
      encoded[i] = web3.eth.abi.encodeParameter(paramTypes[i], params[i])
  }

  // Starts with 0x as first param needs to start with 0x.
  let concatEncoded = "0x"

  for (let i = 0; i < params.length; i++) {
      let fullEncoded: string = encoded[i]
      // Slices of the 0x
      fullEncoded = fullEncoded.slice(2)
      // Adds it to the string
      concatEncoded = concatEncoded.concat(fullEncoded)
  }

  return concatEncoded
}