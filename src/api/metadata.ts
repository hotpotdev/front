import { getUrl } from "@/hooks/useWeb3Storage";
import type { IHotpot_Metadata } from "@/libs/types/metadata";
import { UpLoadString, UploadFile } from "@/utils/ipfs";

// UploadMetadata
export const UploadMetadata = async (metadata: IHotpot_Metadata, logoFile?: File) => {
  if (logoFile) {
    metadata.image = await UploadFile(logoFile) as string;
  }
  const metadataUrl = await UpLoadString(JSON.stringify(metadata), `${metadata.name}.json`);
  return metadataUrl
}

// FetchMetadata
export const FetchMetadata = async (url: `ipfs://${string}`): Promise<IHotpot_Metadata> => {
  const res = await fetch(getUrl(url.replaceAll('ipfs://', '')), {
    mode: 'cors'
  });
  const data: IHotpot_Metadata = await res?.json();
  if (data.image && data.image.startsWith('ipfs://')) {
    data.image = getUrl(data.image.replaceAll('ipfs://', ''));
  }
  data.external_url = data.external_url?.includes('127.0.0.1') || data.external_url?.includes('localhost') ? window.location.origin : data.external_url;
  return data;
};
