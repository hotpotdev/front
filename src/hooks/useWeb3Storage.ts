import { IPFS_CONF } from '@/conf';
import { useEffect } from 'react';
import { Web3Storage } from 'web3.storage';

export let web3StorageClinet: Web3Storage | undefined;

export const createClient = async () => {
  if (!web3StorageClinet && typeof window !== 'undefined') {
    web3StorageClinet = new Web3Storage({ token: IPFS_CONF.we3storage.token });
  }
};
export const getUrl = (cid: string) => {
  return IPFS_CONF.we3storage.gateway.replaceAll('{cid}', cid);
};

const useWeb3Storage = () => {
  useEffect(() => {
    if (!web3StorageClinet) createClient();
  }, []);
  return {
    web3StorageClinet,
    getUrl
  };
};

export default useWeb3Storage;
