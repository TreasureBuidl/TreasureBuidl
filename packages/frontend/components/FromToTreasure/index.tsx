import React from 'react'
import useTreasure from 'hooks/useTreasure'
import TokenAmountRow from '@components/TokenAmountRow'

function FromToTreasure() {
  const { fromTreasureAmounts, toTreasureAmounts } = useTreasure()

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="bg-darkerBlue border-white border-2 rounded-lg overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue"
        style={{ width: 265, minHeight: 88, maxHeight: 144 }}
      >
        <div className="flex flex-col mt-2">
          <div className="text-offWhite text-sm text-center">From Treasure</div>
          {fromTreasureAmounts.length ? (
            <div className="flex flex-col mb-4">
              {fromTreasureAmounts.map((amount) => {
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
      <div
        className="ml-16 bg-darkerBlue border-white border-2 rounded-lg overflow-y-scroll scrollbar scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue"
        style={{ width: 265, minHeight: 88, maxHeight: 144 }}
      >
        <div className="flex flex-col mt-2">
          <div className="text-offWhite text-sm text-center">To Treasure</div>
          {toTreasureAmounts.length ? (
            <div className="flex flex-col mb-4">
              {toTreasureAmounts.map((amount) => {
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
  )
}

export default FromToTreasure
