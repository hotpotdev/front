import type { Hash, IUrlType } from "../../types/type";

export type ILinearParam = {
  k: number;
  p: number;
}
export type ISquarerParam = {
  a: number;
}
export type IExponentialParam = {
  a: number;
  b: number;
}
export type ITokenType = 'ERC20' | 'ERC721';
export type IBondingCurveType = 'linear' | 'exponential' | 'squareroot';
export type IParamTypes = {
  linear: ILinearParam;
  squareroot: ISquarerParam;
  exponential: IExponentialParam;
}
export type IBaseLaunchParam<T extends IBondingCurveType> = {
  factroyMintTaxRate?: number,
  tokenType: ITokenType;
  bondingCurveType: T;
  name: string;
  symbol: string;
  metadataUrl: IUrlType;
  ownerAddress: Hash;
  treasuryAddress: Hash;
  mintTaxRate: number;
  burnTaxRate: number;
  isSbt: boolean;
  raisingTokenAddress: Hash;
  params: IParamTypes[T];
  payAmount?: bigint;
}
export type ILaunchParam = IBaseLaunchParam<'linear'> | IBaseLaunchParam<'squareroot'> | IBaseLaunchParam<'exponential'>


