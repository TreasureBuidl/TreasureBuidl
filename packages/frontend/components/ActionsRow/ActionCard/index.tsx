import React from 'react'
import { Action, Protocol } from 'types/Treasure.types'
import classnames from 'classnames'

function ActionCard({ action }: { action: Action }) {
  const getBackground = (protocol: Protocol): string => {
    switch (protocol) {
      case Protocol.Aave:
        return 'url(/images/cards/aaveCard.png)'
      case Protocol.Compound:
        return 'url(/images/cards/compoundCard.png)'
      case Protocol.Uniswap:
        return 'url(/images/cards/uniswapCard.png)'
      default:
        return 'url(/images/cards/defaultCard.png)'
    }
  }

  return (
    // will this be a problem for postcss?
    <div
      className="-ml-5 bg-no-repeat bg-center"
      style={{
        backgroundImage: getBackground(action.type.protocol),
        width: 315,
        height: 373,
      }}
    >
      <div
        className={classnames(
          'ml-4 mt-4 font-bold text-white text-center py-2 px-4 rounded-lg text-sm',
          {
            'bg-aave': action.type.protocol === Protocol.Aave,
            'bg-compound': action.type.protocol === Protocol.Compound,
            'bg-uniswap': action.type.protocol === Protocol.Uniswap,
          }
        )}
        style={{ width: 244 }}
      >
        {action.type.operation}
      </div>
    </div>
  )
}

export default ActionCard
