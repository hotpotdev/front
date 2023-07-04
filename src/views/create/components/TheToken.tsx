

import clsx from 'clsx';
import RadioCard from './radio-card';
import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AddressView from '@/components/format-view/address-view';
import { DownArrowIcon } from '@/assets';
import { useChainCertTokens, useChainCryptocomparePrice } from '@/hooks/useChainInfo';
import { zeroAddress } from 'viem';
import CertificationToken from './certification-token';
import { ComputeBondingCurve } from '@/libs/sdk/utils/curve';
import PillTab from './pill-tab';
import NumberView from '@/components/format-view/number-view';
import TheChart from './TheChart';
import { IFormData } from '../type';
import ChainAvatar from '@/components/avatar/chain-avatar';
import type { IBondingCurveType } from '@/libs/sdk/types/curve';
import { XCircleIcon } from '@heroicons/react/24/outline';


type TheTokenProps = React.HTMLAttributes<HTMLElement> & {

}
const TheToken = ({ ...attrs }: TheTokenProps) => {
  const expMinPrice = 0.001;
  const priceStep = 0.01;
  const chainCertTokens = useChainCertTokens()
  const { setValue, register, formState: { errors }, watch, resetField, trigger } = useFormContext<IFormData>();
  const [tokenType, isSbt, bondingCurveType, raisingToken, supplyExpect = 0, priceExpect = 0, initPrice = 0] = watch([
    'tokenType',
    'isSbt',
    'bondingCurveType',
    'raisingToken',
    'supplyExpect',
    'priceExpect',
    'initPrice'
  ]);
  const [isFocus, setIsFocus] = useState(false)
  const [rangeInitPrice, setRangeInitPrice] = useState(initPrice)
  const { data: chianPrice = 1 } = useChainCryptocomparePrice()
  const price = useMemo(() => raisingToken.address === zeroAddress ? chianPrice : 1, [chianPrice, raisingToken])
  const { tvl } = useMemo(() => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }), [bondingCurveType, initPrice, priceExpect, supplyExpect])
  const setStandardToken = useCallback(() => {
    setValue('tokenType', 'ERC20');
    setValue('isSbt', false);
  }, [setValue]);
  const setNFT = useCallback(() => {
    setValue('tokenType', 'ERC721');
    setValue('isSbt', false);
  }, [setValue]);

  useEffect(() => {
    if (isFocus) {
      setRangeInitPrice(initPrice || 0)
    }
  }, [initPrice, isFocus])

  const minInitPrice = useMemo(() => bondingCurveType === 'exponential' ? expMinPrice : 0, [bondingCurveType])
  const maxInitPrice = useMemo(() => priceExpect - (bondingCurveType === 'exponential' ? expMinPrice : 0), [bondingCurveType, priceExpect])

  return (
    <div {...attrs} className={clsx('space-y-4 md:space-y-8', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">Token</h3>
      <div className="w-full space-y-4 md:space-y-6">
        <h4 className="font-bold text-sm md:text-base text-base-content/80">Token Type</h4>
        <RadioCard
          checked={tokenType === 'ERC20'}
          title={'ERC-20'}
          desc={'Use ERC-20 standard token. Earn Trading tax.'}
          onClick={setStandardToken}
        />
        {/* <RadioCard
          checked={tokenType === 'ERC721' && !isSbt}
          title={'ERC-721'}
          desc={'Use ERC-20 standard token. Earn Trading tax.'}
          onClick={setNFT}
        /> */}
      </div>
      <div className="space-y-4 md:space-y-6">
        <h4 className="font-bold md:text-xl text-base-content/80">Parameter Setting</h4>
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <label htmlFor="expect-token-supply" className="block text-sm font-bold md:text-base">
              Expect Token Supply
              <span>*</span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="mt-1 relative">
            <input
              {...register('supplyExpect', {
                required: { value: true, message: 'Please set supply expect' },
                min: { value: 1000, message: 'Please set token supply between 1,000 - 99,999,999,999,999' },
                max: { value: 99999999999999, message: 'Please set token supply between 1,000 - 99,999,999,999,999' },
                valueAsNumber: true
              })}
              id="expect-token-supply"
              type="number"
              className={clsx(
                'input input-bordered w-full',
                errors.supplyExpect && 'input-error'
              )}
              placeholder="1,000-99,999,999,999,999"
            />
            {
              Boolean(supplyExpect && supplyExpect.toString().length > 0) && <button className=" absolute top-3 right-3 text-base-content/30" onClick={() => {
                setValue('supplyExpect', undefined)
                trigger('supplyExpect')
              }}>
                <XCircleIcon className="w-6 h-6" />
              </button>
            }
            <p className="mt-1 text-sm text-error">{errors.supplyExpect?.message}</p>
            <p className="mt-1 text-sm text-accent">
              Token don’t have the mathematical limitation of token supply here,so aim high.
            </p>
          </div>
        </div>
        {/*  *Expect Token Price */}
        <div className="flex w-full justify-between space-y-2 md:space-x-4 md:space-y-0">
          <div className="w-1/2">
            <div className="flex justify-between">
              <label htmlFor="expect-token-price" className="block text-sm font-bold md:text-base">
                Expect Token Price
                <span>*</span>
              </label>
              <span className="text-sm text-accent" id="email-optional"></span>
            </div>
            <div className="relative mt-1">
              <input
                {...register('priceExpect', {
                  required: { value: true, message: 'Please set price expect' },
                  min: { value: 0, message: 'Please set price expect 0 at least' },
                  max: { value: 99999999999999, message: 'Please set price expect 99999999999999 at most' },
                  valueAsNumber: true
                })}
                id="expect-token-price"
                type="number"
                className={clsx(
                  'input input-bordered w-full pr-20',
                  errors.priceExpect && 'border-error ring ring-error ring-opacity-50'
                )}
                placeholder="0-99,999,999,999,999"
              />
              <div className="absolute inset-y-0 right-0 flex py-2 pr-2 space-x-2">
                {
                  Boolean(priceExpect && priceExpect.toString().length > 0) && <button className="text-base-content/30" onClick={() => {
                    setValue('priceExpect', undefined)
                    trigger('priceExpect')
                  }}>
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                }
                <div className="inline-flex items-center justify-between space-x-1 rounded-lg border px-2 py-1 text-center text-sm font-bold">
                  <ChainAvatar size={16} />
                  <span>{raisingToken.symbol}</span>
                  {/* <CertificationToken /> */}
                </div>
              </div>
            </div>
            <p className="mt-1 text-sm text-error">{errors.priceExpect?.message}</p>
            <div className="mt-1 text-sm uppercase text-accent">
              <NumberView number={priceExpect * price} before="~$" />
            </div>
          </div>
          <div className="w-1/4">
            <div className="flex justify-between">
              <label htmlFor="launch-token" className="flex text-sm font-bold md:text-base">
                Expect Token
                <span>*</span>
              </label>
              <span className="text-sm text-accent" id="email-optional"></span>
            </div>
            <div className="dropdown pt-2">
              <label
                tabIndex={4}
                className="flex items-center justify-between rounded-md border p-2 text-sm shadow md:text-base space-x-2"
              >
                <ChainAvatar size={16} />
                <span>{raisingToken.symbol}</span>
                {/* <CertificationToken /> */}
                {
                  chainCertTokens?.length > 1 && <DownArrowIcon className="w-4 h-4" />
                }
              </label>
              <ul tabIndex={4} className="dropdown-content border bg-base-200 rounded-b-md shadow-md z-50">
                {chainCertTokens?.filter(item => item.address !== raisingToken.address)
                  .map((item, index: any) => {
                    return (
                      <li
                        key={`stable-token-${index}`}
                        onClick={() => setValue('raisingToken', item)}
                        className="flex cursor-pointer items-center space-x-2 p-2 hover:bg-base-300"
                      >
                        <span>{item.symbol.toLocaleUpperCase()}</span>
                        <CertificationToken />
                        {item.address != zeroAddress && <AddressView address={item.address} showShare={true}></AddressView>}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <p className="mt-1 text-sm text-accent"></p>
          </div>
          <div className="w-1/4 space-y-2">
            <h4 className="text-sm font-bold">MarketCap</h4>
            <div className="whitespace-pre-wrap break-words uppercase">
              <NumberView number={tvl * price} before="~$" />
            </div>
          </div>
        </div>
        {bondingCurveType !== 'squareroot' && (
          <div className="flex w-full justify-between space-y-2 md:space-x-4 md:space-y-0">
            <div className="w-full">
              <div className="flex justify-between">
                <label htmlFor="initial-token-price" className="block text-sm font-bold md:text-base">
                  Initial Token Price
                </label>
                <span className="text-sm text-accent" id="email-optional"></span>
              </div>
              <div className="relative mt-1">
                <input
                  {...register('initPrice', {
                    required: {
                      value: true,
                      message: 'Please set init price address'
                    },
                    min: { value: minInitPrice, message: '' },
                    max: { value: maxInitPrice, message: '' },
                    valueAsNumber: true,
                    onChange(e) {
                      let value = e.currentTarget?.value
                      if (Number(e.currentTarget?.value || 0) > maxInitPrice) {
                        value = maxInitPrice
                      }
                      setValue('initPrice', value || 0)
                    },
                  })}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  id="initial-token-price"
                  type="number"
                  min={minInitPrice}
                  max={maxInitPrice}
                  className={clsx(
                    'input input-bordered w-full pr-20',
                    initPrice < 0 && 'input-error'
                  )}
                  placeholder={
                    minInitPrice + '-' + maxInitPrice
                  }
                />
                <div className="absolute inset-y-0 right-0 flex py-2 pr-2">
                  {
                    Boolean(initPrice && initPrice.toString().length > 0) && <button className="text-base-content/30" onClick={() => {
                      setValue('initPrice', undefined)
                      trigger('initPrice')
                    }}>
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  }
                  <div className="flex items-center justify-between space-x-1 rounded-lg border px-2 py-1 text-center text-sm font-bold">
                    <ChainAvatar size={16} />
                    <span>{raisingToken.symbol}</span>
                    {/* <CertificationToken /> */}
                  </div>
                </div>
              </div>
              <div className="mt-1 text-sm uppercase text-accent">
                <NumberView number={initPrice * price} before="~$" />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center overflow-hidden">
              <input
                // {...register('initPrice', {
                //   required: {
                //     value: true,
                //     message: 'Please set init price address'
                //   },
                //   min: { value: bondingCurveType === 'exponential' ? expMinPrice : 0, message: '' },
                //   max: { value: priceExpect - (bondingCurveType === 'exponential' ? expMinPrice : 0), message: '' },
                //   valueAsNumber: true,
                // })}
                type="range"
                value={rangeInitPrice}
                max={maxInitPrice}
                min={minInitPrice}
                step={priceStep}
                onChange={(e) => {
                  let value = Number(e.currentTarget?.value || 0)
                  if (value > maxInitPrice) {
                    value = maxInitPrice
                  }
                  setRangeInitPrice(value)
                  setValue('initPrice', value)
                }}
                className="w-full cursor-pointer"
              />
              <p className="flex w-full justify-between text-accent">
                <span>{bondingCurveType === 'exponential' ? expMinPrice : 0}</span>
                <span>{priceExpect}</span>
              </p>
            </div>
          </div>
        )}
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-sm md:text-base">Curve Setting</h4>
          <PillTab
            items={['Linear', 'Exponential', 'Squareroot']} // squareroot
            initIndex={0}
            onSelected={(item: string, index: number) => {
              // setValue('params', undefined);
              setValue('bondingCurveType', item.toLowerCase() as IBondingCurveType)
            }}
          />
          <div className="h-96">
            {
              initPrice <= 0 && bondingCurveType === 'exponential' ?
                <p className="text-base-content/60 text-center py-6">Initial token price can not be 0</p>
                : <TheChart className="h-[25rem] w-full min-w-[10rem]" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheToken;
