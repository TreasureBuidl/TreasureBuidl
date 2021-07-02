import React from 'react'
import TokenIcon from '@components/TokenIcon'
import { Amount, Token } from 'types/Treasure.types'

function TokenAmountRow({ amount }: { amount: Amount }) {

  return (
    <div className='flex flex-row items-center justify-center'>
      <TokenIcon token={amount.token} />
      <div className="ml-4 text-white text-lg text-center">
        {amount.token}
      </div>
      <div className="ml-4 text-white text-sm text-right">
        {amount.quantity ?? ''}
      </div>
    </div>
  )
}

export default TokenAmountRow
