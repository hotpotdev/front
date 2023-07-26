import '@/styles/index.css';

import 'nprogress/nprogress.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import { WagmiConfig } from 'wagmi';

import { APP_FONT, APP_NAME } from '@/conf';
import { Toaster } from 'react-hot-toast';

import useTheme from '@/hooks/useTheme';
import useNProgress from '@/hooks/useNProgress';
import useHtmlClassName from '@/hooks/useHtmlClassName';

import { wagmiConf } from '@/utils/wagmiConf';
import TheDefaultLayout from '@/layouts/default';
import ConnectWalletModal from '@/components/connect-wallet-modal';
import SwitchChainModal from '@/components/switch-chain-modal';
import TheLandingLayout from '@/layouts/landing';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SettingModal from '@/views/project/components/overview/setting-modal';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// app
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => <TheLandingLayout>{page}</TheLandingLayout>);
  useHtmlClassName(APP_FONT.variable)
  useNProgress();
  useTheme();
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConf}>
          {/* The rest of your application */}
          <ReactQueryDevtools initialIsOpen={false} />
          {getLayout(<Component {...pageProps} />)}
          <SettingModal />
          <ConnectWalletModal />
          <SwitchChainModal />
          <Toaster position="top-right" containerClassName="!top-24"/>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};

export default App
