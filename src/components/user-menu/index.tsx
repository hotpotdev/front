import clsx from 'clsx';
import AddressView from '@/components/format-view/address-view';
import { useAccount, useDisconnect } from 'wagmi';
import { PowerIcon } from '@/assets';
import LocaleLink from '../locale-link';
import { UserIcon } from '@heroicons/react/24/outline';
import UserAvatar from '@/components/avatar/user-avatar';

type UserMenuProps = React.HTMLAttributes<HTMLElement> & {}

const UserMenu = ({ ...attrs }: UserMenuProps) => {
  const { connector, address } = useAccount()
  const { disconnect } = useDisconnect()
  return (
    <div className={clsx('dropdown dropdown-end',)}>
      <label tabIndex={1} {...attrs} aria-label={address} className={clsx('btn btn-sm md:h-10 normal-case duration-300 transition-all shadow md:px-4', attrs.className)}>
        <UserAvatar address={address} />
        <dl>
          <dt><AddressView address={address} showTip={false} showCopy={false} /></dt>
          <dd className="text-base-content/60 text-xs text-left">{connector?.name}</dd>
        </dl>
      </label>
      <ul tabIndex={1} className="dropdown-content menu menu-xs md:menu-md p-2 shadow bg-base-200 rounded-box w-52">
        <li>
          <LocaleLink href='/profile'>
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </LocaleLink>
        </li>
        <li onClick={() => disconnect()}>
          <div className="gap-0 space-x-2 flex items-center" >
            <PowerIcon className="w-4 h-4" />
            <span>Disconnect</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
