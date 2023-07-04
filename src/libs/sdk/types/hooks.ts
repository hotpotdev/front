import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';

export type BaseProps<T> = {
  variables?: T,
  requestHeaders?: GraphQLClientRequestHeaders
  enabled?: boolean
  cacheTime?: number
  staleTime?: number
}

