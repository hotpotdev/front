import { GetPingTimeMs } from "@/libs/common/network";
import type { OracleGateway } from "../types"
import { COINGECKO_GATAWAY } from "./constants"

/**
 * [zh] ping
 * @param gateway 网关
 * @returns
 */
export const getCoingeckoPing = async (gateway:OracleGateway = COINGECKO_GATAWAY) => {
  return await GetPingTimeMs(`${gateway.url}/ping`);
}
