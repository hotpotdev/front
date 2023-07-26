import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query";
import { GraphQLClient } from 'graphql-request'
import { getSdk } from "../api/graphql";
import { Hash } from "../../types/type";

import { useCallback, useMemo } from "react";
import { BaseProps } from "../types/hooks";
import type { FetchCreateTokensQueryVariables, FetchOwnedTokensQueryVariables, FetchTokenQueryVariables, FetchTokensQueryVariables, FetchTokensWhereAddressQuery, FetchTokensWhereAddressQueryVariables, FetchTokensWhereIndexQueryVariables, FetchTokensWhereNameQueryVariables, FetchTokensWhereSymbolQueryVariables, PriceByDayFieldsFragment, PriceByHourFieldsFragment, TokenFieldsFragment, } from "../types/graphql";
import { FormatBondingCurve } from "../utils/curve";
import { IBondingCurveType, ILinearParam, ISquarerParam, IExponentialParam } from "../types/curve";

export type IToken = TokenFieldsFragment & {
  bondingCurveType: IBondingCurveType
  params: ILinearParam | ISquarerParam | IExponentialParam
}

export type useMultiTokensProps = {
  endpoints?: string[]
} & BaseProps<FetchTokensQueryVariables>

export const useMultiTokens = ({ endpoints, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiTokensProps) => {
  const queryFn = async () => {
    return Promise.all(endpoints?.map((item) => {
      const client = new GraphQLClient(item)
      const sdk = getSdk(client)
      return sdk.fetchTokens(variables, requestHeaders)
    }) || []);
  }
  return useQuery({
    queryKey: [{ endpoints, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.tokenEntities.map(token => {
        params = JSON.parse(token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...token,
          params: FormatBondingCurve({
            type: token.bondingCurveType as IBondingCurveType,
            params: params
          })
        }
      })) as IToken[][]
    }
  })
};

export type useTokensProps = {
  endpoint?: string
} & BaseProps<FetchTokensQueryVariables>

export const useTokens = ({ endpoint, ...props }: useTokensProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [] }), [endpoint, props])
  const { data, refetch, ...result } = useMultiTokens(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IToken[] | undefined, Error>> => {
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

export type useMultiTokenProps = {
  endpoints?: string[]
  address?: Hash
} & Omit<BaseProps<FetchTokenQueryVariables>, 'variables'>

export const useMultiToken = ({ endpoints, address, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiTokenProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && address ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchToken({ address: address || '0x0' }, requestHeaders)
  }) : []), [address, endpoints, requestHeaders]
  )
  return useQuery({
    queryKey: [{ address, endpoints, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && address && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(({ tokenEntity }) => {
        if (!tokenEntity) return {}
        params = JSON.parse(tokenEntity.params)['params']
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...tokenEntity,
          params: FormatBondingCurve({
            type: tokenEntity.bondingCurveType as IBondingCurveType,
            params: params
          })
        }
      }) as IToken[]
    }
  })
};

export type useTokenProps = {
  endpoint?: string,
  address?: Hash,
} & Omit<BaseProps<FetchTokenQueryVariables>, 'variables'>

