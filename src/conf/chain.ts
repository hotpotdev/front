import type { Chain } from 'wagmi';
import { APP_NAME } from './app';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { goerli, polygonMumbai, bsc, bscTestnet, zkSyncTestnet, zkSync, mainnet, polygon, arbitrumGoerli, arbitrum } from 'wagmi/chains';
import { SVGAttributes } from 'react';
import { StaticImageData } from 'next/image';
import { ArbIcon, BnbchainIcon, BnbchainIconUrl, CoinbaseIcon, EthereumIcon, EthereumIconUrl, MetamaskIcon, PolygonIcon, PolygonIconUrl, WalletconnectIcon, ZksyncIcon, ZksyncIconUrl } from '@/assets';
import { zeroAddress } from 'viem';
import { ITokenMeta } from '@/libs/types/type';


/// 支持链
export const SUPPORT_CHAIN: Chain[] = [
  { ...goerli, name: 'Goerli' },
  // { ...mainnet,name: 'Ethereum' },
  // { ...polygonMumbai, name: 'Polygon Mumbai' },
  // { ...polygon, name: 'Polygon' },
  // { ...bscTestnet, name: 'BSC Testnet'},
  // { ...bsc, name: 'BSC' },
  // { ...zkSyncTestnet, name: 'ZkSync Testnet' },
  // { ...zkSync, name: 'ZkSync' },
  // { ...arbitrumGoerli, name: 'Goerli ARB' },
  // { ...arbitrum, name: 'Arbitrum' }
];

/// 默认链
export const DEFAULT_CHAIN = SUPPORT_CHAIN[0];

// 链 meta 数据
export const CHAIN_META: {
  [key: number]: {
    icon?: React.ElementType<SVGAttributes<string>> | string | StaticImageData
  }
} = {
  [goerli.id]: {
    icon: EthereumIcon,
  },
  [mainnet.id]: {
    icon: EthereumIcon,
  },
  [polygonMumbai.id]: {
    icon: PolygonIcon
  },
  [polygon.id]: {
    icon: PolygonIcon
  },
  [bscTestnet.id]: {
    icon: BnbchainIcon,
  },
  [bsc.id]: {
    icon: BnbchainIcon,
  },
  [zkSyncTestnet.id]: {
    icon: ZksyncIcon
  },
  [zkSync.id]: {
    icon: ZksyncIcon
  },
  [arbitrumGoerli.id]: {
    icon: ArbIcon
  },
  [arbitrum.id]: {
    icon: ArbIcon
  }
}

// 稳定代币
export type I_CERT_TOKENS = {
  [key: number]: Array<ITokenMeta>;
};

export const CERT_TOKENS: I_CERT_TOKENS = {
  [bsc.id]: [
    {
      address: zeroAddress,
      ...bsc.nativeCurrency,
      logo: BnbchainIconUrl,
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      logo: '/static/images/usdt.webp',
      address: '0x55d398326f99059ff775485246999027b3197955'
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      logo: '/static/images/usdc.png',
      address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'
    }
  ],
  [goerli.id]: [
    {
      address: zeroAddress,
      ...goerli.nativeCurrency,
      logo: EthereumIconUrl,
    },
    // {
    //   name: 'Tether',
    //   symbol: 'USDT',
    //   logo: '/static/images/usdt.webp',
    //   address: '0x5AB6F31B29Fc2021436B3Be57dE83Ead3286fdc7'
    // },
    // {
    //   name: 'USD Coin',
    //   symbol: 'USDC',
    //   logo: '/static/images/usdc.png',
    //   address: '0x466595626333c55fa7d7Ad6265D46bA5fDbBDd99'
    // }
  ],
  [polygonMumbai.id]: [
    {
      address: zeroAddress,
      ...polygonMumbai.nativeCurrency,
      logo: PolygonIconUrl,
    }
  ],
  [zkSync.id]: [
    {
      address: zeroAddress,
      ...zkSync.nativeCurrency,
      logo: ZksyncIconUrl,
    }
  ],
  [zkSyncTestnet.id]: [
    {
      address: zeroAddress,
      ...zkSyncTestnet.nativeCurrency,
      logo: ZksyncIconUrl,
    }
  ]
};
export type I_CHAIN_PRICE_SYMBOL = { [key: number]: { coingecko: string, coinbase: string, cryptocompare: string } }
/// 链 price id
export const CHAIN_PRICE_SYMBOL: I_CHAIN_PRICE_SYMBOL = {
  [goerli.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  },
  [mainnet.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  },
  [polygonMumbai.id]: {
    coingecko: 'matic-network',
    coinbase: 'matic',
    cryptocompare: 'matic'
  },
  [polygon.id]: {
    coingecko: 'matic-network',
    coinbase: 'matic',
    cryptocompare: 'matic'
  },
  [bscTestnet.id]: {
    coingecko: 'binancecoin',
    coinbase: 'bnb',
    cryptocompare: 'bnb'
  },
  [bsc.id]: {
    coingecko: 'binancecoin',
    coinbase: 'bnb',
    cryptocompare: 'bnb'
  },
  [zkSync.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  },
  [zkSyncTestnet.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  },
  [arbitrumGoerli.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  },
  [arbitrum.id]: {
    coingecko: 'ethereum',
    coinbase: 'eth',
    cryptocompare: 'eth'
  }
};


/// 链 Graphql
export const GRAPHQL_API: { [key: number]: string } = {
  [goerli.id]: 'https://api.thegraph.com/subgraphs/name/hotpotlabs/hotpot', // 新 id
  [mainnet.id]: '',
  [polygonMumbai.id]: 'https://api.thegraph.com/subgraphs/name/hotpotlabs/hotpot-mumbai',
  [polygon.id]: '',
  [bscTestnet.id]: '',
  [bsc.id]: 'https://api.thegraph.com/subgraphs/name/hotpotlabs/hotpot-bnb', // 新 id
  [zkSyncTestnet.id]: 'https://api.thegraph.com/subgraphs/name/wonderfulfull/test',
  [zkSync.id]: 'https://api.studio.thegraph.com/query/45232/hotpot-zk/v0.0.1',
  [arbitrumGoerli.id]: '',
  [arbitrum.id]: ''
}

/// 钱包
export const SUPPORT_CONNECTOR = [
  new MetaMaskConnector({ chains: SUPPORT_CHAIN }),
  new CoinbaseWalletConnector({
    chains: SUPPORT_CHAIN,
    options: {
      appName: APP_NAME,
    }
  }),
  // new WalletConnectConnector({
  //   chains: SUPPORT_CHAIN,
  //   options: {
  //     projectId: '44f3235b99ece427661fea5cf17dc7cc'
  //   }
  // })
];

/// 钱包 metaa
export const CONNECTOR_META: {
  [key: string]: {
    icon?: React.ElementType<SVGAttributes<string>> | string | StaticImageData
  }
} = {
  [SUPPORT_CONNECTOR[0].id]: {
    icon: MetamaskIcon
  },
  [SUPPORT_CONNECTOR[1].id]: {
    icon: CoinbaseIcon
  },
  // [SUPPORT_CONNECTOR[2].id]: {
  //   icon: WalletconnectIcon
  // }
};
