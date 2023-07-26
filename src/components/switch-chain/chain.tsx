import clsx from 'clsx'
import { useMedia } from 'react-use'
import type { Chain } from 'wagmi'
import React from 'react'
import ChainAvatar from '@/components/avatar/chain-avatar'


export type ChainProps = React.HTMLAttributes<HTMLElement> & {
  chain: Chain & {
    unsupported?: boolean
  }
  iconSize?: number
  iconRadius?: number
  showName?: boolean
  showTestnet?: boolean
}

const Chain = ({ chain, showName = true, iconSize = 28, iconRadius = 14, showTestnet = true, ...attrs }: ChainProps) => {
  const isSM = useMedia('(max-width: 640px)', false)
  return (
    <div
      title={chain.name}
      {...attrs}
      className={clsx('flex items-center whitespace-nowrap space-x-2 text-left', attrs.className)}
    >
      <ChainAvatar
        chain={chain}
        size={isSM ? iconSize * 0.6 : iconSize}
        style={{
          width: isSM ? iconSize * 0.6 : iconSize,
          height: isSM ? iconSize * 0.6 : iconSize,
        }}
      />
      {showName || showTestnet ? (
        <dl>
          {showName && <dt className="text-sm font-semibold">{chain.name}</dt>}
          {showTestnet && chain.testnet && <dd className="text-xs opacity-30">Testnet</dd>}
        </dl>
      ) : null}
    </div>
  )
}

export default Chain
