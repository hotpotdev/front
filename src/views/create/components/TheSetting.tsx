import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ConnectWallet from '@/components/connect-wallet';
import { IFormData } from '../type';
import NumberView from '@/components/format-view/number-view';
import { useMintFirstAmount } from '../hooks/useMintFirstAmount';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { StopScrollFun } from '@/utils';
import { useTranslation } from 'next-export-i18n';

type TheSettingProps = React.HTMLAttributes<HTMLElement> & {};
const TheSetting = ({ ...attrs }: TheSettingProps) => {
  const { t } = useTranslation();
  const {
    setValue,
    register,
    watch,
    resetField,
    trigger,
    formState: { errors }
  } = useFormContext<IFormData>();
  const [mintFirst, setMintFirst] = useState(false);
  const [
    bondingCurveType,
    supplyExpect = 0,
    priceExpect = 0,
    initPrice = 0,
    mintAmount = 0,
    symbol,
    raisingToken,
    treasuryAddress,
    mintTaxRate = 0,
    burnTaxRate = 0
  ] = watch([
    'bondingCurveType',
    'supplyExpect',
    'priceExpect',
    'initPrice',
    'mintAmount',
    'symbol',
    'raisingToken',
    'treasuryAddress',
    'mintTaxRate',
    'burnTaxRate'
  ]);

  const { address: account, isConnected, isDisconnected } = useAccount();
  const { payValue, isLoading: isLoadingPayAmount } = useMintFirstAmount({
    bondingCurveType,
    supplyExpect,
    priceExpect,
    initPrice,
    mintTaxRate,
    mintAmount
  });
  const ref = useRef(true);
  useEffect(() => {
    if (!treasuryAddress && account && ref.current) {
      setValue('treasuryAddress', account);
      ref.current = false;
    }
  }, [account, treasuryAddress, setValue]);

  useEffect(() => {
    if (isDisconnected) ref.current = true;
  }, [isDisconnected]);

  const taxRateReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
  const mintAmountReg = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">{t('project-setting')}</h3>
      <div className="w-full space-y-5 md:space-y-10">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="treasury-address" className="block text-sm font-bold md:text-base">
              {t('treasury-address-input')}
              <span>*</span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full">
            <input
              {...register('treasuryAddress', {
                pattern: {
                  value: /^0x[a-fA-F0-9]{40}$/i,
                  message: t('invalid-addr')
                }
              })}
              id="treasury-address"
              type="text"
              className={clsx('input input-bordered w-full', errors.treasuryAddress && 'input-error')}
              placeholder="0x..."
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              {Boolean(treasuryAddress && treasuryAddress.toString().length > 0) && (
                <button
                  type="button"
                  className="text-base-content/30 bg-base-100 rounded-r-full"
                  onClick={() => {
                    resetField('treasuryAddress');
                    trigger('treasuryAddress');
                  }}
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              )}
              {isDisconnected ? (
                <ConnectWallet className="!btn-sm !btn-outline" />
              ) : (
                treasuryAddress?.toLowerCase() != account?.toLowerCase() && (
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setValue('treasuryAddress', account);
                    }}
                  >
                    {t('set-my-address')}
                  </button>
                )
              )}
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.treasuryAddress?.message?.toString()}</p>
          <p className="mt-1 text-sm text-accent">
            {t('treasury-address-info')}
          </p>
        </div>
        {/*  */}
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="mint-tax" className="indicator block text-sm font-bold md:text-base">
              {t('mint-tax')}
              <span></span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              {...register('mintTaxRate', {
                valueAsNumber: true,
                min: { value: 0, message: `${t('minimum')} 0%` },
                max: { value: 20, message: `${t('maximum')} 20%` },
                required: {
                  value: true,
                  message: t('please-set-mint-input')
                },

                validate: value =>
                  taxRateReg.test((value || '0').toString()) ? undefined : `0.00-20.00% ${t('with-2-decimals')}`
              })}
              id="mint-tax"
              type="number"
              step={0.01}
              min={0}
              max={20}
              onWheel={StopScrollFun}
              className={clsx('input input-bordered w-full', errors.mintTaxRate && 'input-error')}
              placeholder="ps: 0.01"
            />
            {Boolean(mintTaxRate && mintTaxRate.toString().length > 0) && (
              <button
                className=" absolute top-3 right-16 text-base-content/30 bg-base-100 rounded-r-full"
                onClick={() => {
                  resetField('mintTaxRate');
                  trigger('mintTaxRate');
                }}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            )}
            <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-r-2xl border-l bg-base-100 px-3">
              %
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.mintTaxRate?.message}</p>
          <p className="mt-1 text-sm text-accent">
           {t('mint-tax-input-info')}
          </p>
        </div>
        {/*  */}
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="burn-tax" className="block text-sm font-bold md:text-base">
              {t('burn-tax')}
              <span></span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              {...register('burnTaxRate', {
                valueAsNumber: true,
                min: { value: 0, message: `${t('minimum')} 0%` },
                max: { value: 20, message: `${t('maximum')} 20%` },
                required: {
                  value: true,
                  message: 'Please set burn tax rate'
                },
                validate: value =>
                  taxRateReg.test((value || '0').toString()) ? undefined : `0.00-20.00% ${t('with-2-decimals')}`
              })}
              id="burn-tax"
              type="number"
              step={0.01}
              min={0}
              max={20}
              onWheel={StopScrollFun}
              className={clsx('input input-bordered w-full', errors.burnTaxRate && 'input-error')}
              placeholder="ps: 0.01"
            />
            {Boolean(burnTaxRate && burnTaxRate.toString().length > 0) && (
              <button
                className=" absolute top-3 right-16 text-base-content/30 bg-base-100 rounded-r-full"
                onClick={() => {
                  resetField('burnTaxRate');
                  trigger('burnTaxRate');
                }}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            )}
            <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center border-l rounded-r-2xl bg-base-100 px-3">
              %
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.burnTaxRate?.message}</p>
          <p className="mt-1 text-sm text-accent">
           {t('burn-tax-input-info')}
          </p>
        </div>
        {/*  */}
        <div className="space-y-5">
          <div className="text-xs font-bold md:text-base">{t('mint-token-first')}</div>
          <label className="flex w-full cursor-pointer items-center space-x-3">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={mintFirst}
              onChange={e => {
                resetField('mintAmount');
                setValue('mintAmount', 0);
                setMintFirst(e.target.checked);
              }}
            />
            <span className="label-text">{t('mint--first-info')}</span>
          </label>
        </div>
        {/*  */}
        {mintFirst && (
          <div className="w-full space-y-2 duration-300">
            <div className="flex justify-between">
              <label htmlFor="mint-amount" className="block text-sm font-bold md:text-base">
                {t('token-amount')}
              </label>
              <span className="text-sm text-accent" id="email-optional"></span>
            </div>
            <div className="relative w-full">
              <input
                {...register('mintAmount', {
                  valueAsNumber: true,
                  required: { value: mintFirst, message: t('please-input-min-first') },
                  validate: value =>
                    mintAmountReg.test(value?.toString() ?? '') ? undefined : t('please-input--positive-number')
                })}
                id="mint-amount"
                type="number"
                min={0}
                className={clsx('input input-bordered w-full', errors.mintAmount && 'input-error')}
                style={{ paddingRight: (symbol?.length ?? 0) + 0.5 + 'rem' }}
              />
              {Boolean(mintAmount && mintAmount.toString().length > 0) && (
                <button
                  style={{ right: (symbol?.length ?? 0) + 1.2 + 'rem' }}
                  className="absolute top-3 text-base-content/30 bg-base-100 rounded-r-full"
                  onClick={() => {
                    resetField('mintAmount');
                    trigger('mintAmount');
                  }}
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              )}
              <div className="absolute inset-y-0 bottom-[1px] right-[3px] top-[1px] flex items-center rounded-r-full justify-center border-l px-3 bg-base-100">
                {symbol}
              </div>
            </div>
            <p className="mt-1 text-sm text-error">{errors.mintAmount?.message}</p>
            <div className="mt-1 text-sm flex space-x-1">
              <span className="text-base-content/60">{t('you-need-pay')} </span>
              <NumberView number={payValue} isLoading={isLoadingPayAmount} />
              <span className="text-base-content/60">{raisingToken.symbol} </span>
              <span className="text-base-content/60">{t('to-mint')}</span>
              <span>{mintAmount}</span>
              <span className="text-base-content/60">{symbol}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheSetting;
