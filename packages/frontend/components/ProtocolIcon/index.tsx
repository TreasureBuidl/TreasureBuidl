import React from 'react'
import { Protocol } from 'types/Treasure.types'

function ProtocolIcon({ protocol }: { protocol: Protocol }) {

  const getBackground = (protocol: Protocol): string => {
    // #TODO: Add the rest of the protocol images
    switch (protocol) {
      case Protocol.Aave:
        return 'url(/images/protocolIcons/aaveIcon.png)'
      case Protocol.Compound:
        return 'url(/images/protocolIcons/compoundIcon.png)'
      case Protocol.TreasureBuidl:
        return 'url(/images/protocolIcons/treasureBuidlIcon.png)'
      case Protocol.Uniswap:
        return 'url(/images/protocolIcons/uniswapIcon.png)'
      default:
        return ''
    }
  }

  return (
    <div className='bg-no-repeat bg-center' style={{backgroundImage: getBackground(protocol), width: 72, height: 72}}>
    </div>
  )
}

export default ProtocolIcon
