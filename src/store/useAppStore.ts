import { StoreApi, create } from 'zustand'

import { combine, persist } from 'zustand/middleware'

const name = 'app'

const initialState = {
  minSidebar: false, // minSidbar
}

type AppState = typeof initialState

const action = (set: StoreApi<AppState>['setState']) => ({
  // (set: ..., get: StoreApi<AppState>["getState"])
  setMinSidebar: (minSidebar: boolean) => {
    set(() => {
      // (state: AppState)
      return { minSidebar }
    })
  },
})

export const useAppStore = create(persist(combine(initialState, action), { name }))
