import { IToken } from "@/libs/sdk/hooks/useToken"
import { create } from "zustand"
import { combine } from "zustand/middleware"

// store
export const useProjectStore = create(combine({
  isSettingModalOpen: false,
  token: undefined, // token: IToken
  refetchCount: 0,
} as {
  isSettingModalOpen: boolean
  token?: IToken
  refetchCount: number,
}, (set) => {
  return {
    setToken(token: IToken) {
      set({ token })
    },
    setIsSettingModalOpen(isSettingModalOpen: boolean) {
      set({ isSettingModalOpen })
    },
    refetch(){
      set((state) => ({ refetchCount: state.refetchCount  }))
    }
  }
}))


