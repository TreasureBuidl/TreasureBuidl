import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function Connection() {
    const wallet = useWallet()

    const connectWallet = async (e) => {
        e.preventDefault()
        await wallet.connect()
    }
    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet!!</button>
        </div>
    )
}

export default () => (
    <UseWalletProvider
        chainId={1}
        connectors={{
            // This is how connectors get configured
            portis: { dAppId: 'my-dapp-id-123-xyz' },
            //provided: {provider: window.cleanEthereum},
        }}
    >
        <Connection />
    </UseWalletProvider>
)