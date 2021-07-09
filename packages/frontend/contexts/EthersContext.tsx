import WalletConnectProvider from "@walletconnect/web3-provider"
import WalletLink from "walletlink"
import React, { useCallback, useEffect, useState, createContext } from "react"
import Web3Modal from "web3modal"
import { INFURA_ID, NETWORKS } from "utils/constants"
import useUserSigner from "hooks/useUserSigner"
import useContractLoader from "hooks/useContractLoader"
import useGasPrice from "hooks/useGasPrice"
import Transactor from "helpers/Transactor"
const { ethers } = require("ethers")
const Web3 = require("web3")

const initialEthersState = {
  address: null,
  injectedProvider: null,
  localProvider: null,
  web3: null,
  web3Modal: null,
  tx: null,
  writeContracts: null,
  treasureAddress: null,
  createdTreasureMaps: [],
};

const EthersContext = createContext({
  ...initialEthersState,
  loadWeb3Modal: (web3Modal, logoutOfWeb3Modal) => {},
  logoutOfWeb3Modal: () => {},
  loadTreasureAddress: (writeContracts, userAddress, tx) => {},
  loadCreatedTreasureMaps: (writeContracts, userAddress, tx) => {},
});

export const EthersProvider = ({ children }) => {
  /// 📡 What chain are your contracts deployed to?
  const targetNetwork = NETWORKS.kovan; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
  // 🏠 Your local provider is usually pointed at your local blockchain
  const localProviderUrl = targetNetwork.rpcUrl;
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [treasureAddress, setTreasureAddress] = useState();
  const [createdTreasureMaps, setCreatedTreasureMaps] = useState([]);
  const [localProvider, setLocalProvider] = useState(new ethers.providers.StaticJsonRpcProvider(localProviderUrl));
  // need Web3 for encoding params later
  const [web3, setWeb3] = useState(new Web3(localProviderUrl));
  // when connecting to mainnet, use below
  // const mainnetProvider = new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);

  // Use your injected provider from 🦊 Metamask
  const userSigner = useUserSigner(injectedProvider);
  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const writeContracts = useContractLoader(userSigner, treasureAddress, { chainId: localChainId });

  const loadCreatedTreasureMaps = useCallback(async (writeContracts, userAddress, tx) => {
    if (writeContracts) {
      const result = await tx(writeContracts.TreasureMaps?.getAllCreatedMaps(userAddress), null);
      if (result) {
        const newResult = result.flatMap(i => { return parseInt(i._hex) })
        setCreatedTreasureMaps(newResult)
      }
    }
  }, [setCreatedTreasureMaps])

  const loadTreasureAddress = useCallback(async (writeContracts, userAddress, tx) => {
    if (writeContracts) {
      const result = await tx(writeContracts.TokenOwnership?.getOwnedContract(userAddress), null);
      if (parseInt(result ?? '0')) setTreasureAddress(result)
    }
  }, [setTreasureAddress])

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);

        // get owned treasure
        loadTreasureAddress(writeContracts, newAddress, tx)
        // get previously created treasure maps
        loadCreatedTreasureMaps(writeContracts, newAddress, tx)
      }
    }
    getAddress();
  }, [userSigner, writeContracts]);

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
        web3,
        web3Modal,
        tx,
        writeContracts,
        treasureAddress,
        createdTreasureMaps,
        loadWeb3Modal,
        logoutOfWeb3Modal,
        loadTreasureAddress,
        loadCreatedTreasureMaps,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export {
  EthersContext
}