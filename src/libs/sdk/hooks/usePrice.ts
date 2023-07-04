import { Hash } from "@/libs/types/type"
import { BaseProps } from "../types/hooks"
import { useCallback, useMemo } from "react"
import { GraphQLClient } from 'graphql-request'
import { getSdk } from "../api/graphql"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query";
import { PriceByDayFieldsFragment, PriceByHourFieldsFragment } from "../types/graphql"

export type useMultiPriceHoursWhereTokenProps = {
    endpoints?: string[]
    address?: Hash,
    fastTimestamp?: number,
} & BaseProps<{}>

export const useMultiPriceHoursWhereToken = ({ endpoints, address = '0x', fastTimestamp = 0, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiPriceHoursWhereTokenProps) => {
    const queryFn = useCallback(() => Promise.all(endpoints && address ? endpoints.map((item, index) => {
        const client = new GraphQLClient(item)
        const sdk = getSdk(client)
        return sdk.fetchPriceHoursWhereToken({ ...variables, address, fastTimestamp: fastTimestamp as unknown as bigint }, requestHeaders)
    }) : []), [endpoints, address, variables, fastTimestamp, requestHeaders]
    )
    return useQuery({
        queryKey: [{ endpoints, address, fastTimestamp, variables, requestHeaders }],
        queryFn,
        enabled: endpoints && endpoints.length > 0 && address && fastTimestamp >= 0 && enabled,
        cacheTime,
        staleTime,
        select(datas) {
            return datas.map(item => item.priceByHours) as PriceByHourFieldsFragment[][]
        }
    })
}

export type usePriceHoursWhereTokenProps = {
    endpoint?: string
    address?: Hash,
    fastTimestamp?: number,
} & BaseProps<{}>


export const usePriceHoursWhereToken = ({ endpoint, ...props }: usePriceHoursWhereTokenProps) => {
    const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [] }), [endpoint, props])
    const { data, refetch, ...result } = useMultiPriceHoursWhereToken(options)
    const newData = useMemo<PriceByHourFieldsFragment[] | undefined>(() => data?.[0], [data])
    const newRefetch = useCallback(
        async (
            options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
        ): Promise<QueryObserverResult<PriceByHourFieldsFragment[] | undefined, Error>> => {
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


//

export type useMultiPriceDaysWhereTokenProps = {
    endpoints?: string[]
    address?: Hash,
    fastTimestamp?: number,
} & BaseProps<{}>

export const useMultiPriceDaysWhereToken = ({ endpoints, address = '0x', fastTimestamp = 0, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiPriceDaysWhereTokenProps) => {
    const queryFn = useCallback(() => Promise.all(endpoints && address ? endpoints.map((item, index) => {
        const client = new GraphQLClient(item)
        const sdk = getSdk(client)
        return sdk.fetchPriceDaysWhereToken({ ...variables, address, fastTimestamp: fastTimestamp as unknown as bigint }, requestHeaders)
    }) : []), [endpoints, address, variables, fastTimestamp, requestHeaders]
    )
    return useQuery({
        queryKey: [{ endpoints, address, fastTimestamp, variables, requestHeaders }],
        queryFn,
        enabled: endpoints && endpoints.length > 0 && address && fastTimestamp >= 0 && enabled,
        cacheTime,
        staleTime,
        select(datas) {
            return datas.map(item => item.priceByHours) as PriceByDayFieldsFragment[][]
        }
    })
}

export type usePriceDaysWhereTokenProps = {
    endpoint?: string
    address?: Hash,
    fastTimestamp?: number,
} & BaseProps<{}>


export const usePriceDaysWhereToken = ({ endpoint, ...props }: usePriceHoursWhereTokenProps) => {
    const options = useMemo(() => ({ ...props, endpoints: endpoint ? [endpoint] : [] }), [endpoint, props])
    const { data, refetch, ...result } = useMultiPriceDaysWhereToken(options)
    const newData = useMemo<PriceByDayFieldsFragment[] | undefined>(() => data?.[0], [data])
    const newRefetch = useCallback(
        async (
            options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
        ): Promise<QueryObserverResult<PriceByDayFieldsFragment[] | undefined, Error>> => {
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
