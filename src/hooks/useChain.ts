import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect, useCallback, useMemo, useRef } from 'react'

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
  const { chain: walletChain } = useNetwork()
  const { switchNetwork, switchNetworkAsync, isLoading, pendingChainId, error } = useSwitchNetwork()
  const walletChainId = useMemo(() => chains?.find((item) => item.id === walletChain?.id)?.id, [chains, walletChain?.id])
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
  const ref = useRef(true)
  useEffect(() => {
    if (ref.current) {
      if (walletChainId) {
        setChain(walletChainId)
      } else if (storeChain) {
        if (isVisible) switchNetwork?.(storeChain.id)
      } else {
        switchChain(DEFAULT_CHAIN.id)
      }
      ref.current = false
    }
  }, [storeChain, setChain, switchNetwork, walletChainId, switchChain, isVisible])
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
