import { useCallback, useMemo } from "react"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';
import { FetchMintBurnsWhereFromQueryVariables, FetchMintBurnsWhereToQueryVariables, FetchMintBurnsWhereTokenQueryVariables, MintBurnFieldsFragment } from "../types/graphql"
import { BaseProps } from "../types/hooks"
import { Hash } from "@/libs/types/type"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "../api/graphql"
import { IToken } from "./useToken";
import { FormatBondingCurve } from "../utils/curve";
import { IBondingCurveType } from "../types/curve";

export enum ActionDirection {
  mint,
  burn,
}

export type IMintBurns = MintBurnFieldsFragment & {
  token: IToken
}

export type useMultiMintBurnWhereFromProps = {
  endpoints?: string[]
  from?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereFromQueryVariables, 'from'>>

export const useMultiMintBurnWhereFrom = ({ endpoints, from, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiMintBurnWhereFromProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && from ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchMintBurnsWhereFrom({ ...variables, from: from || '0x0', }, requestHeaders)
  }) : []), [endpoints, from, variables, requestHeaders]
  )
  return useQuery({
    queryKey: [{ endpoints, from, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && from && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.mintBurnEntities.map(item => {
        params = JSON.parse(item.token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...item,
          token: {
            ...item.token,
            params: FormatBondingCurve({
              type: item.token.bondingCurveType as IBondingCurveType,
              params: params
            })
          } as IToken
        }
      })) as IMintBurns[][]
    }
  })
}

export type useMintBurnWhereFromProps = {
  endpoint?: string
  from?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereFromQueryVariables, 'from'>>

export const useMintBurnWhereFrom = ({ endpoint, from, ...props }: useMintBurnWhereFromProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], from }), [endpoint, from, props])
  const { data, refetch, ...result } = useMultiMintBurnWhereFrom(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IMintBurns[] | undefined, Error>> => {
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

export type useMultiMintBurnWhereToProps = {
  endpoints?: string[]
  to?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereToQueryVariables, 'to'>>

export const useMultiMintBurnWhereTo = ({ endpoints, to, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiMintBurnWhereToProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && to ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchMintBurnsWhereTo({ ...variables, to: to || '0x0', }, requestHeaders)
  }) : []), [endpoints, to, variables, requestHeaders]
  )
  return useQuery({
    queryKey: [{ endpoints, to, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && to && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.mintBurnEntities.map(item => {
        params = JSON.parse(item.token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...item,
          token: {
            ...item.token,
            params: FormatBondingCurve({
              type: item.token.bondingCurveType as IBondingCurveType,
              params: params
            })
          } as IToken
        }
      })) as IMintBurns[][]
    }
  })
}

export type useMintBurnWhereToProps = {
  endpoint?: string
  to?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereToQueryVariables, 'to'>>

export const useMintBurnWhereTo = ({ endpoint, to, ...props }: useMintBurnWhereToProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], to }), [endpoint, to, props])
  const { data, refetch, ...result } = useMultiMintBurnWhereTo(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IMintBurns[] | undefined, Error>> => {
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


export type useMultiMintBurnWhereTokenProps = {
  endpoints?: string[]
  tokenAddress?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereTokenQueryVariables, 'tokenAddress'>>

export const useMultiMintBurnWhereToken = ({ endpoints, tokenAddress, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiMintBurnWhereTokenProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && tokenAddress ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchMintBurnsWhereToken({ ...variables, tokenAddress: tokenAddress || '0x0', }, requestHeaders)
  }) : []), [endpoints, tokenAddress, variables, requestHeaders]
  )
  return useQuery({
    queryKey: [{ endpoints, tokenAddress, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && tokenAddress && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.mintBurnEntities.map(item => {
        params = JSON.parse(item.token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...item,
          token: {
            ...item.token,
            params: FormatBondingCurve({
              type: item.token.bondingCurveType as IBondingCurveType,
              params: params
            })
          } as IToken
        }
      })) as IMintBurns[][]
    }
  })
}

export type useMintBurnWhereTokenProps = {
  endpoint?: string
  tokenAddress?: Hash
} & BaseProps<Omit<FetchMintBurnsWhereTokenQueryVariables, 'tokenAddress'>>

export const useMintBurnWhereToken = ({ endpoint, tokenAddress, ...props }: useMintBurnWhereTokenProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], tokenAddress }), [endpoint, tokenAddress, props])
  const { data, refetch, ...result } = useMultiMintBurnWhereToken(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IMintBurns[] | undefined, Error>> => {
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
