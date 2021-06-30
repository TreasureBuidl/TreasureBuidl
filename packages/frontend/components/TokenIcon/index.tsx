import React from 'react'
import { Token } from 'types/Treasure.types'

function TokenIcon({token}: {token: Token}) {

  // #TODO: Add the rest of the token images
  const getBackground = (token: Token): string => {
    switch(token) {
      case Token.USDC:
        return 'url(/images/tokens/usdcToken.png)'
      case Token.USDT:
        return 'url(/images/tokens/usdtToken.png)'
      default:
        return 'url(/images/tokens/usdcToken.png)'
    }
  }

  return (
    <div className='bg-no-repeat bg-center' style={{backgroundImage: getBackground(token), width: 32, height: 32}}>
    </div>
  )
}

export default TokenIcon
