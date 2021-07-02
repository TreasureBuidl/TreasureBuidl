import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'

function NavBar() {
  return (
    <div className="flex justify-between pt-6 pr-8 pl-8">
      <div className="flex flex-row justify-between" style={{ width: 350 }}>
        <div className='bg-no-repeat bg-center' style={{ backgroundImage: 'url(/images/protocolIcons/treasureBuidlIcon.png)', width: 74, height: 52 }}></div>
        <p className="font-display text-4xl text-white self-center">TREASURE BUIDL</p>
      </div>
      <Button size={ButtonSize.Large} buttonType={ButtonType.Primary}>
        CONNECT WALLET
      </Button>
    </div>
  )
}

export default NavBar
