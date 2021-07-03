import '../styles/globals.css'
import { TreasureProvider } from '../contexts/TreasureContext'
import { EthersProvider } from '../contexts/EthersContext'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <EthersProvider>
        <TreasureProvider>
          <Component {...pageProps} />
        </TreasureProvider>
      </EthersProvider>
    </SafeHydrate>
  );
}

export default MyApp
