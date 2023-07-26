import { useMemo } from 'react';
import type { IBondingCurveType, IExponentialParam, ILinearParam, ISquarerParam } from '../types/curve';
import {
  BondingCurveChart,
  EncodeBondingCurveExponential,
  EncodeBondingCurveLinear,
  EncodeBondingCurveSquareroot,
  GenerateExponential,
  GenerateLinear,
  GenerateSquareroot
} from '../utils/curve';
import { Hash } from '../../types/type';
import { bondingCurveAbi } from '../contracts/BondingCurve';
import { useContractRead } from 'wagmi'

export type UseBondingCurveChartProps = {
  type: IBondingCurveType;
  params: ILinearParam | ISquarerParam | IExponentialParam;
  maxX: number;
  count?: number;
};
// BondingCurve Chart Data
export const useBondingCurveChart = ({ type, params, maxX, count = 300 }: UseBondingCurveChartProps) => {
  const chartData = useMemo(() => {
    let result: BondingCurveChart = [];
    if (count && maxX && params) {
      switch (type) {
        case 'linear':
          result = GenerateLinear(params as ILinearParam, count, maxX);
          break;
        case 'squareroot':
          result = GenerateSquareroot(params as ISquarerParam, count, maxX);
          break;
        case 'exponential':
          result = GenerateExponential(params as IExponentialParam, count, maxX);
          break;
      }
    }
    return result;
  }, [count, maxX, params, type])
  return {
    chartData,
    count,
    maxX,
    type
  };
};

export type UseBondingCurveEncodeProps = {
  type: IBondingCurveType;
  params: ILinearParam | ISquarerParam | IExponentialParam;
};
// BondingCurveChart encode
export const useBondingCurveEncode = ({ type, params }: UseBondingCurveEncodeProps) => {
  return useMemo(() => {
    return BondingCurveEncode(type, params)
  }, [params, type])
};

export const BondingCurveEncode = (type: IBondingCurveType, params: ILinearParam | ISquarerParam | IExponentialParam) => {
  let result = '';
  switch (type) {
    case 'linear':
      result = EncodeBondingCurveLinear(params as ILinearParam);
      break;
    case 'squareroot':
      result = EncodeBondingCurveSquareroot(params as ISquarerParam);
      break;
    case 'exponential':
      result = EncodeBondingCurveExponential(params as IExponentialParam);
      break;
  }
  return result
}

export type useCalculateBurnAmountProps = {
  type: IBondingCurveType;
  params: ILinearParam | ISquarerParam | IExponentialParam,
  contractAddress?: Hash,
  mintValue?: bigint,
  chainId?: number,
}

export const useCalculateBurnAmount = ({ type, params, contractAddress, mintValue,chainId }: useCalculateBurnAmountProps) => {
  const paramsData = useBondingCurveEncode({ type, params })
  return useContractRead({
    chainId,
    address: contractAddress,
    abi: bondingCurveAbi,
    functionName: 'calculateBurnAmountFromBondingCurve',
    args: [mintValue, mintValue, paramsData],
    enabled: Boolean(contractAddress) && Boolean(mintValue) && Boolean(paramsData),
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    select(data) {
      return data ? (data as bigint[])[1] : 0n;
    },
  })
}
