
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import AddressView from '@/components/format-view/address-view';
import { useChainCertTokens, useChainCryptocomparePrice } from '@/hooks/useChainInfo';
import { formatEther, zeroAddress } from 'viem';
import NumberView from '@/components/format-view/number-view';
import TheChart from './TheChart';
import { IFormData } from '../type';
import { FmtFirstToUpper } from '@/libs/common/format';
import { useMintFirstAmount } from '../hooks/useMintFirstAmount';
import { ComputeBondingCurve } from '@/libs/sdk/utils/curve';

type TheDeployProps = React.HTMLAttributes<HTMLElement> & {

}
const TheDeploy = ({ ...attrs }: TheDeployProps) => {
  const { watch, register, formState: { errors } } = useFormContext<IFormData>()
  const { bondingCurveType, initPrice = 0, priceExpect = 0, supplyExpect = 0, mintTaxRate = 0, mintAmount = 0, ...fromData } = watch()
  const [showDesc, setShowDesc] = useState(false)
  const { data: chianPrice = 1 } = useChainCryptocomparePrice()
  const price = useMemo(() => fromData.raisingToken.address === zeroAddress ? chianPrice : 1, [chianPrice, fromData.raisingToken])
  const chainCertTokens = useChainCertTokens()
  const launchToken = useMemo(() => chainCertTokens.find(item => item.address === fromData.raisingToken.address), [chainCertTokens, fromData.raisingToken])
  const { tvl } = useMemo(() => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }), [bondingCurveType, initPrice, priceExpect, supplyExpect])
  const { payAmount, payValue, isLoading: isLoadingPayAmount } = useMintFirstAmount({
    bondingCurveType,
    supplyExpect,
    priceExpect,
    initPrice,
    mintTaxRate,
    mintAmount
  })
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">Review & Deploy</h3>
      <div className="w-full space-y-5 md:space-y-10">
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" defaultChecked={true} />
          <div className="collapse-title text-sm font-bold md:text-base">
            Project Details
          </div>
          <div className="collapse-content md:space-y-8 md:px-12 text-xs md:text-sm">
            <div className="flex md:space-x-8">
              <dl className="space-y-2 w-32">
                <dt className="font-bold whitespace-nowrap">Project Name</dt>
                <dd className="text-base-content/80">{fromData.name}</dd>
              </dl>
              <dl className="space-y-2">
                <dt className="font-bold">Project Description</dt>
                <dd className={clsx('text-base-content/80 w-80 relative pr-6 whitespace-pre-wrap transition-transform duration-500', showDesc ? 'break-words h-auto' : 'truncate h-5')}>
                  {fromData.description || 'NoSet'}
                  {fromData?.description && fromData?.description.length > 67 && <ChevronDoubleDownIcon onClick={() => {
                    setShowDesc(!showDesc)
                  }} className={clsx('w-5 h-5 absolute bottom-0 right-0 cursor-pointer opacity-80', showDesc ? 'rotate-180' : '')} />}
                </dd>
              </dl>
            </div>
            <div className="flex justify-between md:space-x-8">
              <dl className="space-y-4">
                <dt className="font-bold whitespace-nowrap">Project Logo</dt>
                <dd className="relative rounded-full overflow-hidden w-32 h-32">
                  {fromData.logoData && <Image priority sizes="100vw" fill alt="logo" src={fromData.logoData} className="relative object-cover" />}
                </dd>
              </dl>
              <div className="flex-1 ml-6">
                <div className="flex justify-between h-20">
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap">Twitter</dt>
                    <dd className="text-base-content/80">{fromData.twitterUrl || 'NoSet'}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap  space-y-2">Discord</dt>
                    <dd className="text-base-content/80">{fromData.discordUrl || 'NoSet'}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap  space-y-2">Telegram</dt>
                    <dd className="text-base-content/80">{fromData.telegramUrl || 'NoSet'}</dd>
                  </dl>
                </div>
                <div className="flex justify-between h-20">
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap  space-y-2">Website</dt>
                    <dd className="text-base-content/80">{fromData.websiteUrl || 'NoSet'}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap space-y-2">Token</dt>
                    <dd className="text-base-content/80">
                      <p>{launchToken?.symbol || 'NoSet'}</p>
                      {launchToken?.address !== zeroAddress && <AddressView address={launchToken?.address} showShare={true} />}
                    </dd>
                  </dl>
                  <dl className="w-1/3 space-y-2">
                    <dt className="font-bold whitespace-nowrap  space-y-2">Curve</dt>
                    <dd className="text-base-content/80">{FmtFirstToUpper(bondingCurveType)}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="space-x-2"><b>Project Owner: </b> <AddressView address={fromData.ownerAddress} showShare={true} />{!fromData.ownerAddress && 'NoSet'}</p>
              <p className="space-x-2"><b>Treasury Address: </b> <AddressView address={fromData.treasuryAddress} showShare={true} />{!fromData.treasuryAddress && 'NoSet'}</p>
            </div>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" defaultChecked={true} />
          <div className="collapse-title text-sm font-bold md:text-base">
            Token
          </div>
          <div className="collapse-content space-y-6 md:px-12 text-xs md:text-sm">
            <div className="flex justify-between h-28">
              <dl className="w-1/3  space-y-2">
                <dt className="font-bold whitespace-nowrap">Expect token supply</dt>
                <dd className="text-base-content/80">{supplyExpect}</dd>
              </dl>
              <dl className="w-1/3  space-y-2">
                <dt className="font-bold whitespace-nowrap">Expect token Price</dt>
                <dd className="text-base-content/80">
                  <NumberView number={priceExpect * price} before="~$" />
                </dd>
              </dl>
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap">Curve Chart</dt>
                <dd className="text-base-content/80">
                  <TheChart className="h-52 w-full" />
                </dd>
              </dl>
            </div>
            <div className="flex justify-between h-28">
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap  space-y-2">Expect MarketCap</dt>
                <dd className="text-base-content/80">
                  <NumberView number={tvl * price} before="~$" />
                </dd>
              </dl>
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap  space-y-2">Token Type</dt>
                <dd className="text-base-content/80">{fromData.tokenType}</dd>
              </dl>
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap space-y-2"></dt>
                <dd className="text-base-content/80"></dd>
              </dl>
            </div>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" defaultChecked={true} />
          <div className="collapse-title text-sm font-bold md:text-base">
            Setting
          </div>
          <div className="collapse-content flex justify-between md:px-12 text-xs md:text-sm">
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap">Mint Tax</dt>
              <dd className="text-base-content/80">{mintTaxRate}%</dd>
            </dl>
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap space-y-2">Burn Tax</dt>
              <dd className="text-base-content/80">{fromData.burnTaxRate}%</dd>
            </dl>
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap space-y-2">Mint token first</dt>
              <dd className="text-base-content/80"> {mintAmount || '0'} {fromData.symbol} / {payValue || '0'} {fromData.raisingToken.symbol}</dd>
            </dl>
          </div>
        </div>
        <div className="space-y-2">
          <label className="flex space-x-4 cursor-pointer">
            <input {...register('isAccept', {
              required: true,
              validate: value => value ? undefined : 'Accept Agreement!',
            })} type="checkbox" id="accept" className="checkbox" />
            <span>I have read and accept the Terms of Service and the risks</span>
          </label>
          <p className="mt-2 text-sm text-error">{errors.isAccept?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default TheDeploy;
