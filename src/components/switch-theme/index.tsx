import { DarkIcon, LightIcon } from '@/assets';
import useTheme from '@/hooks/useTheme';
import clsx from 'clsx';

export type CThemeProps = {} & React.SVGAttributes<SVGSVGElement>;
const SwitchTheme = (attrs: CThemeProps) => {
  const { theme, switchTheme } = useTheme();
  return (
    <label
      className={clsx('swap swap-rotate text-xl hover:text-primary ')}
    >
      <input type="checkbox" defaultChecked={theme === 'dark'} onChange={() => switchTheme(theme === 'dark' ? 'light' : 'dark')} />
      <DarkIcon {...attrs} className={clsx('swap-on w-6 h-6 fill-current', attrs.className)} />
      <LightIcon {...attrs} className={clsx('swap-off w-6 h-6 fill-current', attrs.className)} />
    </label>
  );
};
export default SwitchTheme;
