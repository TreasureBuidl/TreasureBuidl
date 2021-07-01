import React from 'react'
import { Action, Protocol } from 'types/Treasure.types'
import AmountInput from '@components/ActionsRow/ActionCard/AmountInput'
import ProtocolIcon from '@components/ProtocolIcon'
import useTreasure from 'hooks/useTreasure'
import classnames from 'classnames'

function ActionCard({ action }: { action: Action }) {
  const { updateAction } = useTreasure();

  const getBackground = (protocol: Protocol): string => {
    // #TODO: Add the rest of the protocol images
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

  const handleInputQuantityChange = (event) => {
    updateAction({
      ...action,
      input: {
        ...action.input,
        quantity: event.target.value,
      }
    })
  }

  const handleOutputQuantityChange = (event) => {
    updateAction({
      ...action,
      output: {
        ...action.output,
        quantity: event.target.value,
      }
    })
  }

  const handleInputTokenChange = (event) => {
    updateAction({
      ...action,
      input: {
        ...action.input,
        token: event.target.value,
      }
    })
  }

  const handleOutputTokenChange = (event) => {
    updateAction({
      ...action,
      output: {
        ...action.output,
        token: event.target.value,
      }
    })
  }

  const inputBoxHeight = 126
  const outputBoxHeight = 170

  return (
    <div className='flex flex-col'>
      <div className="pr-14 pb-2 self-center">
        <ProtocolIcon protocol={action.type.protocol} />
      </div>
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
              'bg-purple': action.type.protocol === Protocol.TreasureBuidl,
              'bg-uniswap': action.type.protocol === Protocol.Uniswap,
            }
          )}
          style={{ width: 244 }}
        >
          {action.type.operation}
        </div>
        <form>
          <div className='flex flex-col'>
            {action.input ? (
              <div className='flex flex-col' style={{height: inputBoxHeight}}>
                <div className='text-offWhite text-sm pl-4 pt-2'>
                  Input
                </div>
                <div style={{height: inputBoxHeight}}>
                  <AmountInput amount={action.input} handleQuantityChange={handleInputQuantityChange} handleTokenChange={handleInputTokenChange}/>
                </div>
              </div>
            ) : (
              <div style={{height: inputBoxHeight}}>
              </div>
            )}
            <div className={classnames('ml-11', {
              "bg-aave": action.type.protocol === Protocol.Aave,
              "bg-compound": action.type.protocol === Protocol.Compound,
              'bg-purple': action.type.protocol === Protocol.TreasureBuidl,
              "bg-uniswap": action.type.protocol === Protocol.Uniswap
              })} style={{width: 214, height: 2}}></div>
            {action.output ? (
              <div className='flex flex-col' style={{height: outputBoxHeight}}>
                <div className='text-offWhite text-sm pl-4 pt-10'>
                  Output
                </div>
                <div style={{height: inputBoxHeight}}>
                  <AmountInput amount={action.output} handleQuantityChange={handleOutputQuantityChange} handleTokenChange={handleOutputTokenChange}/>
                </div>
              </div>
            ) : (
              <div style={{height: outputBoxHeight}}>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActionCard
