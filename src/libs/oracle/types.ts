

/**
 * oracle gateway interface
 * [zh] oracle 网关定义
 */
export type OracleGateway = {
  id: number;
  name: string;
  url: string; // {from} {to} fmt token
  auth?: string;
}

/**
 * oracle contract interface
 * [zh] oracle contract 供应商定义
 */
export type OracleContract = {
  id: number;
  name: string;
  address: string;
  abi: Array<string> | string;
  pairs: { [token: string]: string };
}
