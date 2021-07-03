import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import { useWallet } from 'use-wallet'

function ConnectWalletButton() {
  const wallet = useWallet()

  const connectWallet = async (e) => {
    await wallet.connect()
  }

  const disconnectWallet = () => {
    wallet.reset()
  }

  const getShortenedAddress = () => {
    return `${wallet.account.substring(0, 6)}...${wallet.account.slice(-4)}`
  }

  const isConnected = wallet.status === 'connected'

  return (
    <Button size={ButtonSize.Large} protocolCssClass={ButtonType.Primary} onClick={isConnected ? disconnectWallet : connectWallet}>
      <div className='flex flex-row'>
        {isConnected && <div className='bg-no-repeat bg-center mr-4' style={{backgroundImage: 'url(/images/metamaskIcon.png)', width: 32, height: 32}}></div>}
        <span>
          {isConnected ? getShortenedAddress() : 'CONNECT WALLET'}
        </span>
      </div>
    </Button>
  )
}

export default ConnectWalletButton
