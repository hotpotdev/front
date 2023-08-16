import { APP_I18N } from '@/conf';
import useLocale from '@/hooks/useLocale';
import { ArrowDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LanguageSwitcher, useTranslation } from 'next-export-i18n';

type SwitchLocaleProps = React.HTMLAttributes<HTMLElement> & {};
//
const SwitchLocale = ({ ...attrs }: SwitchLocaleProps) => {
  const { locale, switchLocale } = useLocale();
  const { t } = useTranslation()
  return (
    <div {...attrs} className={clsx('dropdown dropdown-bottom dropdown-end', attrs.className)}>
      <label tabIndex={0} className="btn m-1 space-x-2">
        <span>{t(locale)}</span>
        <ChevronDownIcon className="w-4 h-4"/>
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {APP_I18N.locales.map(item => (
          <li key={`switch-locale-${item}`} onClick={() => switchLocale(item)}>
            <LanguageSwitcher lang={item}>{t(item)}</LanguageSwitcher>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SwitchLocale;
