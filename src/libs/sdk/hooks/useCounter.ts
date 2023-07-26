import { useQuery } from "@tanstack/react-query";
import { getSdk } from "../api/graphql";
import { CounterFieldsFragment, FetchCountersWhereTypeQueryVariables } from "../types/graphql";
import { BaseProps } from "../types/hooks";
import { GraphQLClient } from 'graphql-request'
import { useMemo } from "react";

export type ICounter = CounterFieldsFragment & {

}

export type useMultiCounterWhereProps = {
  endpoints?: string[]
  types?: string[]
} & BaseProps<Omit<FetchCountersWhereTypeQueryVariables, 'type'>>

export const useMultiCounterWhere = ({ endpoints, types, variables, requestHeaders, enabled = true, cacheTime = 5 * 60 * 1000, staleTime = 1 * 60 * 1000 }: useMultiCounterWhereProps) => {
  const queryFn = async () => {
    return Promise.all(types && endpoints?.map((item, index) => {
      const client = new GraphQLClient(item)
      const sdk = getSdk(client)
      return sdk.fetchCountersWhereType({
        type: types[index],
        ...variables,
      }, requestHeaders)
    }) || []);
  }
  const isEnabled = useMemo(() => endpoints && types && endpoints.length > 0 && types.length > 0 && enabled, [enabled, endpoints, types])
  return useQuery({
    queryKey: [endpoints, types],
    queryFn,
    enabled: isEnabled,
    cacheTime,
    staleTime,
    select(datas) {
      return datas.map(item => item.counterEntities) as ICounter[][]
    }
  })
}


