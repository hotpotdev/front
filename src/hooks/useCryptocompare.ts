import type { OracleGateway } from '@/libs/oracle';

import { CRYPTOCOMPARE_GATAWAY, getCryptocomparePing, getCryptocomparePrice } from '@/libs/oracle';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';

export type useCryptocomparePriceProps = {
  from?: string;
  to?: string;
  gateway?: OracleGateway
}

export type MultiuseCryptocomparePriceProps = useCryptocomparePriceProps[];

export const useMultiCryptocomparePrice = (props: MultiuseCryptocomparePriceProps = []) => {
  const queryFn = useCallback(() => Promise.all(props.map(item => getCryptocomparePrice(item?.from ?? '', item.to || 'usd', item.gateway))), [props])
  return useQuery({
    queryKey: props,
    queryFn,
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: props && props.length > 0
  })
}


export const useCryptocomparePrice = (prop: useCryptocomparePriceProps) => {
  const options = useMemo(() => [prop], [prop])
  const { data, refetch, ...result } = useMultiCryptocomparePrice(options)
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

export type CryptocomparePingProps = {
  gateway?: OracleGateway;
};

export const useCryptocomparePing = ({ gateway }: CryptocomparePingProps = {}) => {
  const fetchPing = useCallback(() => getCryptocomparePing(gateway), [gateway]);
  return useQuery({
    queryKey: [{ gateway }],
    queryFn: fetchPing,
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: Boolean(gateway)
  })
};
