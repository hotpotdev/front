import * as Types from '../types/graphql';
import type { GraphQLClient } from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export const CounterFieldsFragmentDoc = gql`
    fragment CounterFields on CounterEntity {
  count
  type
  id
  timestamp
}
    `;
export const TokenFieldsFragmentDoc = gql`
    fragment TokenFields on TokenEntity {
  addr
  admin
  creator
  net
  bondingCurveType
  burnTax
  createTimestamp
  currentPrice
  factory
  index
  lockValue
  marketCap
  memberCount
  metaUri
  mintTax
  name
  params
  raisingToken
  supply
  symbol
  tokenType
  treasury
  treasuryFee
}
    `;
export const MintBurnFieldsFragmentDoc = gql`
    fragment MintBurnFields on MintBurnEntity {
  id
  direction
  erc20Amount
  from
  nativeAmount
  hash
  timestamp
  to
  blockNum
  platformFee
  projectFee
  token {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const PlatformFieldsFragmentDoc = gql`
    fragment PlatformFields on PlatformEntity {
  addr
  route
  admin
  burnTax
  mintTax
  treasury
}
    `;
export const BondingCurveTypeFieldsFragmentDoc = gql`
    fragment BondingCurveTypeFields on BondingCurveType {
  name
  impl
}
    `;
export const PriceByHourFieldsFragmentDoc = gql`
    fragment PriceByHourFields on PriceByHour {
  minPrice
  maxPrice
  openPrice
  closePrice
  timestamp
  tokenTvl
}
    `;
export const PriceByDayFieldsFragmentDoc = gql`
    fragment PriceByDayFields on PriceByDay {
  minPrice
  maxPrice
  openPrice
  closePrice
  timestamp
  tokenTvl
}
    `;
export const FetchCountersWhereTypeDocument = gql`
    query fetchCountersWhereType($type: String!, $first: Int, $skip: Int, $orderBy: CounterEntity_orderBy, $orderDirection: OrderDirection) {
  counterEntities(
    where: {type_contains_nocase: $type}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...CounterFields
  }
}
    ${CounterFieldsFragmentDoc}`;
export const FetchMintBurnsWhereFromDocument = gql`
    query fetchMintBurnsWhereFrom($from: Bytes!, $first: Int, $skip: Int, $orderBy: MintBurnEntity_orderBy, $orderDirection: OrderDirection) {
  mintBurnEntities(
    where: {from: $from}
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $skip
  ) {
    ...MintBurnFields
  }
}
    ${MintBurnFieldsFragmentDoc}`;
export const FetchMintBurnsWhereToDocument = gql`
    query fetchMintBurnsWhereTo($to: Bytes!, $first: Int, $skip: Int, $orderBy: MintBurnEntity_orderBy, $orderDirection: OrderDirection) {
  mintBurnEntities(
    where: {to: $to}
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $skip
  ) {
    ...MintBurnFields
  }
}
    ${MintBurnFieldsFragmentDoc}`;
export const FetchMintBurnsWhereTokenDocument = gql`
    query fetchMintBurnsWhereToken($tokenAddress: Bytes!, $first: Int, $skip: Int, $orderBy: MintBurnEntity_orderBy, $orderDirection: OrderDirection) {
  mintBurnEntities(
    where: {token_: {addr: $tokenAddress}}
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    skip: $skip
  ) {
    ...MintBurnFields
  }
}
    ${MintBurnFieldsFragmentDoc}`;
export const FetchPlatformDocument = gql`
    query fetchPlatform {
  platformEntities {
    ...PlatformFields
  }
  bondingCurveTypes {
    ...BondingCurveTypeFields
  }
}
    ${PlatformFieldsFragmentDoc}
