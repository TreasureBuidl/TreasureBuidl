import React from 'react'
import { Amount } from 'types/Treasure.types'
import TokenIcon from '@components/TokenIcon'

function AmountInput({ amount, handleChange }: { amount: Amount, handleChange: () => {} }) {

  return (
    <div className='flex flex-row ml-4 mt-4' style={{height: 32}}>
      <TokenIcon token={amount.token} />
      <div className='text-white font-medium text-lg pl-4'>
        {amount.token}
      </div>
      <input className="w-2/5 ml-6 py-1 px-2 text-white text-right leading-tight focus:outline-none" type="text" placeholder="1000.00"
        style={{background: 'transparent'}} value={amount.quantity} onChange={handleChange}/>
    </div>
  )
}

export default AmountInput
