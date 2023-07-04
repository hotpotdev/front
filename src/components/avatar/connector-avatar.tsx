import { CONNECTOR_META } from '@/conf'
import Image, { type StaticImageData } from 'next/image'
import { Connector } from 'wagmi'


export type ConnectorsAvatar = {
  connector: Connector
  size?: number
  radius?: number
  style?: React.HTMLAttributes<HTMLElement>['style']
}

const ConnectorsAvatar = ({ connector, size = 32, radius = 0, style, ...attrs }: ConnectorsAvatar) => {
  if (typeof CONNECTOR_META[connector.id]?.icon === 'function') {
    const Icon = CONNECTOR_META[connector.id].icon as unknown as any
    return <Icon {...attrs} width={size} height={size} style={{ borderRadius: radius, ...style }} />
  }

  return (
    <Image
      {...attrs}
      width={size}
      height={size}
      sizes={`${size} ${size}`}
      src={CONNECTOR_META[connector.id]?.icon as string | StaticImageData}
      alt={connector.name}
      style={{ borderRadius: radius, ...style }}
    />
  )
}

export default ConnectorsAvatar