${BondingCurveTypeFieldsFragmentDoc}`;
export const FetchPriceHoursWhereTokenDocument = gql`
    query fetchPriceHoursWhereToken($address: ID!, $fastTimestamp: BigInt) {
  priceByHours(
    where: {token_: {id: $address}, timestamp_gte: $fastTimestamp}
    orderDirection: desc
    orderBy: timestamp
  ) {
    ...PriceByHourFields
  }
}
    ${PriceByHourFieldsFragmentDoc}`;
export const FetchPriceDaysWhereTokenDocument = gql`
    query fetchPriceDaysWhereToken($address: ID!, $fastTimestamp: BigInt) {
  priceByHours(
    where: {token_: {id: $address}, timestamp_gte: $fastTimestamp}
    orderDirection: desc
    orderBy: timestamp
  ) {
    ...PriceByHourFields
  }
}
    ${PriceByHourFieldsFragmentDoc}`;
export const FetchTokensDocument = gql`
    query fetchTokens($first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchTokenDocument = gql`
    query fetchToken($address: ID!) {
  tokenEntity(id: $address) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchTokensWhereIndexDocument = gql`
    query fetchTokensWhereIndex($index: BigInt!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {index: $index}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchTokensWhereAddressDocument = gql`
    query fetchTokensWhereAddress($address: Bytes!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {addr: $address}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchTokensWhereNameDocument = gql`
    query fetchTokensWhereName($name: String!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {name_contains_nocase: $name}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchTokensWhereSymbolDocument = gql`
    query fetchTokensWhereSymbol($symbol: String!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {symbol_contains_nocase: $symbol}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchOwnedTokensDocument = gql`
    query fetchOwnedTokens($admin: Bytes!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {admin: $admin}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;
export const FetchCreateTokensDocument = gql`
    query fetchCreateTokens($creator: Bytes!, $first: Int, $skip: Int, $orderBy: TokenEntity_orderBy, $orderDirection: OrderDirection) {
  tokenEntities(
    where: {creator: $creator}
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    ...TokenFields
  }
}
    ${TokenFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    fetchCountersWhereType(variables: Types.FetchCountersWhereTypeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchCountersWhereTypeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchCountersWhereTypeQuery>(FetchCountersWhereTypeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchCountersWhereType', 'query');
    },
    fetchMintBurnsWhereFrom(variables: Types.FetchMintBurnsWhereFromQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchMintBurnsWhereFromQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchMintBurnsWhereFromQuery>(FetchMintBurnsWhereFromDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchMintBurnsWhereFrom', 'query');
    },
    fetchMintBurnsWhereTo(variables: Types.FetchMintBurnsWhereToQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchMintBurnsWhereToQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchMintBurnsWhereToQuery>(FetchMintBurnsWhereToDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchMintBurnsWhereTo', 'query');
    },
    fetchMintBurnsWhereToken(variables: Types.FetchMintBurnsWhereTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchMintBurnsWhereTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchMintBurnsWhereTokenQuery>(FetchMintBurnsWhereTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchMintBurnsWhereToken', 'query');
    },
    fetchPlatform(variables?: Types.FetchPlatformQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchPlatformQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchPlatformQuery>(FetchPlatformDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchPlatform', 'query');
    },
    fetchPriceHoursWhereToken(variables: Types.FetchPriceHoursWhereTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchPriceHoursWhereTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchPriceHoursWhereTokenQuery>(FetchPriceHoursWhereTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchPriceHoursWhereToken', 'query');
    },
    fetchPriceDaysWhereToken(variables: Types.FetchPriceDaysWhereTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchPriceDaysWhereTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchPriceDaysWhereTokenQuery>(FetchPriceDaysWhereTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchPriceDaysWhereToken', 'query');
    },
    fetchTokens(variables?: Types.FetchTokensQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokensQuery>(FetchTokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchTokens', 'query');
    },
    fetchToken(variables: Types.FetchTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokenQuery>(FetchTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchToken', 'query');
    },
    fetchTokensWhereIndex(variables: Types.FetchTokensWhereIndexQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokensWhereIndexQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokensWhereIndexQuery>(FetchTokensWhereIndexDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchTokensWhereIndex', 'query');
    },
    fetchTokensWhereAddress(variables: Types.FetchTokensWhereAddressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokensWhereAddressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokensWhereAddressQuery>(FetchTokensWhereAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchTokensWhereAddress', 'query');
    },
    fetchTokensWhereName(variables: Types.FetchTokensWhereNameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokensWhereNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokensWhereNameQuery>(FetchTokensWhereNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchTokensWhereName', 'query');
    },
    fetchTokensWhereSymbol(variables: Types.FetchTokensWhereSymbolQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchTokensWhereSymbolQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchTokensWhereSymbolQuery>(FetchTokensWhereSymbolDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchTokensWhereSymbol', 'query');
    },
    fetchOwnedTokens(variables: Types.FetchOwnedTokensQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchOwnedTokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchOwnedTokensQuery>(FetchOwnedTokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchOwnedTokens', 'query');
    },
    fetchCreateTokens(variables: Types.FetchCreateTokensQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Types.FetchCreateTokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.FetchCreateTokensQuery>(FetchCreateTokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fetchCreateTokens', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;