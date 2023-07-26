
import { useCalculateBurnAmount } from '@/libs/sdk/hooks/useBondingCurve';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { formatEther, parseEther } from 'viem';
import { useChainPlatform } from '@/hooks/useChainInfo';
import { ComputeBondingCurve } from '@/libs/sdk/utils/curve';
import { IBondingCurveType } from '@/libs/sdk/types/curve';
import useChain from '@/hooks/useChain';
import { RATE_MULTIPLIER } from '@/libs/sdk/utils/format';
import { ScientificToString } from '@/libs/common/utils';

export type useMintFirstAmountProps = {
  bondingCurveType: IBondingCurveType,
  supplyExpect: number;
  priceExpect: number,
  initPrice: number,
  mintTaxRate: number,
  mintAmount: number,
}


export const useMintFirstAmount = ({
  bondingCurveType = 'linear',
  supplyExpect = 0,
  priceExpect = 0,
  initPrice = 0,
  mintTaxRate = 0,
  mintAmount = 0
}: useMintFirstAmountProps) => {
  const { params } = useMemo(() => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }), [bondingCurveType, initPrice, priceExpect, supplyExpect])
  const mintValue = useMemo(() => {
    if (mintAmount !== undefined && !isNaN(mintAmount)) {
      return parseEther(ScientificToString(mintAmount))
    }
    return 0n;
  }, [mintAmount])
  const { data } = useChainPlatform()
  const bondingCurve = useMemo(() => data?.bondingCurve, [data])
  const { chain } = useChain()
  const { data: payAmount, ...result } = useCalculateBurnAmount({
    chainId: chain.id,
    type: bondingCurveType,
    params,
    mintValue,
    contractAddress: bondingCurve?.[bondingCurveType],
  })
  const payValue = useMemo(() => {

    if (payAmount && !isNaN(mintTaxRate) && !isNaN(Number(data?.mintTax))) {
      return Number(formatEther(payAmount)) / (1 - mintTaxRate / 100 - (Number(data?.mintTax) / RATE_MULTIPLIER))
    }
    return 0
  }, [data?.mintTax, mintTaxRate, payAmount])
  return {
    ...result,
    payAmount,
    payValue,
  }
}
