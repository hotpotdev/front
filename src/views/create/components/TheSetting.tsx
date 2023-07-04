import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ConnectWallet from '@/components/connect-wallet';
import { IFormData } from '../type';
import NumberView from '@/components/format-view/number-view';
import { useMintFirstAmount } from '../hooks/useMintFirstAmount';
import { XCircleIcon } from '@heroicons/react/24/outline';

type TheSettingProps = React.HTMLAttributes<HTMLElement> & {

}
const TheSetting = ({ ...attrs }: TheSettingProps) => {
  const {
    setValue,
    register,
    watch,
    resetField,
    trigger,
    formState: { errors }
  } = useFormContext<IFormData>();
  const [mintFirst, setMintFirst] = useState(false);
  const [bondingCurveType, supplyExpect = 0, priceExpect = 0, initPrice = 0, mintAmount = 0, symbol, raisingToken, treasuryAddress, mintTaxRate = 0, burnTaxRate = 0] = watch([
    'bondingCurveType',
    'supplyExpect',
    'priceExpect',
    'initPrice',
    'mintAmount',
    'symbol',
    'raisingToken',
    'treasuryAddress',
    'mintTaxRate',
    'burnTaxRate',
  ]);

  const { address: account, isConnected, isDisconnected } = useAccount()
  const { payAmount, payValue, isLoading: isLoadingPayAmount } = useMintFirstAmount({
    bondingCurveType,
    supplyExpect,
    priceExpect,
    initPrice,
    mintTaxRate,
    mintAmount
  })
  const ref = useRef(true)
  useEffect(() => {
    if (!treasuryAddress && account && ref.current) {
      setValue('treasuryAddress', account)
      ref.current = false
    }
  }, [account, treasuryAddress, setValue])

  useEffect(() => {
    if (isConnected) ref.current = true;
  }, [isConnected])

  const taxRateReg = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);
  const mintAmountReg = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">Project Setting</h3>
      <div className="w-full space-y-5 md:space-y-10">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="treasury-address" className="block text-sm font-bold md:text-base">
              Treasury Address
              <span>*</span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full">

            <input
              {...register('treasuryAddress', {
                pattern: {
                  value: /^0x[a-fA-F0-9]{40}$/i,
                  message: 'invalid address'
                }
              })}
              id="treasury-address"
              type="text"
              className={clsx(
                'input input-bordered w-full',
                errors.treasuryAddress && 'input-error'
              )}
              placeholder="0x..."
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              {
                Boolean(treasuryAddress && treasuryAddress.toString().length > 0) && <button className="text-base-content/30" onClick={() => {
                  resetField('treasuryAddress')
                  trigger('treasuryAddress')
                }}>
                  <XCircleIcon className="w-6 h-6" />
                </button>
              }
              {isDisconnected ?
                <ConnectWallet className="!btn-sm !btn-outline" /> :
                treasuryAddress?.toLowerCase() != account?.toLowerCase() && <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    setValue('treasuryAddress', account)
                  }}
                >Set My Address
                </button>
              }
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.treasuryAddress?.message?.toString()}</p>
          <p className="mt-1 text-sm text-accent">
            This address will receive the tax from swapping token through bonding curve,it can be replace by manager
            or governor.
          </p>
        </div>
        {/*  */}
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="mint-tax" className="indicator block text-sm font-bold md:text-base">
              Mint Tax
              <span></span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              {...register('mintTaxRate', {
                valueAsNumber: true,
                min: { value: 0, message: 'minimum 0%' },
                max: { value: 20, message: 'maximum 20%' },
                required: {
                  value: true,
                  message: 'Please set mint tax rate'
                },

                validate: value => (taxRateReg.test((value || '0').toString()) ? undefined : '0.00-20.00% with 2 decimals')
              })}
              id="mint-tax"
              type="number"
              step={0.01}
              min={0}
              max={20}
              defaultValue={0}
              className={clsx(
                'input input-bordered w-full',
                errors.mintTaxRate && 'input-error'
              )}
              placeholder="ps: 0.01"
            />
            {
              Boolean(mintTaxRate && mintTaxRate.toString().length > 0) && <button className=" absolute top-3 right-16 text-base-content/30" onClick={() => {
                resetField('mintTaxRate')
                trigger('mintTaxRate')
              }}>
                <XCircleIcon className="w-6 h-6" />
              </button>
            }
            <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-r-2xl border-l bg-base-100 px-3">
              %
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.mintTaxRate?.message}</p>
          <p className="mt-1 text-sm text-accent">
            Part of Anchor  token (like ETH,BNB)will be send to project treasury.
          </p>
        </div>
        {/*  */}
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <label htmlFor="burn-tax" className="block text-sm font-bold md:text-base">
              Burn Tax
              <span></span>
            </label>
            <span className="text-sm text-accent" id="email-optional"></span>
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              {...register('burnTaxRate', {
                valueAsNumber: true,
                min: { value: 0, message: 'min' },
                max: { value: 20, message: 'max' },
                required: {
                  value: true,
                  message: 'Please set burn tax rate'
                },
                validate: value => (taxRateReg.test((value || '0').toString()) ? undefined : '0.00-20.00% with 2 decimals')
              })}
              id="burn-tax"
              type="number"
              step={0.01}
              min={0}
              max={20}
              defaultValue={0}
              className={clsx(
                'input input-bordered w-full',
                errors.burnTaxRate && 'input-error'
              )}
              placeholder="ps: 0.01"
            />
            {
              Boolean(burnTaxRate && burnTaxRate.toString().length > 0) && <button className=" absolute top-3 right-16 text-base-content/30" onClick={() => {
                resetField('burnTaxRate')
                trigger('burnTaxRate')
              }}>
                <XCircleIcon className="w-6 h-6" />
              </button>
            }
            <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center border-l rounded-r-2xl bg-base-100 px-3">
              %
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.burnTaxRate?.message}</p>
          <p className="mt-1 text-sm text-accent">
            Part of Anchor token (like ETH,BNB)will be send to project treasury.
          </p>
        </div>
        {/*  */}
        <div className="space-y-5">
          <div className="text-xs font-bold md:text-base">Mint token first</div>
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
            <span className="label-text">Add a mint token transaction after your token creation.</span>
          </label>
        </div>
        {/*  */}
        {mintFirst && (
          <div className="w-full space-y-2 duration-300">
            <div className="flex justify-between">
              <label htmlFor="mint-amount" className="block text-sm font-bold md:text-base">
                Token Amount
              </label>
              <span className="text-sm text-accent" id="email-optional"></span>
            </div>
            <div className="relative w-full">
              <input
                {...register('mintAmount', {
                  valueAsNumber: true,
                  required: { value: mintFirst, message: 'Please input mint amount when you want to mint first' },
                  validate: value =>
                    mintAmountReg.test(value?.toString() ?? '') ? undefined : 'Please input a positive number',
                })}
                id="mint-amount"
                type="number"
                min={0}
                className={clsx(
                  'input input-bordered w-full',
                  errors.mintAmount && 'input-error'
                )}
                style={{ paddingRight: (symbol?.length ?? 0) + 0.5 + 'rem' }}
              />
              {
                Boolean(mintAmount && mintAmount.toString().length > 0) && <button
                  style={{ right: (symbol?.length ?? 0) + 0.5 + 'rem' }}
                  className="absolute top-3 text-base-content/30"
                  onClick={() => {
                    resetField('mintAmount')
                    trigger('mintAmount')
                  }}>
                  <XCircleIcon className="w-6 h-6" />
                </button>
              }
              <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center border-l px-3 bg-base-100">
                {symbol}
              </div>
            </div>
            <p className="mt-1 text-sm text-error">{errors.mintAmount?.message}</p>
            <div className="mt-1 text-sm flex space-x-1">
              <span className="text-base-content/60">You need pay </span>
              <NumberView number={payValue} isLoading={isLoadingPayAmount} />
              <span className="text-base-content/60">{raisingToken.symbol} </span>
              <span className="text-base-content/60">to mint</span>
              <span >{mintAmount}</span>
              <span className="text-base-content/60">{symbol}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheSetting;

