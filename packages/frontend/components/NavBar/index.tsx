import React from 'react'
import Button from '@components/Button'
import ConnectWalletButton from '@components/ConnectWalletButton'
import { ButtonSize, ButtonType } from '@components/Button'
import Connection from '@components/Connection/Connection'

function NavBar() {
  return (
    <div className="flex justify-between pt-6 pr-8 pl-8">
      <p className="text-3xl text-white">TREASURE BUIDL</p>
      <ConnectWalletButton />
    </div>
  )
}

export default NavBar
