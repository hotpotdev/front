import Image from 'next/image';

import AnimationOnScroll from '@/components/animation-on-scroll';
import { LAYOUT_ID } from '@/conf';

export type TheUseCaseProps = {
  items: { title: string; text: string; src: string }[];
};

const TheUseCase = ({ items }: TheUseCaseProps) => {
  return (
    <>
      {items && items.length > 0 && typeof items === 'object'
        ? items.map((item, index) => {
            return (
              <AnimationOnScroll
                duration={2}
                delay={index}
                animateOnce={true}
                key={item.title}
                scrollableParentSelector={`#${LAYOUT_ID}`}
                animateIn={'animate-fadeInUp'}
              >
                <div className="rounded-xl flex flex-col-reverse mx-auto bg-base-200  p-4 items-center md:flex-row md:max-w-screen-lg md:pb-8">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-center mb-6 tracking-tight md:text-left">{item.title}</h3>
                    <p className="text-sm text-text2 leading-5 break-words">{item.text}</p>
                  </div>
                  <div className="h-auto mb-4 w-26 md:mb-0 md:ml-9">
                    <Image
                      alt={item.title}
                      src={item.src}
                      width="100"
                      height="100"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              </AnimationOnScroll>
            );
          })
        : null}
    </>
  );
};

export default TheUseCase;
