import clsx from 'clsx';


type TheGovernanceProps = React.HTMLAttributes<HTMLElement> & {

}
const TheGovernance = ({ ...attrs }: TheGovernanceProps) => {
  return (
    <div {...attrs} className={clsx('flex justify-center py-12', attrs.className)}>
      <p>coming soon!</p>
    </div>
  );
};

export default TheGovernance;
