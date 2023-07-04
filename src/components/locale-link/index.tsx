import clsx from 'clsx';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import useLocale from '@/hooks/useLocale';

export type LocaleLinkProps = Omit<LinkProps, 'href' | 'onClick'> & {
  href?: string;
  locale?: string;
  children?: React.ReactNode;
  skipLocaleHandling?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LocaleLink = ({ children, skipLocaleHandling, ...attrs }: LocaleLinkProps) => {
  const router = useRouter();
  const { locale, switchLocale } = useLocale();
  const linkLocale = attrs.locale || (router.query.locale as string) || locale;
  let target = attrs.target || '_self';
  let href = attrs.href || router.asPath || '';
  if (href.toString().indexOf('http') === 0) {
    // eslint-disable-next-line no-param-reassign
    skipLocaleHandling = true;
    target = '_blank';
  }
  if (linkLocale && !skipLocaleHandling) {
    href = attrs.href ? `/${linkLocale}${href}` : href.replace(router.query.locale as string, linkLocale);
  }
  return (
    <Link
      {...attrs}
      href={href}
      locale={locale}
      title={attrs.title || href || locale}
      target={target}
      className={clsx('inline-flex transform cursor-pointer no-underline transition-transform', attrs.className)}
      onClick={e => {
        if (router.asPath == href || attrs.href?.match(/^#.?/)) {
          e.stopPropagation();
          e.preventDefault();
        }
        if (attrs.href && attrs.href?.match(/^#.?/)) {
          window.location.hash = attrs.href;
        }
        if (attrs.locale && attrs.locale !== locale) switchLocale(attrs.locale);
        if (attrs.onClick) attrs.onClick(e);
      }}
    >
      {children}
    </Link>
  );
};

export default LocaleLink;
