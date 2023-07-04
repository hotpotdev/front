import type { OracleGateway } from "../types"
import { getPriceUrl } from "../utils"
import { CRYPTOCOMPARE_GATAWAY } from "./constants"

export const fetchCryptocomparePrice = (fetchFunction: any) => async (from: string, to: string, gateway:OracleGateway = CRYPTOCOMPARE_GATAWAY) => {
  try {
    const fromId = from.toUpperCase()
    const toId = to.toUpperCase()
    const url = getPriceUrl(fromId, toId,`${gateway.url}/data/price?fsym={from}&tsyms={to}`);
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Apikey ${gateway.auth}`,
      },
      mode: 'cors',
    })
    const result = await data.json()
    const price = result[toId]
    return price ? price as number  : undefined
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
export const getCryptocomparePrice = fetchCryptocomparePrice(typeof window !== 'undefined' && window.fetch)
