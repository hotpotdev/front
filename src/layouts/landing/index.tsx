import { MenuIcon, HotpotLogoIcon } from '@/assets';
import BackTop from '@/components/back-top';
import ConnectWallet from '@/components/connect-wallet';
import SwitchLocale from '@/components/switch-locale';
import SwitchTheme from '@/components/switch-theme';
import { APP_NAME, LAYOUT_DRAWER_ID, LAYOUT_ID } from '@/conf';

import clsx from 'clsx';
import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, type PropsWithChildren, useCallback } from 'react';
import { useScroll } from 'react-use';

type TheLandingLayoutProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{

}>;

const TheLandingLayout = ({ children, ...attrs }: TheLandingLayoutProps) => {
  const { t } = useTranslation()
  const [query] = useLanguageQuery();
  const view = useRef(null);
  const { y } = useScroll(view);
  const router = useRouter()
  const isActive = useCallback((url: string) => {
    return url !== '/' ? router.asPath.startsWith(url) : url === router.asPath
  }, [router.asPath])
  return (
    <div  {...attrs} id={LAYOUT_ID} className={clsx('drawer w-full h-full overflow-y-auto relative', attrs.className)} ref={view}>
      <input id={LAYOUT_DRAWER_ID} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content -pt-[var(--h-header)]  w-full">
        {/* Navbar */}
        <header
          className={clsx(
            'bg-base-100 h-header backdrop-blur sticky top-0 z-50',
            y > 80 && 'border-b border-border1 shadow',
          )}>
          <div className="navbar h-full  container space-x-3 md:space-x-12 lg:space-x-20 flex items-center mx-auto">
            <label htmlFor={LAYOUT_DRAWER_ID} className="flex-none md:hidden btn btn-sm btn-ghost text-base">
              <MenuIcon className="w-8 h-8 stroke-current " />
            </label>
            <div className="space-x-2">
              <HotpotLogoIcon className="w-8 h-8 fill-primary stroke-primary" />
              <h1 className="hidden">{APP_NAME}</h1>
            </div>
            <div className="flex-1 hidden md:flex items-center space-x-3 md:space-x-12 lg:space-x-20 font-semibold">
              <Link href={{pathname: '/projects', query}} className={clsx('hover:text-primary', isActive('/projects') && 'text-primary')}>{t('project-list')}</Link>
              <Link href={{pathname: '/', query,}} className={clsx('hover:text-primary', isActive('/') && 'text-primary')}>{t('create-proje')}</Link>
            </div>
            <div className="flex-1 justify-end items-center space-x-3 md:space-x-6">
              <ConnectWallet className="rounded-2xl" />
              <SwitchLocale/>
              <SwitchTheme />
            </div>
          </div>
        </header>
        {/* Page content here */}
        {children}
        <footer
          className={clsx(
            'w-full container mx-auto border-t border-border1 py-12 mt-16 text-sm text-center flex justify-between items-center',
          )}
        >
          <p>{t('copyright')} © {new Date().getUTCFullYear()} {APP_NAME} {t('labs')}</p>
        </footer>
      </div>
      <aside className="drawer-side">
        <label htmlFor={LAYOUT_DRAWER_ID} className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 ">
          {/* Sidebar content here */}
          <li>
            <Link href={{pathname: '/projects', query}} className={clsx('hover:text-primary', isActive('/projects') && 'text-primary')}>{t('project-list')}</Link>
          </li>
          <li>
            <Link href={{pathname: '/', query}} className={clsx('hover:text-primary', isActive('/') && 'text-primary')}>{t('create-proje')}</Link>
          </li>
        </ul>
      </aside>
      <BackTop parent={view} />
    </div>
  );
};

export default TheLandingLayout;
