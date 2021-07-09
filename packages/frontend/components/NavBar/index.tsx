import React from 'react'
import ConnectWalletButton from '@components/NavBar/ConnectWalletButton'
import TreasureButton from './TreasureButton'
import useEthers from 'hooks/useEthers'

function NavBar() {
  const { web3Modal } = useEthers()
  const isConnected = web3Modal.cachedProvider

  return (
    <div className="flex justify-between pt-6 pr-8 pl-8">
      <div className="flex flex-row justify-start">
        <div
          className="bg-no-repeat bg-center hover:bg-purple-dark mr-2"
          style={{
            backgroundImage: 'url(/images/protocolIcons/treasureBuidlIcon.png)',
            width: 74,
            height: 52,
          }}
        ></div>
        <div
          className="bg-no-repeat bg-center hover:bg-purple-dark"
          style={{
            backgroundImage: 'url(/images/logoText.png)',
            width: 324,
            height: 54,
          }}
        ></div>
      </div>
      <div className="flex flex-row space-x-4" style={{ height: 54 }}>
        {isConnected && <TreasureButton />}
        <ConnectWalletButton />
      </div>
    </div>
  )
}

export default NavBar
