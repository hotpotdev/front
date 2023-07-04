import { CHAIN_META } from '@/conf'
import useChain from '@/hooks/useChain'
import Image, { type StaticImageData } from 'next/image'
import { useMemo } from 'react'
import type { Chain } from 'wagmi'

export type ChainAvatar = {
  chain?: Chain & {
    unsupported?: boolean
  }
  chainId?: number,
  size?: number
  radius?: number
  style?: React.HTMLAttributes<HTMLElement>['style']
}
const ChainAvatar = ({ chain, chainId, size = 32, radius = 16, style, ...attrs }: ChainAvatar) => {
  const { chain:defaultChain } = useChain()
  const index = useMemo(() => chain?.id || chainId || defaultChain.id, [chain?.id, chainId, defaultChain.id])
  if (!index || !CHAIN_META[index]) return null

  if (index && typeof CHAIN_META[index].icon === 'function') {
    const Icon = CHAIN_META[index].icon as unknown as any
    return <Icon {...attrs} width={size} height={size} style={{ borderRadius: radius, ...Icon().props?.style, ...style }} />
  }

  return (
    <Image
      {...attrs}
      width={size}
      height={size}
      sizes={`${size} ${size}`}
      src={CHAIN_META[index].icon as string | StaticImageData}
      alt={chain?.name ?? ''}
      style={{ borderRadius: radius, ...style }}
    />
  )
}

export default ChainAvatar
