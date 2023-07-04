import clsx from 'clsx';
import { useRef, useState } from 'react';

type PillTabProps = {
  items: string[];
  initIndex?: number;
  onSelected?: (item: string, index: number) => void;
} & React.HTMLAttributes<HTMLElement>;
// PillTab
const PillTab = ({ items, initIndex = 0, onSelected, ...attrs }: PillTabProps) => {
  const [active, setActive] = useState(initIndex);
  const ref = useRef(null);
  const onClick = (e: any, index: number) => {
    if (ref.current) {
      //@ts-ignore
      ref.current.style.transform = `translateX(${index * e.target.clientWidth}px)`;
      //@ts-ignore
      ref.current.style.webkitTransform = `translateX(${index * e.target.clientWidth}px)`;
      setActive(index);
      onSelected && onSelected(items[index], index);
    }
  };
  return (
    <div
      {...attrs}
      className={clsx('relative flex w-full max-w-[31rem] rounded-full bg-base-200 p-2 font-medium', attrs.className)}
    >
      {items.map((item, index) => (
        <button
          type="button"
          key={`PillTab-${item}-${index}`}
          className="w-36 rounded-full px-[6px] py-[4px] text-center md:w-40 md:py-[8px]"
          onClick={e => onClick(e, index)}
        >
          {item}
        </button>
      ))}
      <span
        ref={ref}
        className={clsx(
          ' absolute left-2 w-36 transform rounded-full bg-primary px-[6px] py-[4px] text-center text-white transition-all duration-300 ease-in-out md:w-40 md:py-[8px]'
        )}
      >
        {items[active]}
      </span>
    </div>
  );
};

export default PillTab;
