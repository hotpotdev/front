
import { encodeAbiParameters, parseEther, parseUnits } from 'viem';
import { IBondingCurveType, ILaunchParam, IExponentialParam, ILinearParam, ISquarerParam } from '../types/curve';
import { ScientificToString } from '@/libs/common/utils';


export type BondingCurveChart = { supply: number; price: number }[];

export const GenerateLinear = (params: ILinearParam, count: number, maxX: number) => {
  if ((params?.k === undefined && params.k < 0) || maxX <= 0) {
    return [];
  }
  let data: BondingCurveChart = [];
  const actualK = Number(params.k);
  const step = maxX / count;
  for (let i = 0; i < count; i++) {
    const supply = step * i;
    data.push({ supply: supply, price: actualK * supply + params?.p });
  }
  return data;
};

export const GenerateSquareroot = (params: ISquarerParam, count: number, maxX: number) => {
  if (params?.a === undefined || maxX <= 0) {
    return [];
  }
  let data: BondingCurveChart = [];
  const step = maxX / count;
  for (let i = 0; i < count; i++) {
    const supply = step * i;
    data.push({ supply: supply, price: params.a * Math.sqrt(supply) });
  }
  return data;
};

export const GenerateExponential = (params: IExponentialParam, count: number, maxX: number) => {
  if (params?.b === undefined || params?.a === undefined || maxX <= 0) {
    return [];
  }
  let data: BondingCurveChart = [];
  const step = maxX / count;
  for (let i = 0; i < count; i++) {
    const supply = step * i;
    data.push({ supply: supply, price: (params.a / params.b) * Math.exp(supply / params.b) });
  }
  return data;
};


export const EncodeBondingCurveLinear = (params: ILinearParam): `0x${string}` => {
  if (params?.k === undefined || params?.k < 0) {
    return '0x';
  }
  return encodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], [parseEther(ScientificToString(params.k)), parseEther(ScientificToString(params.p))])
};

export const FormatBondingCurveLinear = (params: ILinearParam): ILinearParam => {
  return {
    k: params.k / 1e18,
    p: params.p / 1e18
  }
}

export const EncodeBondingCurveSquareroot = (params: ISquarerParam): `0x${string}` => {
  if (params?.a === undefined || params.a < 0) {
    return `0x`
  }
  return encodeAbiParameters([{ type: 'uint256' }], [parseUnits(ScientificToString(params.a), 9)])
};

export const FormatBondingCurveSquareroot = (params: ISquarerParam): ISquarerParam => {
  return {
    a: params.a / 1e9
  }
}

export const EncodeBondingCurveExponential = (params: IExponentialParam): `0x${string}` => {
  if (params?.b === undefined || params?.a === undefined || params.a < 0 || params.b < 0) {
    return `0x`
  }
  return encodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], [parseEther(ScientificToString(params.a)), parseEther(ScientificToString(params.b))])
};

export const FormatBondingCurveExponential = (params: IExponentialParam): IExponentialParam => {
  return {
    a: params.a / 1e18,
    b: params.b / 1e18
  }
}

export type ComputeProps = {
  supplyExpect: number;
  priceExpect: number;
  initPrice: number;
};
export const ComputeLinear = ({
  supplyExpect,
  priceExpect,
  initPrice
}: ComputeProps): { params: ILinearParam; tvl: number } => {
  const p = initPrice;
  const k = (priceExpect - initPrice) / supplyExpect;
  const tvl = (k * supplyExpect * supplyExpect) / 2 + p * supplyExpect;
  return {
    params: { k, p },
    tvl
  };
};

export const ComputeSquareroot = ({
  supplyExpect,
  priceExpect,
  initPrice
}: ComputeProps): { params: ISquarerParam; tvl: number } => {
  const a = priceExpect / Math.sqrt(supplyExpect);
  const tvl = (2 / 3) * a * Math.pow(supplyExpect, 3 / 2);
  return {
    params: { a },
    tvl
  };
};

export const ComputeExponential = ({
  supplyExpect,
  priceExpect,
  initPrice
}: ComputeProps): { params: IExponentialParam; tvl: number } => {
  const a = (initPrice * supplyExpect) / Math.log(priceExpect / initPrice);
  const b = supplyExpect / Math.log(priceExpect / initPrice);
  const tvl = a * Math.pow(Math.E, supplyExpect / b);
  return {
    params: { a, b },
    tvl
  };
};

export const EncodeLaunchData = (data: ILaunchParam): { calldata: Array<any>; value: bigint } => {
  let params;
  switch (data.bondingCurveType) {
    case 'linear':
      params = EncodeBondingCurveLinear(data.params as ILinearParam);
      break;
    case 'squareroot':
      params = EncodeBondingCurveSquareroot(data.params as ISquarerParam);
      break;
    case 'exponential':
      params = EncodeBondingCurveExponential(data.params as IExponentialParam);
      break;
  }
  const mintTaxRate = BigInt(Math.floor(data.mintTaxRate * 1e2));
  const burnTaxRate = BigInt(Math.floor(data.burnTaxRate * 1e2));
  const payAmount = data.payAmount ? data.payAmount * 10000n / (10000n - mintTaxRate - BigInt(data?.factroyMintTaxRate ?? 80)) : 0n;
  console.log(data,payAmount)
  return {
    calldata: [
      data.tokenType,
      data.bondingCurveType,
      data.name,
      data.symbol,
      data.metadataUrl,
      data.ownerAddress,
      data.treasuryAddress,
      mintTaxRate,
      burnTaxRate,
      data.isSbt,
      data.raisingTokenAddress,
      params
    ],
    value: payAmount
  };
};

export type FormatBondingCurveProps = {
  type: IBondingCurveType;
  params: ILinearParam | ISquarerParam | IExponentialParam;
};

export const FormatBondingCurve = ({ type, params }: FormatBondingCurveProps) => {
  switch (type) {
    case 'linear':
      return FormatBondingCurveLinear(params as ILinearParam);
    case 'squareroot':
      return FormatBondingCurveSquareroot(params as ISquarerParam);
    case 'exponential':
      return FormatBondingCurveExponential(params as IExponentialParam);
  }
};
export type ComputeBondingCurveProps = {
  type: IBondingCurveType;
} & ComputeProps;
export type ComputeBondingCurveResult = { params: ILinearParam | ISquarerParam | IExponentialParam; tvl: number }
export const ComputeBondingCurve = ({ type, ...props }: ComputeBondingCurveProps): ComputeBondingCurveResult => {
  let result: ComputeBondingCurveResult = {
    params: {
      k: 0,
      p: 0
    },
    tvl: 0
  };
  switch (type) {
    case 'linear':
      result = ComputeLinear(props);
      break;
    case 'squareroot':
      result = ComputeSquareroot(props);
      break;
    case 'exponential':
      result = ComputeExponential(props);
      break;
  }
  return result;
};
