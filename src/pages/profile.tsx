
import ConnectWallet from '@/components/connect-wallet';

import ProfileView from '@/views/profile';
import type { NextPage } from 'next/types';
import { useAccount } from 'wagmi';

const ProfilePage: NextPage = () => {
  const { isDisconnected } = useAccount()
  if (isDisconnected) return <div className="mx-auto container flex justify-center"> <ConnectWallet /> </div>
  return (
    <>
      <ProfileView />
    </>
  );
};
export default ProfilePage;
