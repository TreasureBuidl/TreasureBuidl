import ReactDOM from 'react-dom'

import { Token } from 'types/Treasure.types'

import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'
import React from 'react'
import TokenIcon from '@components/TokenIcon'
import useEthers from 'hooks/useEthers'

export default function TreasureModal({ toggle }) {
  const { treasureAddress } = useEthers()

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="w-50 h-46 bg-darkBlue border-white border-2 rounded-lg p-10 overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue flex justify-center">
        <div>
          <div className="flex flex-row items-center mb-10 justify-between">
            <div className="flex flex-row items-center">
              <h2 className="text-xl uppercase mr-2">Treasure</h2>
            </div>

            <div>{treasureAddress}</div>
            <div className="col-start-3 flex flex-row justify-end">
              <div
                onClick={() => toggle()}
                className="w-10 transform rotate-45 text-5xl cursor-pointer"
              >
                +
              </div>
            </div>
          </div>
          <div className="bg-darkerBlue p-16 text-white flex flex-col justify-center items-center  border-white border-2 mb-10 mx-28">
            <div className="flex flex-row  mb-4 items-center justify-center">
              <div className="mr-16 flex flex-row items-center">
                <div className="mr-4">
                  <TokenIcon token={Token.aUSDC} />
                </div>
                <div>aUSDC</div>
              </div>
              <div>999.98</div>
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
