import clsx from 'clsx'
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

const Chain = ({ chain, showName = true, iconSize = 32, iconRadius = 16, showTestnet = true, ...attrs }: ChainProps) => {
  return (
    <div
      title={chain.name}
      {...attrs}
      className={clsx('flex items-center justify-start space-x-2 text-left', attrs.className)}
    >
      <ChainAvatar chain={chain} size={iconSize} />
      {showName || showTestnet ? (
        <dl className="space-y-1">
          {showName && <dt>{chain.name}</dt>}
          {showTestnet && chain.testnet && <dd className="text-xs opacity-30">Testnet</dd>}
        </dl>
      ) : null}
    </div>
  )
}

export default Chain
