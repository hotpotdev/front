import { web3StorageClinet, createClient } from '@/hooks/useWeb3Storage';


// 上传文件
export const UploadFile = async (file: File): Promise<`ipfs://${string}` | undefined> => {
  if (!web3StorageClinet) await createClient();
  const cid = await web3StorageClinet?.put([file], { wrapWithDirectory: false });
  return `ipfs://${cid}`;
};

// 上传文本
export const UpLoadString = async (
  str: string,
  filename: string = Date.now().toString(),
  type = 'application/json'
): Promise<`ipfs://${string}` | undefined> => {
  return UploadFile(new File([str], filename, { type }));
};
