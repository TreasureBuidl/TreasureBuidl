import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useEthers from 'hooks/useEthers'

function ConnectWalletButton() {
  const { address, web3Modal, loadWeb3Modal, logoutOfWeb3Modal } = useEthers()

  const getShortenedAddress = () => {
    if (!address) return 'Connecting...'
    return `${address.substring(0, 6)}...${address.slice(-4)}`
  }

  const isConnected = web3Modal.cachedProvider

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={
        isConnected
          ? logoutOfWeb3Modal
          : () => {
              loadWeb3Modal(web3Modal, logoutOfWeb3Modal)
            }
      }
    >
      <div className="flex flex-row items-center" style={{ minWidth: 168 }}>
        {isConnected && (
          <div
            className="bg-no-repeat bg-center mr-4"
            style={{
              backgroundImage: 'url(/images/icons/metamaskIcon.png)',
              width: 32,
              height: 32,
            }}
          ></div>
        )}
        <span>{isConnected ? getShortenedAddress() : 'CONNECT WALLET'}</span>
      </div>
    </Button>
  )
}

export default ConnectWalletButton
