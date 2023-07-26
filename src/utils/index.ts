
import { goerli, zkSync, bsc, polygonMumbai, zkSyncTestnet } from "wagmi/chains"

export const NetToChainId = (net: string) => {
  return {
    'goerli': goerli.id,
    'mumbai': polygonMumbai.id,
    'bsc': bsc.id,
    'zkSync2-testnet': zkSyncTestnet.id,
    'zksync-era': zkSync.id,
  }[net] as number | undefined
}

export type SubscribeEmailParms = {
  email: string;
  locale?: string;
  firstname?: string;
  lastname?: string;
  url?: string;
};
/**
 * Subscribe Email
 * @param {SubscribeEmailParms} param
 */
export const SubscribeEmail = async ({
  email,
  locale = 'en',
  firstname = '',
  lastname = '',
  url = 'https://f0901f79.sibforms.com/serve/MUIEAIeGmculraiYDjkkWqiB-Nr0gLBoJg_K5XVrfg1W61PXKUvSsJLVg7-O57y1_AJ-O78OHvt1OMyA9Cy-vkQPKyJ1HlauaV7UZKzomHCVwPSPT8NAWWW7z7HQdvcCr0CE5hHP32VrHbUrvsFxv2C8kx0qIKlBa6_6KYVEVK5gmeVlwLYx7ImYrC_yWWXMdGanDWAQHtAibAEe'
}: SubscribeEmailParms) => {
  const fromData = new URLSearchParams();
  fromData.append('FIRSTNAME', firstname);
  fromData.append('LASTNAME', lastname);
  fromData.append('locale', locale);
  fromData.append('email_address_check', '');
  fromData.append('EMAIL', email);
  await fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      // 'sec-fetch-dest': 'document',
      // 'sec-fetch-mode': 'navigate',
      // 'sec-fetch-site': 'cross-site',
      // 'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1'
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: fromData,
    method: 'POST',
    mode: 'no-cors'
  });
};

/**
 * stop input number scroll change
 * @param event
 * @returns
 */
export const StopScrollFun = (event: React.BaseSyntheticEvent) => {
  if(event.currentTarget?.blur) event.currentTarget.blur()
  return false;
}
