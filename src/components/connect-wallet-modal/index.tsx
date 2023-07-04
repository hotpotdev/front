import clsx from 'clsx';
import { useEffect, type PropsWithChildren } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Connector, useConnect } from 'wagmi';
import ConnectorsAvatar from '../avatar/connector-avatar';
import { useWalletStore } from '@/store/useWalletStore';


type ConnectWalletModalProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren<{

}>;

const ConnectWalletModal = ({ children, ...attrs }: ConnectWalletModalProps) => {
  const isConnectModalOpen = useWalletStore(state => state.isConnectModalOpen)
  const setIsConnectModalOpen = useWalletStore(state => state.setIsConnectModalOpen)
  const { connectAsync, connectors, error, isLoading, pendingConnector, reset, isSuccess } = useConnect()
  useEffect(() => {
    reset()
  }, [isConnectModalOpen, reset])
  useEffect(() => {
    if (isSuccess) setIsConnectModalOpen(false)
  }, [isSuccess, setIsConnectModalOpen])

  const connectHandler = async (connector: Connector<any, any> | undefined) => {
    try {
      await connectAsync({ connector })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <aside {...attrs}
      className={clsx('z-[998] transition-all duration-500', attrs.className, isConnectModalOpen ? 'fixed top-0 right-0 bottom-0 left-0 w-full h-full' : 'hidden w-0 h-0')}
    >
      <div className="absolute w-full h-full flex items-center justify-center bg-base-content/30" onClick={() => close()}>
        <div className="bg-base-200 w-full max-w-xs px-6 py-7 space-y-6 rounded-2xl" onClick={(e) => e.stopPropagation()}>
          <header className="flex justify-center items-center">
            <h3 className="font-bold w-full text-center">Connect Wallet</h3>
            <button className="btn-sm btn-circle btn hover:bg-base-300" onClick={() => setIsConnectModalOpen(false)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </header>
          <div className="space-y-4">
            {connectors.map((connector) => (
              <button
                type="button"
                key={connector.id}
                disabled={isLoading}
                onClick={() => connectHandler(connector)}
                className={clsx('btn w-full btn-neutral normal-case text-current rounded-2xl flex items-center justify-between disabled:bg-opacity-60')}
              >
                <span className="font-bold space-x-2 flex items-center">
                  {connector.ready}
                  {isLoading && connector.id === pendingConnector?.id && <span className="loading loading-spinner loading-xs"></span>}
                  <span>{connector.name}</span>
                </span>
                <span className={clsx()}>
                  <ConnectorsAvatar connector={connector} />
                </span>
              </button>
            ))}
            {error && pendingConnector && <p className="text-error text-xs text-center">{error.message.split('.')[0]}</p>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ConnectWalletModal;
