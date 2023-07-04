const path = require('path');
const isPro = process.env.NODE_ENV === 'production';

/** @type {import('next-i18next').UserConfig} */
const config = {
  debug: false,
  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  react: {
    useSuspense: false,
  },
  preload: ['en', 'cn'],
  reloadOnPrerender: true,
  returnObjects: true,
  serializeConfig: true,
  fallbackLng: 'en',
  defaultNS: 'common',
  localePath: path.resolve('./src/locales')
};

module.exports = config;
