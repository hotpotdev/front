import Image from 'next/image';

import AnimationOnScroll from '@/components/animation-on-scroll';
import useTheme from '@/hooks/useTheme';
import { LAYOUT_ID } from '@/conf';
import NoSsr from '@/components/no-ssr';

export type TheBoosterProps = {
  items: { title: string; text: string; src: string }[];
};

const TheBooster = ({ items }: TheBoosterProps) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-wrap mx-auto space-y-6 md:space-y-0 md:pl-20 md:justify-center">
      {items && items.length > 0 && typeof items === 'object'
        ? items.map((item, index) => {
          return (
            <AnimationOnScroll
              duration={1}
              delay={index}
              key={item.title}
              animateOnce={true}
              scrollableParentSelector={`#${LAYOUT_ID}`}
              className="flex max-w-130 p-6 items-center md:py-18 md:w-1/2"
              animateIn={'animate-fadeInUp'}
            >
              <div className="h-16 w-16 relative">
                <NoSsr>
                  <Image
                    alt=""
                    src={item.src.replace('{{theme}}', theme)}
                    fill
                    sizes="100vw 100vw"
                    className="object-contain object-center"
                  />
                </NoSsr>
              </div>
              <div className="flex flex-col flex-1 leading-normal pl-9 justify-between">
                <h3 className="font-bold text-xl mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-text2 leading-5">{item.text}</p>
              </div>
            </AnimationOnScroll>
          );
        })
        : null}
    </div>
  );
};

export default TheBooster;
