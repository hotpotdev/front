import clsx from 'clsx';
import Image from 'next/image';

import AnimationOnScroll from '@/components/animation-on-scroll';
import type { LocaleLinkProps } from '@/components/locale-link';
import { APP_THEME, LAYOUT_ID } from '@/conf';
import useTheme from '@/hooks/useTheme';
import LocaleLink from '@/components/locale-link';
import NoSsr from '@/components/no-ssr';

export type TheLinkImgProps = {
  items: ({ alt: string; src: string } & LocaleLinkProps)[];
} & React.HTMLAttributes<HTMLDivElement>;

const TheEcosystems = ({ items, ...attrs }: TheLinkImgProps) => {
  const { theme = APP_THEME } = useTheme();
  return (
    <div
      {...attrs}
      className={clsx(
        'bg-base-200 py-6 rounded-xl flex flex-wrap mx-auto justify-center md:space-x-8 lg:max-w-screen-lg dark:bg-transparent',
        attrs.className || ''
      )}
    >
      {items && items.length > 0 && typeof items === 'object'
        ? items.map((item, index) => {
          return (
            <AnimationOnScroll
              duration={2}
              delay={index}
              animateOnce={true}
              key={`ecosystem-${index}`}
              scrollableParentSelector={`#${LAYOUT_ID}`}
              animateIn={'animate-fadeInUp'}
            >
              <LocaleLink {...item} className="my-4 h-20 w-52 relative flex">
                <NoSsr>
                  <Image
                    alt={item.alt}
                    src={item.src.replace('{{theme}}', theme)}
                    fill
                    sizes="100vw 100vw"
                    className="object-contain object-center"
                  />
                </NoSsr>
              </LocaleLink>
            </AnimationOnScroll>
          );
        })
        : null}
    </div>
  );
};

export default TheEcosystems;
