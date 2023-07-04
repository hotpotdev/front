import { useRouter } from 'next/router';
import nprogress from 'nprogress';
import { useEffect } from 'react';

import type { NProgress, NProgressOptions } from 'nprogress';

export const useNProgress = (options: Partial<NProgressOptions> = {}): NProgress => {
  const router = useRouter();
  useEffect(() => {
    nprogress.configure(options);
    const handleStart = (url: string) => {
      nprogress.start();
    };
    const handleStop = () => {
      nprogress.done();
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
      nprogress.remove();
    };
  }, [options, router]);
  return nprogress;
};

export default useNProgress;
