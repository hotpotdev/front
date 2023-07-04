import { GetPingTimeMs } from "@/libs/common/network";
import type { OracleGateway } from "../types"
import { COINBASE_GATAWAY } from "./constants"

/**
 * [zh] ping
 * @param gateway 网关
 * @returns
 */
export const getCoinbasePing = async (gateway:OracleGateway = COINBASE_GATAWAY) => {
  return await GetPingTimeMs(`${gateway.url}/ping`);
}
