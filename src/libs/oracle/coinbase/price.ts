import type { OracleGateway } from "../types"
import { getPriceUrl } from "../utils"
import { COINBASE_GATAWAY } from "./constants"

export const fetchCoinbasePrice = (fetchFunction: any) => async (
  from: string,
  to: string,
  gateway: OracleGateway = COINBASE_GATAWAY
) => {
  try {
    const fromId = from.toUpperCase()
    const toId = to.toUpperCase()
    const url = getPriceUrl(fromId, toId, `${gateway.url}/prices/{from}-{to}/buy`);
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gateway.auth}`
      },
      mode: 'cors',
    })
    const result = await data.json();
    const price = result['amount'];
    return price ? price as number : undefined;
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
export const getCoinbasePrice = fetchCoinbasePrice(typeof window !== 'undefined' && window.fetch)
