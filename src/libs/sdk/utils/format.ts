import { IToken } from "../hooks/useToken";
import { PriceByDayFieldsFragment, PriceByHourFieldsFragment, TokenFieldsFragment } from "../types/graphql";
import { IBondingCurveType } from "../types/curve";
import { FormatBondingCurve } from "./curve";

export const RATE_MULTIPLIER = 1e4
export const DECIMALS = 18

export function ConverToToken(token: TokenFieldsFragment | null | undefined): IToken | null {
  if (!token) {
    return null;
  }
  let params = JSON.parse(token.params)['params'];
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      params[key] = parseInt(params[key], 16)
    }
  }
  if (params['x']) params['a'] = params['x']
  if (params['y']) params['b'] = params['y']
  return {
    ...token,
    params: FormatBondingCurve({
      type: token.bondingCurveType as IBondingCurveType,
      params: params
    })
  } as IToken
};
export const FormatToken = (token: IToken) => {
  return {
    ...token,
    supply: Number(token.supply),
    currentPrice: Number(token.currentPrice),
    lockValue: Number(token.lockValue),
    marketCap: Number(token.marketCap),
    index: Number(token?.index),
    createTimestamp: Number(token.createTimestamp) * 1e3,
    burnTax: Number(token.burnTax) / RATE_MULTIPLIER,
    mintTax: Number(token.mintTax) / RATE_MULTIPLIER,
    treasuryFee: Number(token.treasuryFee),
    memberCount: Number(token.memberCount)
  }
}

export const FormatPriceBy = (price: PriceByHourFieldsFragment | PriceByDayFieldsFragment) => {
  return {
    minPrice: Number(price.maxPrice),
    maxPrice: Number(price.maxPrice),
    openPrice: Number(price.openPrice),
    closePrice: Number(price.closePrice),
    timestamp: Number(price.timestamp) * 1e3,
    tokenTvl: Number(price.tokenTvl),
  }
}

