import type { OracleGateway } from '@/libs/oracle';
import {  getCoinbasePing, getCoinbasePrice } from '@/libs/oracle';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';

export type useCoinbasePriceProps = {
  from?: string;
  to?: string;
  gateway?: OracleGateway
}

export type MultiCoinBasePriceProps = useCoinbasePriceProps[];

export const useMultiCoinBasePrice = (props: MultiCoinBasePriceProps = []) => {
  const queryFn = useCallback(() => Promise.all(props.map(item => getCoinbasePrice(item?.from ?? '', item.to || 'usd', item.gateway))), [props])
  return useQuery({
    queryKey: props,
    queryFn,
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: props && props.length > 0
  })
}


export const useCoinbasePrice = (prop: useCoinbasePriceProps) => {
  const options = useMemo(() => [prop], [prop])
  const { data, refetch, ...result } = useMultiCoinBasePrice(options)
  const newData = useMemo(()=>data?.[0],[data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<number | undefined, Error>> => {
      return await refetch(options)
        .then(({ data, ...result }) => {
          return {
            ...result,
            data: data?.[0],
          }
        })
        .catch((error) => error)
    },
    [refetch]
  )

  return {
    ...result,
    data: newData,
    refetch: newRefetch,
  }
};

export type CoinbasePingProps = {
  gateway?: OracleGateway;
};

export const useCoinbasePing = ({ gateway, }: CoinbasePingProps = {}) => {
  const fetchPing = useCallback(() => getCoinbasePing(gateway), [gateway]);
  return useQuery({
    queryKey: [{ gateway }],
    queryFn: fetchPing,
    cacheTime: 1 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: Boolean(gateway)
  })
};
