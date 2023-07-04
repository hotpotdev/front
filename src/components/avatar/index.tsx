
import type { SVGAttributes } from 'react';
import Image, { type StaticImageData } from 'next/image'

type AvatarProps = React.HTMLAttributes<HTMLElement> & {
  avatar?: React.ElementType<SVGAttributes<string>> | string | StaticImageData;
  size?: number;
  radius?: number;
  style?: React.HTMLAttributes<HTMLElement>['style']
}

const Avatar = ({ avatar, size = 32, radius = 16, style ,...attrs }: AvatarProps) => {
  if(!avatar) return null
  if (typeof avatar === 'function') {
    const Icon = avatar as unknown as any
    return <Icon {...attrs} width={size} height={size} style={{ borderRadius: radius, ...style }} />
  }
  return (
    <Image
      {...attrs}
      width={size}
      height={size}
      sizes={`${size} ${size}`}
      src={avatar as string | StaticImageData}
      alt="-"
      placeholder="empty"
      style={{ borderRadius: radius, ...style }}
    />
  )
};

export default Avatar;
