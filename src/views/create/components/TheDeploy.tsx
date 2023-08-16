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
import { useTranslation } from 'next-export-i18n';

type TheDeployProps = React.HTMLAttributes<HTMLElement> & {};
const TheDeploy = ({ ...attrs }: TheDeployProps) => {
  const { t } = useTranslation();
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext<IFormData>();
  const {
    bondingCurveType,
    initPrice = 0,
    priceExpect = 0,
    supplyExpect = 0,
    mintTaxRate = 0,
    mintAmount = 0,
    ...fromData
  } = watch();
  const [showDesc, setShowDesc] = useState(false);
  const { data: chianPrice = 1 } = useChainCryptocomparePrice();
  const price = useMemo(
    () => (fromData.raisingToken.address === zeroAddress ? chianPrice : 1),
    [chianPrice, fromData.raisingToken]
  );
  const chainCertTokens = useChainCertTokens();
  const launchToken = useMemo(
    () => chainCertTokens.find(item => item.address === fromData.raisingToken.address),
    [chainCertTokens, fromData.raisingToken]
  );
  const { tvl } = useMemo(
    () => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }),
    [bondingCurveType, initPrice, priceExpect, supplyExpect]
  );
  const {
    payAmount,
    payValue,
    isLoading: isLoadingPayAmount
  } = useMintFirstAmount({
    bondingCurveType,
    supplyExpect,
    priceExpect,
    initPrice,
    mintTaxRate,
    mintAmount
  });
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">{t('review-deploy')}</h3>
      <div className="w-full space-y-5 md:space-y-10">
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" defaultChecked={true} />
          <div className="collapse-title text-sm font-bold md:text-base">{t('project-details')}</div>
          <div className="collapse-content md:space-y-8 md:px-12 text-xs md:text-sm">
            <div className="flex md:space-x-8">
              <dl className="space-y-2 w-32">
                <dt className="font-bold whitespace-nowrap">{t('project-name')}</dt>
                <dd className="text-base-content/80">{fromData.name}</dd>
              </dl>
              <dl className="space-y-2">
                <dt className="font-bold">{t('project-description')}</dt>
                <dd
                  className={clsx(
                    'text-base-content/80 w-80 relative pr-6 break-words-wrap transition-transform duration-500',
                    showDesc ? 'break-words h-auto' : 'truncate h-5'
                  )}
                >
                  {fromData.description || t(t('noset'))}
                  {fromData?.description && fromData?.description.length > 67 && (
                    <ChevronDoubleDownIcon
                      onClick={() => {
                        setShowDesc(!showDesc);
                      }}
                      className={clsx(
                        'w-5 h-5 absolute bottom-0 right-0 cursor-pointer opacity-80',
                        showDesc ? 'rotate-180' : ''
                      )}
                    />
                  )}
                </dd>
              </dl>
            </div>
            <div className="flex justify-between md:space-x-8">
              <dl className="space-y-4">
                <dt className="font-bold whitespace-nowrap">{t('project-logo')}</dt>
                <dd className="relative rounded-full overflow-hidden w-32 h-32">
                  {fromData.logoData && (
                    <Image
                      priority
                      sizes="100vw"
                      fill
                      alt="logo"
                      src={fromData.logoData}
                      className="relative object-cover"
                    />
                  )}
                </dd>
              </dl>
              <div className="flex-1 ml-6">
                <div className="flex justify-between h-20">
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap">{t('twitter')}</dt>
                    <dd className="text-base-content/80 break-words">{fromData.twitterUrl || t('noset')}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap  space-y-2">{t('discord')}</dt>
                    <dd className="text-base-content/80  break-words">{fromData.discordUrl || t('noset')}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap  space-y-2">{t('telegram')}</dt>
                    <dd className="text-base-content/80  break-words">{fromData.telegramUrl || t('noset')}</dd>
                  </dl>
                </div>
                <div className="flex justify-between h-20 space-x-4">
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap  space-y-2">{t('website')}</dt>
                    <dd className="text-base-content/80  break-words">{fromData.websiteUrl || t('noset')}</dd>
                  </dl>
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap space-y-2">{t('token')}</dt>
                    <dd className="text-base-content/80  break-words">
                      <p>{launchToken?.symbol || t('noset')}</p>
                      {launchToken?.address !== zeroAddress && (
                        <AddressView address={launchToken?.address} showShare={true} />
                      )}
                    </dd>
                  </dl>
                  <dl className="w-1/3 space-y-2 pr-4">
                    <dt className="font-bold whitespace-nowrap  space-y-2">{t('curve')}</dt>
                    <dd className="text-base-content/80  break-words">{FmtFirstToUpper(bondingCurveType)}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="space-x-2">
                <b>{t('project-owner')} </b> <AddressView address={fromData.ownerAddress} showShare={true} />
                {!fromData.ownerAddress && t('noset')}
              </p>
              <p className="space-x-2">
                <b>{t('treasury-address')} </b> <AddressView address={fromData.treasuryAddress} showShare={true} />
                {!fromData.treasuryAddress && t('noset')}
              </p>
            </div>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" defaultChecked={true} />
          <div className="collapse-title text-sm font-bold md:text-base">{t('token')}</div>
          <div className="collapse-content space-y-6 md:px-12 text-xs md:text-sm">
            <div className="flex justify-between h-28">
              <dl className="w-1/3  space-y-2">
                <dt className="font-bold whitespace-nowrap">{t('expect-token-supply')}</dt>
                <dd className="text-base-content/80">{supplyExpect}</dd>
              </dl>
              <dl className="w-1/3  space-y-2">
                <dt className="font-bold whitespace-nowrap">{t('expect-token-price')}</dt>
                <dd className="text-base-content/80">
                  <NumberView number={priceExpect * price} before="~$" />
                </dd>
              </dl>
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap">{t('curve-chart')}</dt>
                <dd className="text-base-content/80">
                  <TheChart className="h-52 w-full" />
                </dd>
              </dl>
            </div>
            <div className="flex justify-between h-28">
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap  space-y-2">{t('expect-fdv')}</dt>
                <dd className="text-base-content/80">
                  <NumberView number={tvl * price} before="~$" />
                </dd>
              </dl>
              <dl className="w-1/3 space-y-2">
                <dt className="font-bold whitespace-nowrap  space-y-2">{t('token-type')}</dt>
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
          <div className="collapse-title text-sm font-bold md:text-base">{t('setting')}</div>
          <div className="collapse-content flex justify-between md:px-12 text-xs md:text-sm">
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap">{t('mint-tax')}</dt>
              <dd className="text-base-content/80">{mintTaxRate}%</dd>
            </dl>
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap space-y-2">{t('burn-tax')}</dt>
              <dd className="text-base-content/80">{fromData.burnTaxRate}%</dd>
            </dl>
            <dl className="w-1/3 space-y-2">
              <dt className="font-bold whitespace-nowrap space-y-2">{t('mint-token-first')}</dt>
              <dd className="text-base-content/80">
                {mintAmount || '0'} {fromData.symbol} / {payValue || '0'} {fromData.raisingToken.symbol}
              </dd>
            </dl>
          </div>
        </div>
        <div className="space-y-2">
          <label className="flex space-x-4 cursor-pointer">
            <input
              {...register('isAccept', {
                required: true,
                validate: value => (value ? undefined : t('accept-agreement'))
              })}
              type="checkbox"
              id="accept"
              className="checkbox"
            />
            <span>{t('i-have-read')}</span>
          </label>
          <p className="mt-2 text-sm text-error">{errors.isAccept?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default TheDeploy;
