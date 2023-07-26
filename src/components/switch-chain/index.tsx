import clsx from 'clsx'

import Chain from './chain'
import useChain from '@/hooks/useChain'
import { useMedia } from 'react-use'
import { DownArrowIcon, CheckmarkIcon } from '@/assets'
import customToast from '@/utils/customToast'

export type SwitchChainProps = React.HTMLAttributes<HTMLElement> & {}

const SwitchChain = ({ children, ...attrs }: SwitchChainProps) => {
  const { chain, chains, pendingChain, switchChain, isLoading } = useChain()
  const changeNetwork = async (chainId?: number) => {
    if (chainId && chain.id != chainId && !isLoading) {
      await customToast.promise(
        switchChain(chainId),
        {
          loading: 'Switch Chain...',
          success: <b>Switch Chain success!</b>,
          error: (e) => {
            return <b>Switch Chain error: {e?.shortMessage}.</b>
          },
        }
      )
    }
  }
  const isSM = useMedia('(max-width: 640px)', false)
  return (
    <div {...attrs} className={clsx('dropdown', attrs.className)}>
      <label tabIndex={0} className={clsx('btn-sm h-10 btn shadow overflow-hidden transition-all duration-300 flex items-center space-x-2')}>
        {isLoading && <span className="loading loading-spinner"></span>}
        {pendingChain && (
          <Chain
            chain={pendingChain}
            showName={!isSM}
            showTestnet={!isSM}
            className={clsx(
              'overflow-hidden px-0 transition-all duration-300',
              isLoading ? 'translate-x-0 opacity-100' : 'h-0 w-0 -translate-y-10 opacity-0'
            )}
          />
        )}
        <Chain
          chain={chain}
          showName={!isSM}
          showTestnet={!isSM}
          className={clsx(
            'overflow-hidden px-0 transition-all duration-300',
            isLoading ? 'h-0 w-0 translate-y-10 opacity-0' : 'translate-x-0 opacity-100'
          )}
        />
        <DownArrowIcon className="h-4 w-4 stroke-base-content" />
      </label>
      <ul tabIndex={0} className="menu-compact dropdown-content menu rounded-box divide-y-2 bg-base-200 py-4 border shadow z-50">
        {chains.map((item) => (
          <li key={`switch-item-${item.id}`} onClick={() => changeNetwork(item.id)}>
            <div className="gap-0 h-10 flex items-center whitespace-nowrap space-x-2 text-left my-2">
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
