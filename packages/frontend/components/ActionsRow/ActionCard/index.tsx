import React from 'react'
import { Action, Protocol } from 'types/Treasure.types'
import AmountInput from '@components/ActionsRow/ActionCard/AmountInput'
import ProtocolIcon from '@components/ProtocolIcon'
import useTreasure from 'hooks/useTreasure'
import classnames from 'classnames'

function ActionCard({ action }: { action: Action }) {
  const { updateAction } = useTreasure()

  const handleInputQuantityChange = (event) => {
    if (action.inputToOutput != null) {
      updateAction({
        ...action,
        input: {
          ...action.input,
          quantity: event.target.value,
        },
        output: {
          ...action.output,
          quantity: event.target.value,
        }
      })
    } else {
      updateAction({
        ...action,
        input: {
          ...action.input,
          quantity: event.target.value,
        },
      })
    }
  }

  const handleOutputQuantityChange = (event) => {
    updateAction({
      ...action,
      output: {
        ...action.output,
        quantity: event.target.value,
      },
    })
  }

  const handleInputTokenChange = (event) => {
    if (action.inputToOutput != null) {
      updateAction({
        ...action,
        input: {
          ...action.input,
          token: event.target.value,
        },
        output: {
          ...action.output,
          token: action.inputToOutput(event.target.value),
        }
      })
    } else {
      updateAction({
        ...action,
        input: {
          ...action.input,
          token: event.target.value,
        },
      })
    }
  }

  const handleOutputTokenChange = (event) => {
    updateAction({
      ...action,
      output: {
        ...action.output,
        token: event.target.value,
      },
    })
  }

  const inputBoxHeight = 126
  const outputBoxHeight = 170

  return (
    <div className="flex flex-col">
      <div className="pr-14 pb-2 self-center">
        <ProtocolIcon url={action.iconUrl} />
      </div>
      <div
        className="-ml-5 bg-no-repeat bg-center"
        style={{
          backgroundImage: action.cardUrl || 'url(/images/cards/defaultCard.png)',
          width: 315,
          height: 373,
        }}
      >
        <div
          className={classnames(
            'ml-4 mt-4 font-bold text-white text-center py-2 px-4 rounded-lg text-sm',
            action.cssClass
          )}
          style={{ width: 244 }}
        >
          {action.type.operation}
        </div>
        <form>
          <div className="flex flex-col">
            {action.input ? (
              <div className="flex flex-col" style={{ height: inputBoxHeight }}>
                <div className="text-offWhite text-sm pl-4 pt-2">Input</div>
                <div style={{ height: inputBoxHeight }}>
                  <AmountInput
                    amount={action.input}
                    handleQuantityChange={handleInputQuantityChange}
                    handleTokenChange={handleInputTokenChange}
                  />
                </div>
              </div>
            ) : (
              <div style={{ height: inputBoxHeight }}></div>
            )}
            <div
              className={classnames('ml-11', action.cssClass)}
              style={{ width: 214, height: 2 }}
            ></div>
            {action.output ? (
              <div
                className="flex flex-col"
                style={{ height: outputBoxHeight }}
              >
                <div className="text-offWhite text-sm pl-4 pt-10">Output</div>
                <div style={{ height: inputBoxHeight }}>
                  <AmountInput
                    amount={action.output}
                    handleQuantityChange={handleOutputQuantityChange}
                    handleTokenChange={handleOutputTokenChange}
                  />
                </div>
              </div>
            ) : (
              <div style={{ height: outputBoxHeight }}></div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActionCard
