import { IToken } from "../hooks/useToken";
import { PriceByDayFieldsFragment, PriceByHourFieldsFragment } from "../types/graphql";

export const RATE_MULTIPLIER = 1e4
export const DECIMALS = 18
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
    treasuryFee: Number(token.treasuryFee) / RATE_MULTIPLIER,
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

