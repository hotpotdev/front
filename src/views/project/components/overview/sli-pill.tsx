import clsx from 'clsx';

export type SliPillProps = {
  sli: number[];
  initIndex?: number;
  selectValue?: number;
  onSelected?: (item: number, index: number) => void;
  formatter?: (item: number, index: number) => string;
} & React.HTMLAttributes<HTMLElement>;
// 滑点设置
const SliPill = ({ sli, initIndex = 0, onSelected, formatter, selectValue = undefined, ...attrs }: SliPillProps) => {
  const defFormatter = (item: number, index: number) => `${item * 1e2}%`;
  const onClick = (e: any, index: number) => {
    onSelected && onSelected(sli[index], index);
  };
  return (
    <div {...attrs} className={clsx('relative flex rounded-full bg-base-100 px-1 font-medium text-xs', attrs.className)}>
      {sli.map((item, index) => (
        <button
          type="button"
          key={`SliPill-${item}-${index}`}
          className={clsx('w-12 rounded-full p-2 text-center hover:btn-primary',selectValue === item * 1e2 ? 'btn-primary' : '')}
          onClick={e => onClick(e, index)}
        >
          {formatter ? formatter(item, index) : defFormatter(item, index)}
        </button>
      ))}
    </div>
  );
};

export default SliPill;
