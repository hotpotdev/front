import { APP_THEME, APP_THEMES } from '@/conf';
import { GetTheme } from '@/libs/common/navigator';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



// save key
export const ThemeSaveKey = 'theme';
export interface IThemeState {
  theme?: string;
  setTheme: (theme: string) => void;
}
// store
export const useThemeStore = create<IThemeState>()(
  persist(
    (set, get) => ({
      theme: APP_THEME,
      setTheme(theme: string) {
        if (theme !== get().theme && APP_THEMES.find(item => item === theme)) set({ theme })
      }
    }),
    { name: ThemeSaveKey }
  )
);


export type useThemeProps = {
}

const useTheme = ({ }: useThemeProps = {}) => {
  const setTheme = useThemeStore(state => state.setTheme)
  const storeTheme = useThemeStore(state => APP_THEMES.find(item => item === state.theme))
  const systemTheme = useMemo(()=> GetTheme(),[])
  const ref = useRef(true);

  const theme = useMemo(() => storeTheme || systemTheme || APP_THEME, [storeTheme, systemTheme])


  const switchTheme = useCallback((newTheme: string) => {
    // set html attr
    if (typeof window !== 'undefined' && window.document) {
      const systemTheme = GetTheme() ?? theme;
      let tmpTheme = newTheme;
      if ((newTheme === 'auto' || newTheme === 'system') && systemTheme) {
        tmpTheme = systemTheme;
      }
      if (APP_THEMES) window.document.documentElement.classList.remove(...APP_THEMES);
      window.document.documentElement.classList.add(tmpTheme);
      // set daisyui theme
      window.document.documentElement.setAttribute('data-theme', tmpTheme);
    }
    setTheme(newTheme);
  }, [setTheme, theme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && theme && ref.current) {
      switchTheme(theme);
      ref.current = false;
    }
  }, [switchTheme, theme]);

  return {
    theme,
    themes: APP_THEMES,
    switchTheme,
  };
};

export default useTheme;
