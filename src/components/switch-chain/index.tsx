import clsx from 'clsx'

import Chain from './chain'
import useChain from '@/hooks/useChain'
import { useMedia } from 'react-use'
import { DownArrowIcon, CheckmarkIcon } from '@/assets'

export type SwitchChainProps = React.HTMLAttributes<HTMLElement> & {}

const SwitchChain = ({ children, ...attrs }: SwitchChainProps) => {
  const { chain, chains, pendingChain, switchChain, isLoading } = useChain()
  const changeNetwork = (chainId?: number) => {
    if (chainId && chain.id != chainId && !isLoading) {
      switchChain(chainId)
    }
  }
  const isSM = useMedia('(max-width: 640px)', false)
  return (
    <div {...attrs} className={clsx('dropdown dropdown-end w-full max-w-[242px]', attrs.className)}>
      <label tabIndex={0} className={clsx('btn-sm btn normal-case space-x-1 shadow md:h-10 md:space-x-2 justify-between flex-nowrap w-full')}>
        <div className="flex justify-start overflow-hidden space-x-2 flex-nowrap w-full">
          {isLoading && <span className="loading loading-spinner"></span>}
          {
            pendingChain && (
              <Chain
                chain={pendingChain}
                showName={!isSM}
                showTestnet={!isSM}
                className={clsx(
                  'overflow-hidden transition-all duration-300',
                  isLoading ? 'translate-y-0 opacity-100' : 'h-0 w-0 -translate-y-10 opacity-0'
                )}
              />
            )
          }
          <Chain
            chain={chain}
            showName={!isSM}
            showTestnet={!isSM}
            className={clsx(
              'overflow-hidden transition-all duration-300',
              isLoading ? 'h-0 w-0 translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
            )}
          />
        </div>
        <DownArrowIcon className="h-4 w-4 stroke-current" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box divide-y-2 bg-base-200  py-4 w-full">
        {chains.map((item) => (
          <li key={`switch-item-${item.id}`} onClick={() => changeNetwork(item.id)} className="w-full">
            <div className="gap-0 space-x-2 rounded-none text-left h-8 md:h-12 justify-between w-full">
              {isLoading && <span className="loading loading-spinner"></span>}
              <Chain chain={item} />
              {item.id === chain.id && <CheckmarkIcon className="h-4 w-4" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SwitchChain
