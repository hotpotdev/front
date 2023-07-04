import type { GetStaticPaths } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { APP_I18N } from '@/conf'

export const defaultLocale = APP_I18N.defaultLocale || APP_I18N.locales[0]

export const getI18nPaths = () => {
  return APP_I18N.locales.map((lng: string) => ({
    params: {
      locale: lng,
    },
  }))
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: false,
    paths: getI18nPaths(),
  }
}

export async function getI18nProps(ctx: { params: { locale: string } }, ns: string[] = []) {
  const locale = ctx?.params?.locale || defaultLocale
  const props = await serverSideTranslations(locale, ns)
  return props
}

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: { params: { locale: string } }) {
    const locale = ctx?.params?.locale || defaultLocale
    if (locale.match(APP_I18N.locales.join('|')) === null) {
      return {
        redirect: {
          destination: `/${APP_I18N.defaultLocale}/404`,
          permanent: false,
        },
      }
    }
    return {
      props: await getI18nProps(ctx, ns),
    }
  }
}
