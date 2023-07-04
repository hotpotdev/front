import { CERT_TOKENS, CHAIN_META, CHAIN_PRICE_SYMBOL, GRAPHQL_API, SUPPORT_CHAIN } from "@/conf"
import { useCallback, useMemo } from "react"
import useChain from "./useChain"
import { useCoinbasePriceProps, useCoinbasePrice, useMultiCoinBasePrice } from "./useCoinbase"
import { useCoingeckoPriceProps, useCoingeckoPrice, useMultiCoingeckoPrice } from "./useCoingecko"
import { useCryptocomparePriceProps, useCryptocomparePrice, useMultiCryptocomparePrice } from "./useCryptocompare"
import { usePlatform, usePlatformProps } from "@/libs/sdk/hooks/usePlatform"
import { useMultiToken, useMultiTokenProps, useMultiTokenWhere, useMultiTokenWhereProps, useMultiTokens, useMultiTokensProps, useToken, useTokenProps, useTokenWhere, useTokenWhereProps, useTokens } from "@/libs/sdk/hooks/useToken"
import { zeroAddress } from "viem"
import { useMultiCounterWhere, useMultiCounterWhereProps } from "@/libs/sdk/hooks/useCounter"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { useMintBurnWhereFrom, useMintBurnWhereFromProps, useMultiMintBurnWhereFrom, useMultiMintBurnWhereFromProps } from "@/libs/sdk/hooks/useMintBurn"

export const useChainCertToken = () => {
  const { chain } = useChain()
  return useMemo(() => CERT_TOKENS[chain.id]?.find(item => item.address === zeroAddress), [chain.id]);
}

export const useChainCertTokens = () => {
  const { chain } = useChain()
  return useMemo(() => CERT_TOKENS[chain.id] || undefined, [chain.id]);
}

export const useChainMeta = () => {
  const { chain } = useChain()
  return useMemo(() => CHAIN_META[chain.id] || undefined, [chain.id])
}

export const useAllChainGraphqlApi = () => {
  const len = SUPPORT_CHAIN.length
  const endpoints = [];
  for (let index = 0; index < len; index++) {
    const chain = SUPPORT_CHAIN[index];
    if (GRAPHQL_API[chain.id]) endpoints.push(GRAPHQL_API[chain.id])
  }
  return endpoints;
}

export const useChainGraphqlApi = () => {
  const { chain } = useChain()
  return useMemo(() => GRAPHQL_API[chain.id] || undefined, [chain.id])
}

export const useAllChainPriceSymbol = () => {
  const len = SUPPORT_CHAIN.length
  const symbols = [];
  for (let index = 0; index < len; index++) {
    const chain = SUPPORT_CHAIN[index];
    if (CHAIN_PRICE_SYMBOL[chain.id]) symbols.push(CHAIN_PRICE_SYMBOL[chain.id])
  }
  return symbols;
}

export const useChainPriceSymbol = () => {
  const { chain } = useChain()
  return useMemo(() => CHAIN_PRICE_SYMBOL[chain.id] || undefined, [chain.id])
}


export const useAllChainCoinbasePrice = () => {
  const chains = SUPPORT_CHAIN;
  const symbols = useAllChainPriceSymbol()
  const props = useMemo(() => symbols.map(item => ({ from: item.coinbase })), [symbols])
  const { data, refetch, ...result } = useMultiCoinBasePrice(props)
  const newData = useMemo(() => {
    const obj: { [key: number]: number | undefined } = {}
    data?.forEach((item, index) => {
      if (chains[index]) obj[Number(chains[index].id)] = item
    })
    return obj
  }, [chains, data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<{ [key: number]: number | undefined }, Error>> => {
      return await refetch(options)
        .then(({ data, ...result }) => {
          const obj: { [key: number]: number | undefined } = {}
          data?.map((item, index) => {
            if (chains[index]) obj[Number(chains[index])] = item
          })
          return {
            ...result,
            data: obj,
          }
        })
        .catch((error) => error)
    },
    [chains, refetch]
  )

  return {
    ...result,
    data: newData,
    refetch: newRefetch,
  }
}

export const useChainCoinbasePrice = (props?: Omit<useCoinbasePriceProps, 'from'>) => {
  const { chain } = useChain()
  return useCoinbasePrice({
    ...props,
    from: CHAIN_PRICE_SYMBOL[chain.id].coinbase,
  })
}

export const useAllChainCoingeckoPrice = () => {
  const chains = SUPPORT_CHAIN;
  const symbols = useAllChainPriceSymbol()
  const props = useMemo(() => {
    return symbols.map(item => ({ from: item.coingecko }))
  }, [symbols])
  const { data, refetch, ...result } = useMultiCoingeckoPrice(props)
  const newData = useMemo(() => {
    const obj: { [key: number]: number | undefined } = {}
    data?.forEach((item, index) => {
      if (chains[index]) obj[Number(chains[index].id)] = item
    })
    return obj
  }, [chains, data])

  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<{ [key: number]: number | undefined }, Error>> => {
      return await refetch(options)
        .then(({ data, ...result }) => {
          const obj: { [key: number]: number | undefined } = {}
          data?.forEach((item, index) => {
            if (chains[index]) obj[Number(chains[index])] = item
          })
          return {
            ...result,
            data: obj,
          }
        })
        .catch((error) => error)
    },
    [chains, refetch]
  )

  return {
    ...result,
    data: newData,
    refetch: newRefetch,
  }
}

