import { defineConfig, loadEnv } from '@wagmi/cli'
import { erc, react, fetch, actions, etherscan } from '@wagmi/cli/plugins'

const outDir = 'src/libs/sdk/contracts'
const explorerUrl = 'https://api-goerli.etherscan.io/api'

const contracts: { name: string, address: `0x${string}`, url?: string }[] = [
  // {
  //   name: 'Token',
  //   address: '0x0',
  // },
  // {
  //   name: 'Factory',
  //   address: '0x080c8707c3d489e3b7e6a13435a5a800e0e4518b',
  // },
  // {
  //   name: 'Linear', // BondingCurve
  //   address: '0xf40fb7fef508f447c11d7ce9266609d609c686b9',
  // },
  // {
  //   name: 'Exponential', // BondingCurve
  //   address: '0xbac4a311d8fafd4a8eeac6a8c9fb11531ab4f322',
  // },
  // {
  //   name: 'Squareroot', // BondingCurve
  //   address: '0x7e2d3b223c4f0db91fe49bdcfd767c06385d0057',
  // },
  // {
  //   name: 'Router',
  //   address: '0x77df5606c69160e15ad3ebd7ce870b10b0b5e7b2',
  // }
]
const ercConf: Array<20 | 721 | 4626> = []

const actionConf = actions({
  getContract: false,
  prepareWriteContract: false,
  readContract: false,
  watchContractEvent: false,
  writeContract: false,
})
const reactConf = react({
  useContractEvent: true,
  useContractItemEvent: false,
  useContractRead: true,
  useContractFunctionRead: false,
  useContractWrite: true,
  useContractFunctionWrite: false,
  usePrepareContractWrite: false,
  usePrepareContractFunctionWrite: false,
})

const genERCConf = (num: 20 | 721 | 4626) => {
  return {
    out: `${outDir}/ERC${num}.ts`,
    plugins: [
      erc({
        20: false,
        721: false,
        4626: false,
        [num]: true,
      }),
      actionConf,
      reactConf
    ]
  }
}

const genFetchConf = ({ name, address, url }: { name: string, address: `0x${string}`, url?: string }) => {
  const key = process.env.ETHERSCAN_API_KEY
  console.log('==KEY==', key, '==KEY==')
  return {
    out: `${outDir}/${name.replace(/(^|-|\s)\w/g, (match) => match.toUpperCase()).replace(/\s|-|_/g, '')}.ts`,
    plugins: [
      fetch({
        contracts: [{ name }],
        async parse({ response }) {
          const json: any = await response.json()
          if (json.status === '0') throw new Error(json.message)
          return JSON.parse(json.result)
        },
        timeoutDuration: 3_000,
        request() {
          return {
            url: `${url || explorerUrl}?module=contract&action=getabi&address=${address}&tag=latest&apikey=${key}`
          }
        },
      }),
      actionConf,
      reactConf,
    ]
  }
}

export default defineConfig(() => {
  loadEnv()
  return [...ercConf.map(genERCConf), ...contracts.map(genFetchConf)]
})
