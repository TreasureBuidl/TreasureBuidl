import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'
import React from 'react'
import useEthers from 'hooks/useEthers'
import useTreasure from 'hooks/useTreasure'
import TokenAmountRow from '@components/TokenAmountRow'

export default function TreasureModal({ toggle }) {
  const { treasureAddress } = useEthers()
  const { actualTreasureAmounts } = useTreasure()

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="bg-darkBlue border-white border-2 rounded-lg p-5 overflow-y-scroll scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue flex justify-center">
        <div>
          <div className="flex flex-row items-center mb-10 justify-between">
            <div className="flex flex-row items-center">
              <h2 className="text-xl uppercase mr-2">Treasure</h2>
            </div>

            <div className="mr-5">{treasureAddress}</div>
            <div>
              <div
                onClick={() => toggle()}
                className="w-10 transform rotate-45 text-5xl cursor-pointer align-right"
              >
                +
              </div>
            </div>
          </div>
          <div className="bg-darkerBlue p-16 text-white flex flex-col justify-center items-center  border-white border-2 mb-10 mx-28">
            <div className="flex flex-row  mb-4 items-center justify-center" style={{ minWidth: 180 }}>
              <div className="flex flex-row items-center">
                {actualTreasureAmounts.length ? (
                  <div className="flex flex-col mb-4">
                    {actualTreasureAmounts.map((amount) => {
                      return (
                        <div className="mt-2">
                          <TokenAmountRow key={amount.token} amount={amount} />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-white text-lg text-center mt-2">N/A</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <Button
              size={ButtonSize.Large}
              buttonShape={ButtonShape.Wide}
              protocolCssClass={ButtonType.Primary}
              onClick={() => {}}
            >
              Deposit
            </Button>
            <Button
              size={ButtonSize.Large}
              buttonShape={ButtonShape.Wide}
              protocolCssClass={ButtonType.Primary}
              onClick={() => {}}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
