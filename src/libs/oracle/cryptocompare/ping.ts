import { GetPingTimeMs } from "@/libs/common/network";
import type { OracleGateway } from "../types"
import { CRYPTOCOMPARE_GATAWAY } from "./constants"


/**
 * [zh] ping
 * @param gateway 网关
 * @returns
 */
export const getCryptocomparePing = async (gateway:OracleGateway = CRYPTOCOMPARE_GATAWAY) => {
  return await GetPingTimeMs(`${gateway.url}/ping`);
}
