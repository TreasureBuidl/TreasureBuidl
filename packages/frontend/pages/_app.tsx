import '../styles/globals.css'
import { TreasureProvider } from '../contexts/TreasureContext';

function MyApp({ Component, pageProps }) {
  return (
    <TreasureProvider>
      <Component {...pageProps} />
    </TreasureProvider>
  );
}

export default MyApp
