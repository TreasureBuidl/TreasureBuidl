import TokenAmountRow from '@components/TokenAmountRow'
import { Amount } from 'types/Treasure.types'

type TreasureAmountsProps = {
  actualTreasureAmounts: Amount[]
}

export default function TreasureAmounts({
  actualTreasureAmounts,
}: TreasureAmountsProps) {
  return (
    <div className="bg-darkerBlue p-16 text-white flex flex-col justify-center items-center  border-white border-2 mb-10">
      <div
        className="flex flex-row  mb-4 items-center justify-center"
        style={{ minWidth: 180 }}
      >
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
  )
}
