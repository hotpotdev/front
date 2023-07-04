import { GenerateGradientSVG } from '@/libs/common/svg';
import { Hash } from '@/libs/types/type';
import clsx from 'clsx';

type UserAvatarProps = React.HTMLAttributes<HTMLOrSVGElement> & {
  address?: Hash | string
}

const UserAvatar = ({ address, ...attrs }: UserAvatarProps) => {
  if(!address) return null
  return (
    <svg {...attrs}
      className={clsx('rounded-full w-7 h-7', attrs.className)}
      viewBox='0 0 50 50'
      dangerouslySetInnerHTML={{
        __html: GenerateGradientSVG(address, 50, 50, true)
      }}
      xmlns="http://www.w3.org/2000/svg">
    </svg>
  )
};

export default UserAvatar;
