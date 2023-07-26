import { Chain, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect, useCallback, useMemo } from 'react'

import { DEFAULT_CHAIN, SUPPORT_CHAIN } from '@/conf'
import useVisible from './useVisible'

// save key
export const ChainSaveKey = 'chain'
export interface IChainState {
  chain?: Chain
  setChain: (chainId: number) => void
}
// store
export const useChainStore = create<IChainState>()(
  persist(
    (set, get) => ({
      setChain(chainId: number) {
        const { chain } = get()
        const result = chain?.id != chainId ? SUPPORT_CHAIN?.find((item) => item.id === chainId) : null
        if (result) set({ chain: result })
      }
    }),
    { name: ChainSaveKey }
  )
)

export type useChainProps = {}

// chain
const useChain = ({ }: useChainProps = {}) => {
  const isVisible = useVisible()
  const chain = useChainStore((state) => state.chain) || DEFAULT_CHAIN
  const chains = SUPPORT_CHAIN
  const setChain = useChainStore((state) => state.setChain)
  const { isConnected } = useAccount()
  const { chain: _walletChain } = useNetwork()
  const { switchNetwork, switchNetworkAsync, isLoading, pendingChainId, error } = useSwitchNetwork()
  const walletChain = useMemo(() => chains?.find((item) => item.id === _walletChain?.id), [chains, _walletChain])
  const storeChain = useMemo(() => chains?.find((item) => item.id === chain?.id), [chain?.id, chains])
  const pendingChain = useMemo(() => chains?.find((item) => item.id === pendingChainId), [pendingChainId, chains])
  const switchChain = useCallback(
    async (chainId: number) => {
      if (isVisible) {
        await switchNetworkAsync?.(chainId)
      }
      setChain(chainId)
    },
    [isVisible, setChain, switchNetworkAsync]
  )
  useEffect(() => {
    if (isVisible) {
      if (walletChain && isConnected) {
        setChain(walletChain.id)
      } else if (storeChain) {
        switchNetwork?.(storeChain.id)
      } else {
        switchChain(DEFAULT_CHAIN.id)
      }
    }
  }, [storeChain, setChain, switchNetwork, walletChain, switchChain, isVisible, isConnected])
  return {
    chain,
    pendingChain,
    chains,
    isLoading,
    switchChain,
    error,
  }
}

export default useChain
