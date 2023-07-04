import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useLocale from './useLocale';

export const useRedirect = (end: string = '') => {
  const router = useRouter();
  const path = end || router.asPath;
  const { locale } = useLocale();
  useEffect(() => {
    if (path.includes(`${locale}/${locale}`)) {
      router.replace(`/${locale}/404/`.replaceAll('//', '/'));
    }
    if (path && path.startsWith(`/${locale}`) && router.route === '/404') {
      router.replace(`/${locale}${router.route}`);
    } else {
      router.replace(`/${locale}${path}`);
    }
  }, [locale, path, router]);
  return null;
};
