import { DownArrowIcon, SettingIcon } from '@/assets';
import ConnectWallet from '@/components/connect-wallet';
import NumberView from '@/components/format-view/number-view';
import { CERT_TOKENS, CHAIN_PRICE_SYMBOL, GRAPHQL_API } from '@/conf';
import { tokenAbi } from '@/libs/sdk/contracts/Token';
import { IToken } from '@/libs/sdk/hooks/useToken';
import { FormatToken } from '@/libs/sdk/utils/format';
import { NetToChainId, StopScrollFun } from '@/utils';
import customToast from '@/utils/customToast';
import { useDebounce } from 'ahooks';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatEther, formatUnits, parseEther, parseGwei, zeroAddress } from 'viem';
import { useAccount, useBalance, useContractRead, useFeeData, usePublicClient, useQuery } from 'wagmi';
import { waitForTransaction, writeContract } from 'wagmi/actions';
import SliPill from './sli-pill';
import { XCircleIcon } from '@heroicons/react/24/outline';
import useChain from '@/hooks/useChain';
import { InputStringNumberWithCommas, InputStringToStringNumber, ScientificToString } from '@/libs/common/utils';
import { useTranslation } from 'next-export-i18n';


type SwapProps = React.HTMLAttributes<HTMLElement> & {
  token: IToken
}
const Swap = ({ token, ...attrs }: SwapProps) => {
  const { t } = useTranslation()
  const { chain } = useChain()
  const viewToken = useMemo(() => token ? FormatToken(token) : undefined, [token])
  const tokenChainId = useMemo(() => NetToChainId(token?.net), [token?.net])
  const tokenLaunchToken = useMemo(() => tokenChainId ? CERT_TOKENS[tokenChainId].find(item => item.address === token.raisingToken) : undefined, [token.raisingToken, tokenChainId])
  const tokenEndpoint = useMemo(() => tokenChainId ? GRAPHQL_API[tokenChainId] : undefined, [tokenChainId])

  const [isMint, setIsMint] = useState(true);
  const { watch, register, setValue, resetField } = useForm<{
    amount?: number,
    slippage?: number,
  }>({
    defaultValues: {
      slippage: 0.1, // 0.1 %
    }
  })
  const [amount, slippage] = watch(['amount', 'slippage'])

  const payAmount = useDebounce(
    amount && !isNaN(amount) ? parseEther(ScientificToString(amount)) : 0n,
    { wait: 500 }
  );

  const { data: receiveAmount = 0n, isLoading } = useContractRead({
    chainId: chain.id,
    scopeKey: [{ amount, address: tokenLaunchToken?.address, tokenAddress: token.addr, chainId: chain.id }].toString(),
    address: token.addr as `0x{string}`,
    abi: tokenAbi,
    functionName: isMint ? 'estimateMint' : 'estimateBurn',
    args: [payAmount],
    enabled: Boolean(amount && amount > 0) && Boolean(isMint ? tokenLaunchToken?.address : token.addr),
    staleTime: 1 * 60 * 3000,
    select(data) {
      return isMint ? (data as bigint[])?.[0] : (data as bigint[])?.[1]
    },
  });
  const { address: account, isConnected } = useAccount()
  const { data: launchBalance } = useBalance({
    chainId: chain.id,
    address: account,
    token: tokenLaunchToken?.address === zeroAddress ? undefined : tokenLaunchToken?.address,
    watch: true,
  })
  const { data: tokenBalance } = useBalance({
    chainId: chain.id,
    address: account,
    token: token.addr as `0x${string}`,
    watch: true,
  })
  const balance = useMemo(() => isMint ? launchBalance : tokenBalance, [isMint, launchBalance, tokenBalance])

  const publicClient = usePublicClient({ chainId: chain.id })
  const { data: feeData } = useFeeData({
    chainId: chain.id,
    watch: true,
    formatUnits: 'wei',
    staleTime: 10 * 1e3,
  })

  const { data: gas, refetch, isRefetching } = useQuery(['queryMint'], {
    queryFn: () => {
      return publicClient.estimateContractGas({
        address: token.addr as `0x${string}`,
        abi: tokenAbi,
        functionName: isMint ? 'mint' : 'burn',
        args: [account, balance?.value ?? 0n, 0n],
        account: account ?? '0x',
        value: isMint ? balance?.value ?? 0n : 0n,
      })
    },
    enabled: Boolean(account !== undefined && balance !== undefined),
    staleTime: 10 * 1e3,
  })

  useEffect(() => {
    if (account && balance && feeData?.gasPrice && isMint) refetch()
  }, [feeData?.gasPrice, refetch, isMint, balance, account])

  const maxBalance = useMemo(() => {
    if (gas && balance?.value && feeData?.gasPrice && feeData?.maxFeePerGas) {
      const gasLimit = gas * (feeData.gasPrice + feeData?.maxFeePerGas) * 105n / 100n;
      return formatEther(balance.value - gasLimit);
    }
    return 0
  }, [balance?.value, feeData?.gasPrice, feeData?.maxFeePerGas, gas])

  const minReceiveAmount = useMemo(() => slippage !== undefined ? receiveAmount * (10000n - BigInt(Math.floor(slippage * 1e2))) / (10000n) : 0n, [receiveAmount, slippage])
  const minReceive = useMemo(() => formatEther(minReceiveAmount), [minReceiveAmount])

  const [isActionLoading, setIsActionLoading] = useState(false);

  const mintBurn = async () => {
    const result = await writeContract({
      chainId: chain.id,
      address: token.addr as `0x${string}`,
      abi: tokenAbi,
      functionName: isMint ? 'mint' : 'burn',
      args: [account, payAmount, minReceiveAmount],
      account,
      value: isMint ? payAmount : 0n,
    })
    await waitForTransaction({ chainId: chain.id, hash: result.hash })
  }
  const mintBurnHandler = async () => {
    setIsActionLoading(true)
    let isSuccess = true;
    const text = t('swap')
    // isMint ? 'Mint' : 'Burn'
    if (!amount || amount <= 0) {
      isSuccess = false;
      customToast.error(`${text} ${t('amount-error')}`)
    }
    if (balance?.value && payAmount > balance?.value) {
      isSuccess = false;
      customToast.error(`${t('insufficient')} ${balance?.symbol} ${t('balance-info')}`)
    }
    if (isSuccess) {
      try {
        await customToast.promise(
          mintBurn(),
          {
            loading: `${text}...`,
            success: () => {
              return <b>{text} {t('success')} !</b>
            },
            error: (e) => {
              return <b>{text} {t('error')}: {e?.shortMessage}.</b>
            }
          })
      } catch (error) {
        console.error(error)
      }
    }
    setIsActionLoading(false)
  }

  return (
    <div {...attrs} className={clsx('space-y-3 px-1', attrs.className)}>
      <div className="w-full flex items-center space-x-4">
        <label htmlFor="" className="relative block h-20 w-full">
          <input
            {...register('amount', {
              min: { value: 0, message: t('swap-input-min') },
              setValueAs: v => v ? Number(InputStringToStringNumber(v.toString().replace(/^(00)+/g, ''), 18)) : v,
              onChange(e) {
                const val = e.target.value.replaceAll(',', '').replace(/^(00)+/g, '');
                const strNum = InputStringToStringNumber(val, 18);
                const viewNum = InputStringNumberWithCommas(strNum, 18);
                e.currentTarget.value = viewNum
              }
            })}
            type="text"
            formNoValidate
            placeholder='0.0'
            min={0}
            onWheel={StopScrollFun}
            className="input input-sm h-full input-bordered text-xl w-full pr-32 truncate"
          />

          <div className="absolute bottom-1.5 left-3 flex items-center space-x-1 text-xs text-base-content/30">
            <span>{t('balances')}:</span>
            <NumberView
              number={balance?.formatted}
              isLoading={isLoading}
            />
            {
              balance && <button
                className="badge badge-ghost badge-sm badge-outline"
                disabled={isLoading || isRefetching}
                onClick={() => {
                  //@ts-ignore
                  setValue('amount', maxBalance)
                }}>
                {t('max')}
              </button>
            }
          </div>
          {/* token */}

          <div className="absolute top-6 right-2 bg-base-100 flex items-center space-x-1">
            {
              Boolean(amount && amount.toString().length > 0) && <button className="text-base-content/30 bg-base-100 rounded-r-full" onClick={() => {
                resetField('amount')
              }}>
                <XCircleIcon className="w-6 h-6" />
              </button>
            }
            <div className="dropdown ">
              <button type="button" className="btn btn-sm btn-outline">
                <span>
                  {isMint ? tokenLaunchToken?.symbol : token.symbol}
                </span>
                <DownArrowIcon className="w-4 h-4" />
              </button>
              <ul className="p-2 shadow menu menu-xs dropdown-content bg-base-100 rounded-box">
                <li><button type="button" className={clsx(isMint ? 'active' : '')} onClick={() => setIsMint(true)}>{tokenLaunchToken?.symbol}</button></li>
                <li><button type="button" className={clsx(!isMint ? 'active' : '')} onClick={() => setIsMint(false)}>{token.symbol}</button></li>
              </ul>
            </div>
          </div>

        </label>
        <div className="dropdown">
          <button type='button' className="inline-flex cursor-pointer" onClick={() => {

          }}>
            <SettingIcon className="w-5 h-5 stroke-current transform duration-300 hover:rotate-90 focus:rotate-90" />
          </button>
          <div className="px-2 py-6 shadow dropdown-content bg-base-200 rounded-box z-50">
            <div className="flex items-center justify-between space-x-2">
              <div className="text-xs">{t('slippage')}: </div>
              <SliPill sli={[0.005, 0.01, 0.03]} onSelected={item => setValue('slippage', item * 1e2)} selectValue={slippage} />
              <label>
                <input
                  {...register('slippage', {})}
                  type="number"
                  placeholder="0.01"
                  className={clsx(
                    'input text-right input-xs h-8 w-16',
                    [0.005, 0.01, 0.03].findIndex(item => item * 1e2 === slippage) != -1 && 'input-primary',
                  )}
                />
              </label>
              <div className="text-xs">%</div>
            </div>
          </div>
        </div>
      </div>
      {
        isConnected ? (
          <button
            className="btn btn-sm h-10 btn-outline w-full"
            onClick={() => mintBurnHandler()}
            disabled={isLoading || isActionLoading || !amount || amount <= 0}
          >
            {isLoading || isActionLoading && <span className="loading loading-spinner loading-xs"></span>}
            {/* {
              isMint ? 'Mint' : 'Burn'
            } */}
            {t('swap')}
          </button>
        ) :
          <ConnectWallet className="w-full" />
      }
      <div className="text-base-content/80 text-xs md:text-sm flex space-x-1">
        <span>{t('receive')}</span>
        <NumberView before='~' number={minReceive} isLoading={isLoading} />
        <span>{isMint ? token.symbol : tokenLaunchToken?.symbol}</span>
      </div>
    </div>
  );
};

export default Swap;
