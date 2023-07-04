import type { CodegenConfig } from '@graphql-codegen/cli';

const dir = 'src/libs/sdk'
const schemaUrl = 'https://api.thegraph.com/subgraphs/name/hotpotlabs/hotpot'

const config: CodegenConfig = {
  schema: schemaUrl, // src/schema.graphql
  documents: [`${dir}/graphql/*.graphql`], // loading query, mutation, subscription and fragment
  ignoreNoDocuments: true,
  overwrite: true,
  debug: true,
  generates: {
    [`${dir}/types/graphql.ts`]: {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        namingConvention: 'change-case-all#pascalCase',
        onlyOperationTypes: true,
        scalars: {
          ID: '`0x${string}`',
          BigInt: 'bigint',
          BigDecimal: 'bigint',
          Int8: 'number',
          Bytes: '`0x${string}`',
        },
      }
    },
    [`${dir}/api/graphql.ts`]: {
      plugins: [
        {
          add: {
            content: "import * as Types from '../types/graphql';"
          }
        }
        , 'typescript-graphql-request'],
      config: {
        useTypeImports: true,
        importOperationTypesFrom: 'Types'
      }
    }
  }
  // hooks: {afterAllFileWrite: ['prettier --write','eslint --fix'] }
};

export default config;
