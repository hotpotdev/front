import { create } from "zustand"
import { combine } from "zustand/middleware"

// store
export const useWalletStore = create(combine({
  isConnectModalOpen: false,
  isChainModalOpen: false
}, (set) => {
  return {
    setIsConnectModalOpen(isConnectModalOpen: boolean) {
      set({ isConnectModalOpen })
    },
    setIsChainModalOpen(isChainModalOpen: boolean) {
      set({ isChainModalOpen })
    }
  }
}))


