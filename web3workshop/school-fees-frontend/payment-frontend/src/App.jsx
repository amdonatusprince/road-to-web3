import Form from './components/form/form'
import React, { useState } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, bscTestnet, bsc, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, bscTestnet, bsc, sepolia],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_REACT_APP_ALCHEMY_ID}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'UNN School Fees Payment',
  projectId: '274de4271228fdd69013c56274f0e688',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {

  return (

    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      < Form />
      </RainbowKitProvider>
    </WagmiConfig>

  )
}

export default App
