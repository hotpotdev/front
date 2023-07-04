import { GraphQLClient } from 'graphql-request'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';
import { getSdk } from '../api/graphql';
import type { IBondingCurveType } from '../types/curve';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { Hash } from '../../types/type';
import { BaseProps } from '../types/hooks';
import { FetchPlatformQueryVariables, PlatformFieldsFragment } from '../types/graphql';



export type IPlatfrom = PlatformFieldsFragment & {
  bondingCurve: {
    linear?: Hash;
    exponential?: Hash;
    squareroot?: Hash;
  }
}

export type useMultiPlatformProps = {
  endpoints?: string[]
} & BaseProps<FetchPlatformQueryVariables>

export const useMultiPlatform = ({ endpoints, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiPlatformProps) => {
  const queryFn = async () => {
    return Promise.all(endpoints?.map((item) => {
      const client = new GraphQLClient(item)
      const sdk = getSdk(client)
      return sdk.fetchPlatform(variables, requestHeaders)
    }) || []);
  }
  return useQuery({
    queryKey: endpoints,
    queryFn,
    enabled: endpoints && endpoints.length > 0 && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      return datas.map((data) => {
        const { platformEntities, bondingCurveTypes } = data;
        const bondingCurve = bondingCurveTypes?.reduce((prev: any, curr: { name: string; impl: string }) => ({ ...prev, [curr.name]: curr.impl }), {}) as {
          [K in IBondingCurveType]?: `0x${string}` | string;
        }
        return {
          ...platformEntities?.[0],
          bondingCurve
        } as IPlatfrom
      })
    },
  })

};


export type usePlatformProps = {
  endpoint?: string
} & BaseProps<FetchPlatformQueryVariables>

export const usePlatform = ({ endpoint, ...props }: usePlatformProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [] }), [endpoint, props])
  const { data, refetch, ...result } = useMultiPlatform(options)
  const newData = useMemo(()=>data?.[0],[data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IPlatfrom | undefined, Error>> => {
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
}
