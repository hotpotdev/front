import type { OracleGateway } from "../types"
import { getPriceUrl } from "../utils"
import { COINGECKO_GATAWAY } from "./constants"

export const fetchCoingeckoTokenPrice = (fetchFunction: any) => async (
  contract: string,
  to: string,
  platform: string,
  gateway: OracleGateway = COINGECKO_GATAWAY
) => {
  try {
    const platformId = platform.toLowerCase()
    const toId = to.toLowerCase()
    const addr = contract.toLowerCase()
    const url = getPriceUrl(platformId, toId, `${gateway.url}/simple/token_price/{from}?contract_addresses=${addr}&vs_currencies={to}`)
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-cg-pro-api-key': gateway.auth
      },
    })
    const result = await data.json()
    const price = result[addr][to]
    return price ? price as number  : undefined
  } catch (_) {
    return undefined
  }
}
/**
 * [zh] 获取代币价格
 * @param {string} contract [zh] 代币合约地址
 * @param {string} to [zh] 转换代币
 * @param {string} platform [zh] 发布网络
 * @param {OracleGateway} gateway [zh] 网关
 * @returns {number ? undefined} price
 */
export const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(typeof window !== 'undefined' && window.fetch)

