import { SUPPORT_CHAIN, SUPPORT_CONNECTOR } from '@/conf'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'


export const { chains, publicClient, webSocketPublicClient } = configureChains(SUPPORT_CHAIN, [publicProvider()], {
  batch: {
    multicall: true,
  },
})

export const wagmiConf = createConfig({
  autoConnect: process.env.NODE_ENV === 'production',
  connectors: SUPPORT_CONNECTOR,
  publicClient,
  webSocketPublicClient
})
