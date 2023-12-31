import { DownIcon } from '@/assets';
import { useScroll } from 'ahooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export type BackTopProps = {
  showHeight?: number;
  minStep?: number;
  maxCount?: number;
  interval?: number;
  deviation?: number;
  parent: React.RefObject<HTMLElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

// back top
const BackTop = ({
  showHeight = 80,
  minStep = 80,
  maxCount = 5,
  interval = 60,
  deviation = 50,
  parent,
  ...attrs
}: BackTopProps) => {
  let history = 0;
  let top = 0;
  let start = Date.now();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const scroll = useScroll(parent, val => {
    if (val.top > showHeight && !show) {
      setShow(true);
      return true;
    }
    if (val.top <= showHeight && show) {
      setShow(false);
      return true;
    }
    return false;
  });

  const scrollToTop = () => {
    if (Date.now() - start >= interval && parent?.current && scroll?.top) {
      if (Math.abs(parent.current.scrollTop - history) <= deviation) {
        if (parent.current.scrollTop > 0) {
          const scrollTop = parent.current.scrollTop - Math.min(parent.current.scrollTop, top);
          parent.current.scroll(parent.current.scrollLeft, scrollTop);
          history = scrollTop;
          start = Date.now();
          window.requestAnimationFrame(scrollToTop);
        }
      }
    } else window.requestAnimationFrame(scrollToTop);
  };

  const gotTop = () => {
    if (scroll?.top && parent) {
      history = parent.current?.scrollTop || 0;
      top = Math.max(Math.floor(history / maxCount), minStep);
      scrollToTop();
    }
  };
  const setTopZero = useCallback(() => {
    if (parent.current) {
      parent.current.scrollTop = 0;
    }
  }, [parent]);
  useEffect(() => {
    const mount = () => {
      if (typeof window !== 'undefined') {
        router.events.on('routeChangeComplete', setTopZero);
        router.events.on('beforeHistoryChange', setTopZero);
        router.events.on('routeChangeError', setTopZero);
      }
    };
    const unmount = () => {
      if (typeof window !== 'undefined') {
        router.events.off('routeChangeComplete', setTopZero);
        router.events.off('beforeHistoryChange', setTopZero);
        router.events.off('routeChangeError', setTopZero);
      }
    };
    mount();
    return unmount;
  }, [parent, router.events, setTopZero]);
  return (
    <aside
      className={clsx(
        'leading-11 z-50 fixed bottom-0 right-4 btn btn-circle btn-xs w-11 h-11 transform cursor-pointer flex select-none transition-all duration-500 md:right-8',
        'hover:scale-105 hover:btn-primary md:hover:-translate-y-7',
        attrs.className,
        show ? '-translate-y-20 opacity-90 md:-translate-y-8' : 'translate-y-20 opacity-0 md:translate-y-8'
      )}
      onClick={gotTop}
      {...attrs}
    >
      <DownIcon className="rotate-180 transform w-6 h-6 fill-current" />
    </aside>
  );
};

export default BackTop;
