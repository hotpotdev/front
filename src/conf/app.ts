import { i18n } from '@@/next-i18next.config';
import { Poppins } from 'next/font/google';

// app name
export const APP_NAME = 'Hotpot';

// app font
export const APP_FONT = Poppins({
  subsets: ['latin'],
  variable: '--f-family',
  weight: ['400', '500', '600', '700']
});

export const APP_THEME = 'dark';
export const APP_THEMES = ['system', 'dark', 'light'];

export const APP_I18N = i18n;
export const APP_DIR = 'ltr';

export const APP_URL = {
  landing: '',
  app: '',
  info: ''
};

// ipfs conf
export const IPFS_CONF = {
  gateway: 'https://w3s.link/ipfs/{cid}',
  we3storage: {
    gateway: 'https://w3s.link/ipfs/{cid}',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERhMmNCZjYyZjczMWU2OERlNzZCMTZCRjI5ZkFFNzgzQmM3MDFjYzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzI5ODM2OTAxODcsIm5hbWUiOiJob3Rwb3QifQ.9L_0g7Z_Q1edfaKq8gswi4X6DlqdSXJLYzWb5FfLkoM'
  }
};
