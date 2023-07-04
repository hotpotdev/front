import clsx from 'clsx';

import AnimationOnScroll from '@/components/animation-on-scroll';


import type { LocaleLinkProps } from '@/components/locale-link';
import LocaleLink from '@/components/locale-link';
import { LAYOUT_ID } from '@/conf';
import { DiscordIcon, GithubIcon, MediumIcon, TelegramIcon, TwitterIcon } from '@/assets';

export type TheCommunityProps = {
  items: ({ icon: string; text: string } & LocaleLinkProps)[];
} & React.HTMLAttributes<HTMLDivElement>;

const TheCommunity = ({ items, ...attrs }: TheCommunityProps) => {
  const getIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'telegram': return <TelegramIcon className="w-12 fill-current mx-auto"/>;
      case 'twitter': return <TwitterIcon  className="w-12 fill-current mx-auto"/>;
      case 'discord': return <DiscordIcon  className="w-12 fill-current mx-auto"/>;
      case 'medium': return <MediumIcon  className="w-12 fill-current mx-auto"/>;
      case 'github': return <GithubIcon  className="w-12 fill-current mx-auto"/>;
      default: <></>;
    }
  }
  return (
    <AnimationOnScroll
      duration={1}
      delay={1}
      animateOnce={true}
      scrollableParentSelector={`#${LAYOUT_ID}`}
      className={clsx(
        'rounded-xl flex flex-wrap mx-auto bg-base-200 w-full py-8 px-14 justify-between md:rounded-full md:max-w-screen-lg',
        attrs.className
      )}
      animateIn={'animate-fadeInUp'}
      {...attrs}
    >
      {items && items.length > 0 && typeof items === 'object'
        ? items.map(({ icon, text, ...atrs }) => {
          return (
            <LocaleLink
              {...atrs}
              key={`TheCommunity-${icon}`}
              className={clsx('flex w-30 h-22 items-end hover:link-primary', atrs.className)}
            >
              <dl className="space-y-2 text-center">
                <dd>
                  {getIcon(icon)}
                </dd>
                <dt>{text}</dt>
              </dl>
            </LocaleLink>
          );
        })
        : null}
    </AnimationOnScroll>
  );
};

export default TheCommunity;
