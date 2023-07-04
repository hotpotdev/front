import { useRedirect } from '@/hooks/useRedirect'

export const Redirect = () => {
  useRedirect()
  return null
}

// export const getRedirect = (to: string) => () => {
//   useRedirect(to);
//   return (<CSEO lng={i18nextConfig.i18n.defaultLocale}/>);
// };
