import type { StaticImageData } from 'next/image'
import type { SVGAttributes } from 'react';

export type Hash = `0x${string}`
export type IUrlType = `ipfs://${string}` | `ar://${string}` | `http://${string}` | `https://${string}` | string;
export type ITokenMeta = {
  name: string;
  symbol: string;
  logo: React.ElementType<SVGAttributes<string>> | string | StaticImageData;
  address: Hash;
}
