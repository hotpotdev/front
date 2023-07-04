import { Hash, ITokenMeta } from '@/libs/types/type';
import { IBondingCurveType, ITokenType } from '@/libs/sdk/types/curve';

export type IFormData = {
  name?: string;
  symbol?: string;
  description?: string;
  logoFile?: File;
  logoData?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  discordUrl?: string;
  telegramUrl?: string;
  ownerAddress?: Hash;

  tokenType: ITokenType;
  isSbt: boolean;
  bondingCurveType: IBondingCurveType;
  supplyExpect?: number;
  priceExpect?: number;
  raisingToken: ITokenMeta;
  initPrice?: number;

  treasuryAddress?: Hash;
  mintTaxRate?: number;
  burnTaxRate?: number;
  mintAmount?: number;

  isAccept: boolean;
};
