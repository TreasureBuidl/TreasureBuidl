import { v4 as uuidv4 } from 'uuid'
import Button, { ButtonShape, ButtonSize } from '@components/Button/Button'
import useTreasure from 'hooks/useTreasure'
import { useEffect } from 'react'
import { useState } from 'react'
import { Action, Operation, Protocol } from 'types/Treasure.types'

type ActionModalProps = {
  toggleActionModal: (state: boolean) => void
}

export default function ActionModal({ toggleActionModal }: ActionModalProps) {
  const [actions, setActions] = useState([])
  const { addAction } = useTreasure()

  const protocols = Array.from(
    new Set(actions.map((actions: Action) => actions.type.protocol))
  )

  const handleActionSelection = (action: Action) => {
    addAction(action)
    toggleActionModal(false)
  }

  useEffect(() => {
    // How should we load actions?
    setActions([
      {
        id: uuidv4(),
        type: {
          protocol: Protocol.Aave,
          operation: Operation.borrow,
        },
      },
      {
        id: uuidv4(),
        type: {
          protocol: Protocol.Compound,
          operation: Operation.collectComp,
        },
      },
      {
        id: uuidv4(),
        type: {
          protocol: Protocol.Compound,
          operation: Operation.deposit,
        },
      },
    ])
  }, [])

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="w-3/4 h-3/4 bg-darkBlue border-white border-2 rounded-lg p-10">
        <div className="grid grid-cols-3 grid-flow-col items-center mb-10">
          <h2 className="col-start-2 text-center uppercase text-2xl">
            New Action
          </h2>
          <div className="col-start-3 flex flex-row justify-end">
            <div
              onClick={() => toggleActionModal(false)}
              className="w-10 transform rotate-45 text-5xl cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
        <div>
          {protocols.map((protocol) => (
            <div key={protocol} className="mb-10">
              <div className="uppercase text-xl mb-10">{protocol}</div>
              <div className="flex flex-row justify-start">
                {actions
                  .filter((action) => action.type.protocol === protocol)
                  .map((action) => (
                    <div key={action.id} className="mr-10">
                      <Button
                        size={ButtonSize.Small}
                        buttonType={action.type.protocol}
                        buttonShape={ButtonShape.Wide}
                        onClick={() => handleActionSelection(action)}
                      >
                        {action.type.operation}
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
