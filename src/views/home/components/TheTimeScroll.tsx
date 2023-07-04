import { BackIcon } from '@/assets';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';



export type TheTimeScrollItem = {
  time: string;
  title: string;
  descriptions: string[];
};

export type TheTimeScrollProps = { init?: number; items: TheTimeScrollItem[] } & React.HTMLAttributes<HTMLElement>;

const TheTimeScroll = ({ items, init = 0, ...attrs }: TheTimeScrollProps) => {
  const [index, setIndex] = useState(init);
  const [isClick, setClick] = useState(false);
  const timeLine = useRef<HTMLOListElement>(null);
  const len = items.length - 1;
  const setView = useCallback(() => {
    if (timeLine.current) {
      const itemEl = timeLine.current.childNodes[index] as HTMLElement | undefined;
      if (itemEl) {
        const { offsetWidth } = itemEl;
        if (!isClick) timeLine.current.scrollLeft = index * offsetWidth;
      }
    }
  },[index, isClick]);
  const prev = () => {
    const i = index - 1;
    if (i >= 0) {
      setClick(false);
      setIndex(i);
    }
  };
  const next = () => {
    const i = index + 1;
    if (i <= len) {
      setClick(false);
      setIndex(i);
    }
  };
  useEffect(() => {
    if (typeof window !== undefined) setView();
  }, [index, setView]);
  return (
    <div className={clsx('rounded-xl flex flex-col items-center md:items-stretch bg-base-200 p-8 ', attrs.className)}>
      {/* time line */}
      <div className="px-12 p-2 w-82 relative md:w-full">
        {/* prev */}
        <button
          className="rounded-full bg-[#FFEFF6] h-10 text-primary top-5 left-0 w-10 z-2 hidden absolute items-center justify-center md:block disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => prev()}
          disabled={index === 0}
        >
          <BackIcon className="w-8 h-8" />
        </button>
        <button
          className="rounded-xl flex bg-[#FFEFF6] h-17 text-primary top-5 left-0 w-17 z-2 absolute items-center justify-center md:hidden disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => prev()}
          disabled={index === 0}
        >
          <span className="bg-primary rounded-full h-3 w-3"></span>
        </button>
        {/* line */}
        <hr className="bg-primary border-none mx-auto h-[2px] top-10 right-12 left-12 absolute hidden md:block"></hr>
        {/* time list */}
        <ol className="flex flex-nowrap w-full z-1 items-center not-scroll overflow-x-auto" ref={timeLine}>
          {items && items.length > 0 && typeof items === 'object'
            ? items.map((item, i) => (
              <li key={`time-line-${item.time}`} className="flex-shrink-0 px-14 md:px-16 lg:px-12">
                <div
                  className={clsx(
                    'cursor-pointer flex flex-col space-y-4 rounded-2xl h-28 transform transition-all w-32 items-center justify-center focus:bg-primary ',
                    index === i ? 'bg-primary' : ''
                  )}
                  onClick={() => {
                    setClick(true);
                    setIndex(i);
                  }}
                >
                  <div className={clsx('rounded-full h-4 ring-5 w-4',index === i ?  'bg-white ' : 'bg-primary')}></div>
                  <h3 className="font-semibold text-lg">
                    <time className={clsx('leading-none', index === i ? 'text-white' : '')}>{item.time}</time>
                  </h3>
                </div>
              </li>
            ))
            : null}
        </ol>
        {/* next */}
        <button
          className="rounded-full  bg-[#FFEFF6] h-10 text-primary top-5 right-0 w-10 z-2 hidden absolute items-center justify-center md:block disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => next()}
          disabled={index === len}
        >

          <BackIcon className="w-8 h-8 transform rotate-180" />
        </button>
        <button
          className="rounded-xl flex bg-[#FFEFF6] h-17 text-primary top-5 right-0 w-17 z-2 absolute items-center justify-center md:hidden disabled:cursor-not-allowed disabled:opacity-90"
          onClick={() => next()}
          disabled={index === len}
        >
          <span className="bg-primary rounded-full h-3 w-3"></span>
        </button>
      </div>
      {/* content */}
      {items && items.length > 0 && typeof items === 'object' ? (
        <div className="flex flex-col space-y-10 w-full p-10 items-start justify-center md:flex-row md:space-y-0 md:p-12">
          <h3 className="font-bold flex-1 text-center text-primary w-full text-2xl whitespace-pre-wrap block md:text-left md:text-4xl">
            {items[index].title}
          </h3>
          <ul className="list-disc flex-1 text-sm text-text2 leading-8">
            {items[index].descriptions.map(des => (
              <li key={des}>{des}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default TheTimeScroll;