export const useToken = ({ endpoint, address, ...props }: useTokenProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], address }), [address, endpoint, props])
  const { data, refetch, ...result } = useMultiToken(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IToken[] | undefined, Error>> => {
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


export type useMultiTokenWhereProps = {
  endpoints?: string[]
  index?: number
  address?: Hash,
  name?: string
  symbol?: string
} & BaseProps<Omit<FetchTokensWhereIndexQueryVariables, 'index'> | Omit<FetchTokensWhereAddressQueryVariables, 'address'> | Omit<FetchTokensWhereNameQueryVariables, 'name'> | Omit<FetchTokensWhereSymbolQueryVariables, 'symbol'>>

export const useMultiTokenWhere = ({ endpoints, index, address, name, symbol, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiTokenWhereProps) => {
  const isIndex = useMemo(() => index !== undefined && index >= 0, [index])
  const isName = useMemo(() => Boolean(name), [name])
  const isSymbol = useMemo(() => Boolean(symbol), [symbol])
  const isAddress = useMemo(() => Boolean(address), [address])
  const isEnabled = useMemo(() => Boolean(endpoints && endpoints.length > 0 && (isIndex || isName || isIndex || isSymbol || isAddress) && enabled), [enabled, endpoints, isAddress, isIndex, isName, isSymbol])
  const queryFn = async () => {
    return Promise.all(
      isEnabled ? endpoints!.map((item) => {
        const client = new GraphQLClient(item)
        const sdk = getSdk(client)
        if (isIndex) {
          return sdk.fetchTokensWhereIndex({
            ...variables,
            index: index!.toString() as any, // type error
          }, requestHeaders)
        }
        if (isAddress) {
          return sdk.fetchTokensWhereAddress({
            ...variables,
            address: address!,
          }, requestHeaders)
        }
        if (isName) {
          return sdk.fetchTokensWhereName({
            ...variables,
            name: name!,
          }, requestHeaders)
        }
        if (isSymbol) {
          return sdk.fetchTokensWhereSymbol({
            ...variables,
            symbol: symbol!,
          }, requestHeaders)
        }
      }) : []);
  }
  return useQuery({
    queryKey: [{ endpoints, variables, requestHeaders, index, name, symbol }],
    queryFn,
    enabled: isEnabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data?.tokenEntities.map(token => {
        params = JSON.parse(token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...token,
          params: FormatBondingCurve({
            type: token.bondingCurveType as IBondingCurveType,
            params: params
          })
        }
      })) as IToken[][]
    }
  })
};

export type useTokenWhereProps = {
  endpoint?: string
  index?: number
  address?: Hash,
  name?: string
  symbol?: string
} & BaseProps<Omit<FetchTokensWhereIndexQueryVariables, 'index'> | Omit<FetchTokensWhereAddressQueryVariables, 'address'> | Omit<FetchTokensWhereNameQueryVariables, 'name'> | Omit<FetchTokensWhereSymbolQueryVariables, 'symbol'>>

export const useTokenWhere = ({ endpoint, ...props }: useTokenWhereProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], }), [endpoint, props])
  const { data, refetch, ...result } = useMultiTokenWhere(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IToken[] | undefined, Error>> => {
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

export type useMultiOwnedTokensProps = {
  endpoints?: string[]
  owner?: Hash
} & BaseProps<Omit<FetchOwnedTokensQueryVariables, 'admin'>>


export const useMultiOwnedTokens = ({ endpoints, owner, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiOwnedTokensProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && owner ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchOwnedTokens({ ...variables, admin: owner || '0x0', }, requestHeaders)
  }) : []), [endpoints, owner, variables, requestHeaders]
  )
  return useQuery({
    queryKey: [{ endpoints, owner, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && owner && owner.length > 0 && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.tokenEntities.map(token => {
        params = JSON.parse(token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...token,
          params: FormatBondingCurve({
            type: token.bondingCurveType as IBondingCurveType,
            params: params
          })
        }
      })) as IToken[][]
    }
  })
}

export type useOwnedTokensProps = {
  endpoint?: string
  owner?: Hash
} & BaseProps<Omit<FetchOwnedTokensQueryVariables, 'admin'>>


export const useOwnedTokens = ({ endpoint, owner, ...props }: useOwnedTokensProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], owner: owner }), [owner, endpoint, props])
  const { data, refetch, ...result } = useMultiOwnedTokens(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IToken[] | undefined, Error>> => {
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


export type useMultiCreateTokensProps = {
  endpoints?: string[]
  creator?: Hash
} & BaseProps<Omit<FetchCreateTokensQueryVariables, 'creator'>>


export const useMultiCreateTokens = ({ endpoints, creator, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiCreateTokensProps) => {
  const queryFn = useCallback(() => Promise.all(endpoints && creator ? endpoints.map((item, index) => {
    const client = new GraphQLClient(item)
    const sdk = getSdk(client)
    return sdk.fetchCreateTokens({ ...variables, creator: creator || '0x0', }, requestHeaders)
  }) : []), [endpoints, creator, variables, requestHeaders]
  )
  return useQuery({
    queryKey: [{ endpoints, creator, variables, requestHeaders }],
    queryFn,
    enabled: endpoints && endpoints.length > 0 && creator && creator.length > 0 && enabled,
    cacheTime,
    staleTime,
    select(datas) {
      let params = null;
      return datas.map(data => data.tokenEntities.map(token => {
        params = JSON.parse(token.params)['params'];
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            params[key] = parseInt(params[key], 16)
          }
        }
        if (params['x']) params['a'] = params['x']
        if (params['y']) params['b'] = params['y']
        return {
          ...token,
          params: FormatBondingCurve({
            type: token.bondingCurveType as IBondingCurveType,
            params: params
          })
        }
      })) as IToken[][]
    }
  })
}



export type useCreateTokensProps = {
  endpoint?: string
  creator?: Hash
} & BaseProps<Omit<FetchCreateTokensQueryVariables, 'creator'>>


export const useCreateTokens = ({ endpoint, creator, ...props }: useCreateTokensProps) => {
  const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [], owner: creator ? [creator] : [] }), [creator, endpoint, props])
  const { data, refetch, ...result } = useMultiCreateTokens(options)
  const newData = useMemo(() => data?.[0], [data])
  const newRefetch = useCallback(
    async (
      options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
    ): Promise<QueryObserverResult<IToken[] | undefined, Error>> => {
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
