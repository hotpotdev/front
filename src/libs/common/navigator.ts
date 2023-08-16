/**
 *
 * @returns {string|undefined}
 */
export const GetLocale = (): string | undefined => {
  // @ts-ignore
  return typeof window !== 'undefined' ? window.navigator.language || window.navigator?.userLanguage : undefined
}

/**
 *
 * @returns {'light'|'dark'|undefined}
 */
export const GetTheme = (): 'light' | 'dark' | undefined => {
  if (typeof window == 'undefined') return undefined
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return isDark ? 'dark' : isLight ? 'light' : undefined
}

/**
 *
 * @param id
 */
export const ScrollToAnchor = (id: string) => {
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}

/**
 * search
 * @param names
 * @returns
 */
export const GetSearchParams = (names: string[]) => {
  const res: { [key: string]: string | undefined | null } = {}
  if (typeof window !== 'undefined') {
    const search = new URLSearchParams(window.location.search)
    names.forEach((item) => {
      res[item] = search.get(item)
    })
  }
  return res
}

/**
 *  search
 * @param name
 * @param value
 */
export const SetSearchParam = (name: string, value: string) => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    url.searchParams.set(name, value)
    history.pushState({}, '', url)
  }
}


/**
 * [zh] os
 * @returns  {isTablet,isiPhone,isAndroid,isPc,isChrome}
 */
export function OS() {
  const ua = navigator.userAgent;
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua);
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
  const isiPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc = !isiPhone && !isAndroid && !isSymbian;
  return {
    isTablet,
    isiPhone,
    isAndroid,
    isPc,
    isChrome,
  };
}
