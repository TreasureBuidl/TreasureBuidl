import WalletConnectProvider from "@walletconnect/web3-provider"
import WalletLink from "walletlink"
import React, { useCallback, useEffect, useState, createContext } from "react"
import Web3Modal from "web3modal"
import { INFURA_ID, NETWORKS } from "utils/constants"
import useUserSigner from "hooks/useUserSigner"
const { ethers } = require("ethers")

const initialEthersState = {
  address: null,
  injectedProvider: null,
  localProvider: null,
  web3Modal: null,
};

const EthersContext = createContext({
  ...initialEthersState,
  loadWeb3Modal: (web3Modal, logoutOfWeb3Modal) => {},
  logoutOfWeb3Modal: () => {},
});

export const EthersProvider = ({ children }) => {
  /// 📡 What chain are your contracts deployed to?
  const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
  // 🏠 Your local provider is usually pointed at your local blockchain
  const localProviderUrl = targetNetwork.rpcUrl;
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [localProvider, setLocalProvider] = useState(new ethers.providers.StaticJsonRpcProvider(localProviderUrl));
  // when connecting to mainnet, use below
  // const mainnetProvider = new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);

  // Use your injected provider from 🦊 Metamask
  const userSigner = useUserSigner(injectedProvider);

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // Coinbase walletLink init
  const walletLink = new WalletLink({
    appName: 'coinbase',
  });

  // WalletLink provider
  const walletLinkProvider = walletLink.makeWeb3Provider(
      `https://mainnet.infura.io/v3/${INFURA_ID}`,
      1,
  );

  /*
    Web3 modal helps us "connect" external wallets:
  */
  const web3Modal = new Web3Modal({
    network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
    cacheProvider: true, // optional
    theme:"dark", // optional. Change to "light" for a light theme.
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID,
          rpc: {
            1:`https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
            100:"https://dai.poa.network", // xDai
          },
        },
      },
      'custom-walletlink': {
        display: {
          logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
          name: 'Coinbase',
          description: 'Connect to Coinbase Wallet (not Coinbase App)',
        },
        package: walletLinkProvider,
        connector: async (provider, options) => {
          await provider.enable();
          return provider;
        },
      },
    },
  });

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const loadWeb3Modal = useCallback(async (web3Modal, logoutOfWeb3Modal) => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal(web3Modal, logoutOfWeb3Modal);
    }
  }, [loadWeb3Modal]);

  return (
    <EthersContext.Provider
      value={{
        address,
        injectedProvider,
        localProvider,
        web3Modal,
        loadWeb3Modal,
        logoutOfWeb3Modal,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export {
  EthersContext
}