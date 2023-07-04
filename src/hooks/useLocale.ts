import { useCallback, useEffect, useRef } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { APP_DIR, APP_I18N } from '@/conf'

// save key
export const LocaleSaveKey = 'locale'
export type TDirection = 'ltr' | 'rtl'
export interface ILocaleState {
  locale?: string
  direction?: TDirection
  setDirection: (newDirection: TDirection) => void
  setLocale: (newLocale: string) => void
}
// store
export const useLocaleStore = create<ILocaleState>()(
  persist(
    (set, get) => ({
      locale: APP_I18N.defaultLocale,
      direction: APP_DIR,
      setDirection(newDirection: TDirection) {
        const { direction } = get()
        if (direction != newDirection) set({ direction: newDirection })
      },
      setLocale(newLocale: string) {
        const { locale } = get()
        const result = locale != newLocale ? APP_I18N.locales.find((item) => item === newLocale) : null
        if (result) set({ locale: result })
      }
    }),
    { name: LocaleSaveKey }
  )
)

export type useLocaleProps = {}
const useLocale = ({ }: useLocaleProps = {}) => {
  const { locale, setLocale, direction, setDirection } = useLocaleStore(state => ({ ...state }), shallow)
  const ref = useRef(true)

  const switchLocale = useCallback(
    (lang: string) => {
      if (typeof window !== 'undefined' && document && lang !== document.documentElement.getAttribute('lang')) {
        document.documentElement.setAttribute('lang', lang)
      }
      setLocale(lang)
    },
    [setLocale]
  )

  const switchDirection = useCallback(
    (direction: TDirection) => {
      if (typeof window !== 'undefined' && direction !== window.document.documentElement.getAttribute('dir')) {
        window.document.documentElement.setAttribute('dir', direction)
      }
      setDirection(direction)
    },
    [setDirection]
  )

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      if (locale) switchLocale(locale)
      if (direction) switchDirection(direction)
      ref.current = false
    }
  }, [direction, locale, setDirection, setLocale, switchDirection, switchLocale])

  return {
    locale,
    locales: APP_I18N.locales,
    switchLocale,
    switchDirection,
  }
}

export default useLocale
