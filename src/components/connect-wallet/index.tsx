

import clsx from 'clsx';
import { useAccount } from 'wagmi';

import UserMenu from '@/components/user-menu';
import { useWalletStore } from '@/store/useWalletStore';

export type ConnectWalletProps = React.HTMLAttributes<HTMLElement> & {
  label?: string
  showAvatar?: boolean
  showWallet?: boolean
  avatarSize?: number
  avatarRadius?: number
}

const ConnectWallet = ({
  label = 'Connect Wallet',
  showAvatar = true,
  showWallet = true,
  avatarSize = 32,
  avatarRadius = 16,
  ...attrs
}: ConnectWalletProps) => {

  const { isConnected, isConnecting } = useAccount()
  const setIsConnectModalOpen = useWalletStore(state => state.setIsConnectModalOpen)
  const openModal = () => {
    setIsConnectModalOpen(true)
  }
  if (isConnected) {
    return <UserMenu  {...attrs} />
  }
  return (
    <button type='button' aria-label={label} {...attrs} onClick={openModal} className={clsx('btn btn-sm md:h-10 normal-case duration-300 transition-all shadow md:px-4', attrs.className)}>
      {isConnecting && <span className="loading loading-spinner loading-xs"></span>}
      {label}
    </button>
  );
};

export default ConnectWallet;


