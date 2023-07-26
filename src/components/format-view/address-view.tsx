import clsx from 'clsx';



import { useCopyToClipboard } from 'react-use';
import { useEffect, useState } from 'react';
import { CopyIcon, ShareIcon, SuccessIcon } from '@/assets';
import { FmtAddress } from '@/libs/common/format';
import Link from 'next/link';
import { Hash } from '@/libs/types/type';
import useChain from '@/hooks/useChain';

type AddressViewProps = React.HTMLAttributes<HTMLElement> & {
  address?: Hash | string;
  showTip?: boolean,
  showCopy?: boolean,
  showShare?: boolean,
  shareUrl?: string;
  type?: 'address' | 'tx' | 'token';
}
// address
const AddressView = ({ address, showTip = true, showCopy = true, showShare = false, shareUrl, type = 'address', ...attrs }: AddressViewProps) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [show, setShow] = useState(false);
  const { chain } = useChain()
  const [targetUrl, setTargetUrl] = useState(shareUrl)
  useEffect(() => {
    if (state.value) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000);
      return () => {
        setShow(false);
        clearTimeout(timer);
      };
    }
  }, [state]);

  useEffect(() => {
    if (chain.blockExplorers && !shareUrl && type) {
      setTargetUrl(`${chain.blockExplorers.default.url}/${type}/${address}`)
    }
  }, [address, chain.blockExplorers, shareUrl, type])
  if (!address) return null
  return (
    <span className={clsx('inline-flex items-center space-x-1')}>
      <span
        className={clsx(
          'inline-flex items-center',
          'before:text-xs before:shadow after:z-50',
          'before:z-50 before:max-w-[14rem] before:overflow-visible before:whitespace-pre-wrap before:break-words before:bg-base-300 before:text-left before:text-[1em] before:font-normal before:text-base-content',
          attrs.className,
          showTip && 'tooltip-hover tooltip tooltip-top'
        )}
        data-tip={address}
      >
        {FmtAddress(address)}
      </span>
      {
        showCopy && show && <SuccessIcon className="cursor-pointer w-4 h-4 !stroke-success !fill-success" />
      }
      {
        showCopy && !show && <CopyIcon className="cursor-pointer fill-current w-4 h-4 mb-1 hover:scale-105 hover:text-primary" onClick={() => copyToClipboard(address)} />
      }
      {
        showShare && targetUrl && <Link href={targetUrl} target="_blank" rel="noreferrer">
          <ShareIcon className="cursor-pointer fill-current w-4 h-4 mb-1 hover:scale-105 hover:text-primary" />
        </Link>
      }
    </span>
  );
};

export default AddressView;