export const useChainCoingeckoPrice = (props?: Omit<useCoingeckoPriceProps, 'from'>) => {
  const { chain } = useChain()
  return useCoingeckoPrice({
    ...props,
    from: CHAIN_PRICE_SYMBOL[chain.id].coingecko,
  })
}

export const useAllChainCryptocomparePrice = () => {
  const chains = SUPPORT_CHAIN;
  const symbols = useAllChainPriceSymbol()
  const props = useMemo(() => symbols.map(item => ({ from: item.cryptocompare })), [symbols])
  const { data, refetch, ...result } = useMultiCryptocomparePrice(props)
  const newData = useMemo(() => {
    const obj: { [key: number]: number | undefined } = {}
    data?.forEach((item, index) => {
      if (chains[index]) obj[Number(chains[index].id)] = item
    })
    return obj
  }, [chains, data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<{ [key: number]: number | undefined }, Error>> => {
      return await refetch(options)
        .then(({ data, ...result }) => {
          const obj: { [key: number]: number | undefined } = {}
          data?.map((item, index) => {
            if (chains[index]) obj[Number(chains[index])] = item
          })
          return {
            ...result,
            data: obj,
          }
        })
        .catch((error) => error)
    },
    [chains, refetch]
  )

  return {
    ...result,
    data: newData,
    refetch: newRefetch,
  }
}

export const useChainCryptocomparePrice = (props?: Omit<useCryptocomparePriceProps, 'from'>) => {
  const { chain } = useChain()
  return useCryptocomparePrice({
    ...props,
    from: CHAIN_PRICE_SYMBOL[chain.id].cryptocompare,
  })
}

export const useChainPlatform = (props?: Omit<usePlatformProps, 'endpoint'>) => {
  const endpoint = useChainGraphqlApi()
  return usePlatform({ endpoint, ...props })
}

export const useAllChainTokens = (props?: Omit<useMultiTokensProps, 'endpoints'>) => {
  const endpoints = useAllChainGraphqlApi()
  return useMultiTokens({ endpoints, ...props })
}

export const useChainTokens = (props?: Omit<useTokenProps, 'endpoint'>) => {
  const endpoint = useChainGraphqlApi()
  return useTokens({ endpoint, ...props })
}

export const useAllCounterWhere = (props?: Omit<useMultiCounterWhereProps, 'endpoints'>) => {
  const endpoints = useAllChainGraphqlApi()
  return useMultiCounterWhere({ endpoints, ...props })
}

export const useAllChainToken = (props?: Omit<useMultiTokenProps, 'endpoints'>) => {
  const endpoints = useAllChainGraphqlApi()
  return useMultiToken({ endpoints, ...props })
}

export const useChainToken = (props?: Omit<useTokenProps, 'endpoint'>) => {
  const endpoint = useChainGraphqlApi()
  return useToken({ endpoint, ...props })
}

export const useAllChainTokenWhere = (props?: Omit<useMultiTokenWhereProps, 'endpoints'>) => {
  const endpoints = useAllChainGraphqlApi()
  return useMultiTokenWhere({ endpoints, ...props })
}

export const useChainTokenWhere = (props?: Omit<useTokenWhereProps, 'endpoint'>) => {
  const endpoint = useChainGraphqlApi()
  return useTokenWhere({ endpoint, ...props })
}

export const useAllChainMintBurnWhereFrom = (props?: Omit<useMultiMintBurnWhereFromProps, 'endpoints'>) => {
  const endpoints = useAllChainGraphqlApi()
  return useMultiMintBurnWhereFrom({ endpoints, ...props })
}

export const useChainMintBurnWhereFrom = (props?: Omit<useMintBurnWhereFromProps, 'endpoint'>) => {
  const endpoint = useChainGraphqlApi()
  return useMintBurnWhereFrom({ endpoint, ...props })
}
