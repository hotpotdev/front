import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type SliPillProps = {
  sli: number[];
  initIndex?: number;
  selectValue?: number;
  onSelected?: (item: number, index: number) => void;
  formatter?: (item: number, index: number) => string;
} & React.HTMLAttributes<HTMLElement>;
// 利率设置
const SliPill = ({ sli, initIndex = -1, onSelected, formatter, selectValue = undefined, ...attrs }: SliPillProps) => {
  const [active, setActive] = useState(initIndex);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const defFormatter = (item: number, index: number) => `${item * 100}%`;
  const onClick = (e: any, index: number) => {
    setActive(index);
    onSelected && onSelected(sli[index], index);
    if (ref.current) {
      //@ts-ignore
      ref.current.style.transform = `translateX(${index * e.target.clientWidth}px)`;
      //@ts-ignore
      ref.current.style.webkitTransform = `translateX(${index * e.target.clientWidth}px)`;
    }
  };
  useEffect(() => {
    const index = sli.indexOf(selectValue ?? 0);
    setActive(sli.indexOf(selectValue ?? 0));

    if (ref.current) {
      //@ts-ignore
      ref.current.style.transform = `translateX(${
        index * (buttonRef.current ? (buttonRef.current as any).clientWidth : 0)
      }px)`;
      //@ts-ignore
      ref.current.style.webkitTransform = `translateX(${
        index * (buttonRef.current ? (buttonRef.current as any).clientWidth : 0)
      }px)`;
    }
  }, [selectValue, sli]);
  return (
    <div {...attrs} className={clsx('relative flex rounded-full bg-base-100 px-1 font-medium text-xs', attrs.className)}>
      {sli.map((item, index) => (
        <button
          ref={buttonRef}
          type="button"
          key={`SliPill-${item}-${index}`}
          className="w-12 rounded-full p-2 text-center"
          onClick={e => onClick(e, index)}
        >
          {formatter ? formatter(item, index) : defFormatter(item, index)}
        </button>
      ))}
      <span
        ref={ref}
        style={
          active >= 0
            ? {}
            : {
                display: 'none'
              }
        }
        className={clsx(
          'absolute w-12 transform rounded-full bg-base-200 px-[6px] py-[8px] text-center transition-all duration-300 ease-in-out'
        )}
      >
        {formatter ? formatter(sli[active], active) : defFormatter(sli[active], active)}
      </span>
    </div>
  );
};

export default SliPill;
