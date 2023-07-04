import { CoingeckoIconUrl, GithubIconUrl } from '@/assets';
import AddressView from '@/components/format-view/address-view';
import clsx from 'clsx';
import Image from 'next/image'
import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import TheProjectsOwned from './components/TheProjectsOwned';
import TheActivityList from './components/TheActivityList';
import TheProjectsCreated from './components/TheProjectsCreated';
import NumberView from '@/components/format-view/number-view';
import UserAvatar from '@/components/avatar/user-avatar';
import useChain from '@/hooks/useChain';

type ProfileViewProps = React.HTMLAttributes<HTMLElement> & {

}

const ProfileView = ({ ...attrs }: ProfileViewProps) => {
  const { address } = useAccount()
  const { chain } = useChain()
  const [tabIndex, setTableIndex] = useState(0)
  const { data: balance } = useBalance({ address })
  return (
    <main {...attrs} className={clsx('mx-auto max-w-screen-lg lg:my-16 space-y-12', attrs.className)}>
      <div className="flex space-x-4">
        <UserAvatar address={address} className="!w-20 !h-20" />
        <div className=" flex flex-col justify-center">
          <AddressView address={address} className="" showShare={true} />
          <div className="text-xs flex space-x-2">
            <b>Balance:</b>
            <NumberView number={balance?.formatted} />
            <span> {chain.nativeCurrency.symbol}</span>
          </div>
        </div>
      </div>
      <div className="tabs">
        <button type="button"
          className={clsx("tab tab-bordered", tabIndex === 0 && 'tab-active')}
          onClick={() => {
            setTableIndex(0)
          }}>Activity</button>
        <button type="button"
          className={clsx("tab tab-bordered", tabIndex === 1 && 'tab-active')}
          onClick={() => {
            setTableIndex(1)
          }}>Projects Owned  </button>
        <button type="button"
          className={clsx("tab tab-bordered ", tabIndex === 2 && 'tab-active')}
          onClick={() => {
            setTableIndex(2)
          }}>Projects Created</button>
      </div>
      {/* table */}
      <div className="overflow-x-hidden">
        <TheActivityList className={clsx(
          'transition-transform duration-500',
          tabIndex === 0
            ? 'h-auto w-auto translate-x-0 opacity-100'
            : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
        )} />
        <TheProjectsOwned className={clsx(
          'transition-transform duration-500',
          tabIndex === 1
            ? 'h-auto w-auto translate-x-0 opacity-100'
            : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
        )} />
        <TheProjectsCreated className={clsx(
          'transition-transform duration-500',
          tabIndex === 2
            ? 'h-auto w-auto translate-x-0 opacity-100'
            : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
        )} />
      </div>
    </main>
  );
};

export default ProfileView;
