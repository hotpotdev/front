import useChain from '@/hooks/useChain';
import { useWalletStore } from '@/store/useWalletStore';
import { ArrowLeftOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import customToast from '@/utils/customToast';
import Chain from '@/components/switch-chain/chain';

type SwitchChainModalProps = React.HTMLAttributes<HTMLElement> & {

};

const SwitchChainModal = ({ ...attrs }: SwitchChainModalProps) => {
  const isChainModalOpen = useWalletStore(state => state.isChainModalOpen)
  const setIsChainModalOpen = useWalletStore(state => state.setIsChainModalOpen)
  const { isConnected } = useAccount()
  const { chain: walletChain } = useNetwork()
  const { chains, switchChain, isLoading, pendingChain, error } = useChain()
  const { disconnect } = useDisconnect()
  const unsupported = useMemo(() => chains.find(item => item.id === walletChain?.id) === undefined, [walletChain?.id, chains])
  useEffect(() => {
    if (isConnected) setIsChainModalOpen(unsupported) // 让用户切换网络
    else setIsChainModalOpen(false)
  }, [isConnected, setIsChainModalOpen, unsupported])
  const close = () => {
    if (!unsupported) {
      setIsChainModalOpen(false)
    } else {
      customToast.error('Please change the network to get application support.')
    }
  }
  const switchChainHandler = async (chainId: number) => {
    try {
      await switchChain(chainId)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <aside {...attrs}
      className={clsx('z-[999] transition-all duration-500', attrs.className, isChainModalOpen ? 'fixed top-0 right-0 bottom-0 left-0 w-full h-full' : 'hidden w-0 h-0')}
    >
      <div className="absolute w-full h-full flex items-center justify-center bg-base-content/30" onClick={() => close()}>
        <div className="bg-base-200 w-full max-w-xs p-6 space-y-6 rounded-2xl" onClick={(e) => e.stopPropagation()}>
          <header className="flex justify-center items-center space-x-2">
            <h3 className="font-bold w-full text-center">Switch Network</h3>
            <button className="btn-sm btn-circle btn hover:bg-base-300" onClick={() => close()}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </header>
          <main className="space-y-4">
            {chains.map((item) => (
              <button
                type="button"
                key={item.id}
                disabled={isLoading}
                onClick={() => switchChainHandler(item.id)}
                className={clsx('btn btn-xs md:btn-md w-full btn-neutral normal-case text-current rounded-2xl flex items-center justify-between disabled:bg-opacity-60')}
              >
                <Chain chain={item} />
                {isLoading && item.id === pendingChain?.id && <span className="loading loading-spinner loading-xs"></span>}
                {item.id === walletChain?.id && <span className="badge badge-success">connected</span>}
              </button>
            ))}
            {error && pendingChain?.id && <p className="text-error text-xs text-center">{error.message.split('.')[0]}</p>}
          </main>
          <footer>
            <div className="divider">or</div>
            <button
              className="btn btn-xs md:btn-md w-full btn-neutral normal-case text-current rounded-2xl disabled:bg-opacity-60"
              disabled={isLoading}
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              {isLoading && <span className="loading loading-spinner loading-xs"></span>}
              <span>Disconnect</span>
            </button>
          </footer>
        </div>
      </div>
    </aside>
  );
};

export default SwitchChainModal;
