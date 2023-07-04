
import ConnectWallet from '@/components/connect-wallet';
import { getStaticPaths, makeStaticProps } from '@/utils/getI18nStatic';
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

const getStaticProps = makeStaticProps(['common', 'profile']);
export { getStaticPaths, getStaticProps };
export default ProfilePage;
