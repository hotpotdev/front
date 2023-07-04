import type { OracleGateway } from "../types"
import { getPriceUrl } from "../utils"
import { COINGECKO_GATAWAY } from "./constants"

export const fetchCoingeckoPrice = (fetchFunction: any) => async (
  from: string,
  to: string,
  gateway: OracleGateway = COINGECKO_GATAWAY
) => {
  try {
    const fromId = from.toLowerCase()
    const toId = to.toLowerCase()
    const url = getPriceUrl(fromId, toId, `${gateway.url}/simple/price?ids={from}&vs_currencies={to}`);
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-cg-pro-api-key': gateway.auth
      },
      mode: 'cors',
    })
    const result = await data.json()
    const price = result[fromId][toId]
    return price ? price as number : undefined
  } catch (_) {
    return undefined
  }
}

/**
 * [zh] 获取价格
 * @param {string} from
 * @param {string} to
 * @param {OracleGateway} gateway [zh] 网关
 * @returns {number ? undefined} price
 */
export const getCoingeckoPrice = fetchCoingeckoPrice(typeof window !== 'undefined' && window.fetch)
