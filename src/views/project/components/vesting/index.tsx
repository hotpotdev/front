import clsx from 'clsx';


type TheVestingProps = React.HTMLAttributes<HTMLElement> & {

}
const TheVesting = ({ ...attrs }: TheVestingProps) => {
  return (
    <div {...attrs} className={clsx('flex justify-center py-12', attrs.className)}>
      <p>coming soon!</p>
    </div>
  );
};

export default TheVesting;
