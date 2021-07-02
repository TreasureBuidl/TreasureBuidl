import '../styles/globals.css'
import { TreasureProvider } from '../contexts/TreasureContext';
import { UseWalletProvider } from 'use-wallet'

function MyApp({ Component, pageProps }) {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        // #TODO: insert dAppId
        portis: { dAppId: 'my-dapp-id-123-xyz' },
      }}
    >
      <TreasureProvider>
        <Component {...pageProps} />
      </TreasureProvider>
    </UseWalletProvider>
  );
}

export default MyApp
