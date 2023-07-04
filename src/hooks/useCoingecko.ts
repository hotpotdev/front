import type { OracleGateway } from '@/libs/oracle';
// eslint-disable-next-line import/no-extraneous-dependencies
import { COINGECKO_GATAWAY, getCoingeckoPing, getCoingeckoPrice } from '@/libs/oracle';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';

export type useCoingeckoPriceProps = {
  from?: string;
  to?: string;
  gateway?: OracleGateway
}

export type MultiuseCoingeckoPriceProps = useCoingeckoPriceProps[];

export const useMultiCoingeckoPrice = (props: MultiuseCoingeckoPriceProps = []) => {
  const queryFn = useCallback(() => Promise.all(props.map(item => getCoingeckoPrice(item?.from || '', item.to || 'usd', item.gateway || COINGECKO_GATAWAY))), [props])
  return useQuery({
    queryKey: [...props],
    queryFn,
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: Boolean(props && props.length > 0)
  })
}


export const useCoingeckoPrice = (prop: useCoingeckoPriceProps) => {
  const options = useMemo(() => [prop], [prop])
  const { data, refetch, ...result } = useMultiCoingeckoPrice(options)
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

export type CoingeckoPingProps = {
  gateway?: OracleGateway;
};

export const useCoingeckoPing = ({ gateway = COINGECKO_GATAWAY }: CoingeckoPingProps = {}) => {
  const fetchPing = useCallback(() => getCoingeckoPing(gateway), [gateway]);
  return useQuery({
    queryKey: [{ gateway }],
    queryFn: fetchPing,
    cacheTime: 1 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    enabled: Boolean(gateway)
  })
};
