import React from 'react'
import Button from '@components/Button'
import { ButtonSize, ButtonType } from '@components/Button'

function NavBar() {
  return (
    <div className="flex justify-between pt-6 pr-8 pl-8">
      <p className="text-3xl text-white">TREASURE BUIDL</p>
      <Button size={ButtonSize.Large} buttonType={ButtonType.Primary}>CONNECT WALLET</Button>
    </div>
  )
}

export default NavBar
