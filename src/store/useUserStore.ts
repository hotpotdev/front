import { StoreApi, create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

const name = 'user'

const initialState = {
  address: '',
  token: '',
}

type UserState = typeof initialState

const action = (set: StoreApi<UserState>['setState']) => ({
  // (set: ..., get: StoreApi<AppState>["getState"])
  setAddress: (address: string) => {
    set(() => {
      // (state: userState)
      return { address }
    })
  },
  setToken: (token: string) => {
    set(() => {
      return { token }
    })
  },
})

export const useUserStore = create(persist(combine(initialState, action), { name }))
