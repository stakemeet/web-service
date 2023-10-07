import type { AppProps } from 'next/app'

import '../styles/globals.css'

import '@fontsource/roboto/700.css'

import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)
 
// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.REACT_APP_PROJECT_ID,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig config={config}>
    <Component {...pageProps} />
  </WagmiConfig>
}
