import React from 'react'
import Button from '@components/Button'

function NavBar() {
  return (
    <div className="flex justify-between pt-6 pr-8 pl-8">
      <p className="text-3xl text-white">TREASURE BUIDL</p>
      <Button size='large' textColor="white" bgColor="purple">CONNECT WALLET</Button>
    </div>
  )
}

export default NavBar
