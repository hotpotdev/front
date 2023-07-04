import { FetchMetadata, UploadMetadata } from "@/api/metadata"
import { IHotpot_Metadata } from "@/libs/types/metadata"
import { useQuery } from "@tanstack/react-query"


export const useFetchMetadata = (url: `ipfs://${string}`) => {
  const queryFn = async () => FetchMetadata(url);
  return useQuery({
    queryKey: [url],
    queryFn,
    enabled: Boolean(url),
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  })
}

export const useUploadMetadata = (metadata: IHotpot_Metadata, logoFile?: File) => {
  const queryFn = async () => UploadMetadata(metadata, logoFile);
  return useQuery({
    queryKey: [metadata, logoFile],
    queryFn,
    enabled: Boolean(metadata),
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  })
}
