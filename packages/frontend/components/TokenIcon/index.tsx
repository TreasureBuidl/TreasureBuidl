import React from 'react'
import { Token } from 'types/Treasure.types'

function TokenIcon({token}: {token: Token}) {

  // #TODO: Add the rest of the token images
  const getBackground = (token: Token): string => {
    switch(token) {
      case Token.aUNI:
        return 'url(/images/tokens/uniToken.png)'
      case Token.aUSDC:
        return 'url(/images/tokens/usdcToken.png)'
      case Token.aUSDT:
        return 'url(/images/tokens/usdtToken.png)'
      case Token.cUSDC:
        return 'url(/images/tokens/usdcToken.png)'
      case Token.cUSDT:
        return 'url(/images/tokens/usdtToken.png)'
      case Token.cUNI:
        return 'url(/images/tokens/cUniToken.png)'
      case Token.Dai:
        return 'url(/images/tokens/daiToken.png)'
      case Token.Ether:
        return 'url(/images/tokens/etherToken.png)'
      case Token.Uni:
        return 'url(/images/tokens/uniToken.png)'
      case Token.USDC:
        return 'url(/images/tokens/usdcToken.png)'
      case Token.USDT:
        return 'url(/images/tokens/usdtToken.png)'
      default:
        return ''
    }
  }

  return (
    <div className='bg-no-repeat bg-center' style={{backgroundImage: getBackground(token), width: 32, height: 32}}>
    </div>
  )
}

export default TokenIcon
