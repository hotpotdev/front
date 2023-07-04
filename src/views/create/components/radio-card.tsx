import clsx from 'clsx';


type RadioCardProps = {
  checked?: boolean;
  title?: string;
  desc?: string;
} & React.HTMLAttributes<HTMLElement>;
// RadioCard
const RadioCard = ({ checked = false, title = '', desc = '', ...attrs }: RadioCardProps) => {
  return (
    <div
      {...attrs}
      className={clsx(
        'card flex min-h-8 w-full cursor-pointer flex-row items-center bg-base-200 space-x-6 px-8 py-5',
        'duration-300',
        // style['radio-card'],
        checked && 'shadow',
        attrs.className
      )}
    >
      <div className="flex-1 overflow-hidden text-left duration-300 ">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="w-full text-sm text-base-content/80">{desc}</p>
      </div>
      <div className="flex w-10 items-center justify-start">
        <input
          type="radio"
          className="h-6 w-6 border-accent text-primary focus:ring-primary"
          checked={checked}
          onChange={() => { }}
        />
      </div>
    </div>
  );
};

export default RadioCard;
