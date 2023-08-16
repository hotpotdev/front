import clsx from 'clsx';
import { CertificationIcon } from '@/assets';

type CertificationTokenProps = {} & React.HTMLAttributes<HTMLElement>;


const CertificationToken = ({ ...attrs }: CertificationTokenProps) => {
  return (
    <div
      className={clsx(
        'tooltip-hover tooltip tooltip-secondary text-xs before:text-left before:text-xs before:font-normal',
        'before:bg-base-200 before:text-xs before:text-base-content before:shadow',
        attrs.className
      )}
      data-tip="Preset Certification Token"
    >

      <CertificationIcon  className="fill-success w-4 h-4" />
    </div>
  );
};

export default CertificationToken;
