import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Transactions from './transactions';
import Swap from './swap';
import { DownArrowIcon } from '@/assets';
import { useMemo, useState } from 'react';
import VolumeChart from './volume-chart';
import CurveChart from './curve-chart';
import SettingModal from './setting-modal';
import { IToken } from '@/libs/sdk/hooks/useToken';
import { CERT_TOKENS, CHAIN_PRICE_SYMBOL, GRAPHQL_API, SUPPORT_CHAIN } from '@/conf';
import { NetToChainId } from '@/utils';
import { format } from 'date-fns';
import { useFetchMetadata } from '@/hooks/useMetadata';
import { GenerateGradientSVG, SVG2Base64 } from '@/libs/common/svg';
import { FormatToken } from '@/libs/sdk/utils/format';
import { useCoingeckoPrice } from '@/hooks/useCoingecko';
import NumberView from '@/components/format-view/number-view';
import { useBalance } from 'wagmi';
import { zeroAddress } from 'viem';
import { useAllCounterWhere } from '@/hooks/useChainInfo';
import { ICounter } from '@/libs/sdk/hooks/useCounter';
import { MintBurnEntity_OrderBy, OrderDirection } from '@/libs/sdk/types/graphql';


type TheOverviewProps = React.HTMLAttributes<HTMLElement> & {
  token: IToken
}

export enum ChartType {
  Volume,
  Curve,
}
const TheOverview = ({ token, ...attrs }: TheOverviewProps) => {


  const [chartType, setChartType] = useState(ChartType.Volume)
  const types = useMemo(() => new Array(SUPPORT_CHAIN.length).fill('TradeVolume', 0, SUPPORT_CHAIN.length), [])
  const { data: counterList, isLoading: isCounterLoading } = useAllCounterWhere({ types })
  const counters = useMemo(() => {
    let list: ICounter[] = []
    counterList?.forEach(item => {
      list = [...list, ...item]
    })
    return list;
  }, [counterList])


  const viewToken = useMemo(() => FormatToken(token), [token])
  const tradeVolumeAmount = Number(counters.find(item => item.type.toLowerCase() === `${token.addr}|TradeVolume`.toLowerCase())?.count ?? 0n)
  const tokenCreateTime = useMemo(() => format(new Date(viewToken.createTimestamp), 'MM/dd/yyyy HH:mm:ss'), [viewToken.createTimestamp])
  const tokenChainId = useMemo(() => NetToChainId(token.net), [token.net])
  const tokenLaunchToken = useMemo(() => tokenChainId ? CERT_TOKENS[tokenChainId].find(item => item.address === viewToken.raisingToken) : undefined, [tokenChainId, viewToken.raisingToken])
  const { data: metadata, isLoading: isMetadataLoading } = useFetchMetadata(viewToken?.metaUri as `ipfs://${string}`) // TODO metadata url
  const tokenLogo = useMemo(() => metadata?.image || (token?.addr ? SVG2Base64(GenerateGradientSVG(token?.addr)) : undefined), [metadata?.image, token?.addr])
  const tokenEndpoint = useMemo(() => tokenChainId ? GRAPHQL_API[tokenChainId] : undefined, [tokenChainId])

  const tokenLaunchPriceSymbol = useMemo(() => tokenChainId ? CHAIN_PRICE_SYMBOL[tokenChainId] : undefined, [tokenChainId])

  const { data: price = 1 } = useCoingeckoPrice({
    from: tokenLaunchPriceSymbol?.coingecko
  })

  const { data: treasuryBalance } = useBalance({
    address: viewToken.treasury as `0x${string}`,
    token: viewToken.raisingToken === zeroAddress ? undefined : tokenLaunchToken?.address,
  })

  const [intervalType, setIntervalType] = useState<'hour' | 'day'>('day')
  const [interval, setInterval] = useState(7)

  return (
    <div {...attrs} className={clsx('space-y-6', attrs.className)}>
      <div className="flex justify-between mt-4 space-x-8">
        <div className="w-full max-w-sm space-y-8 mt-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="space-x-1 flex items-center">
                <span>Total Volume</span>
                <span className="tooltip cursor-pointer" data-tip="">
                  <QuestionMarkCircleIcon className="w-5 h-5" />
                </span>
              </div>
              <div className="flex items-end space-x-1">
                <NumberView number={tradeVolumeAmount * price} before='~$' />
                {/* <span className="text-xs text-base-content/60">{tokenLaunchToken?.symbol}</span> */}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-x-1 flex items-center">
                <span>Total Valued Locked</span>
                <span className="tooltip cursor-pointer" data-tip="">
                  <QuestionMarkCircleIcon className="w-5 h-5" />
                </span>
              </div>
              <div className="flex items-end space-x-1">
                <NumberView number={viewToken.lockValue * price} before='~$' />
                {/* <span className="text-xs text-base-content/60">{tokenLaunchToken?.symbol}</span> */}
              </div>
            </div>
            <div className="flex justify-between">
              <span>Treasury Balance</span>
              <div className="flex items-end space-x-1">
                <NumberView number={Number(treasuryBalance?.formatted || 0) * price} before='~$' />
                {/* <span className="text-xs text-base-content/60">{tokenLaunchToken?.symbol}</span> */}
              </div>
            </div>
            <div className="flex justify-between">
              <span>Circulating Supply</span>
              <div className="flex items-end space-x-1">
                <NumberView number={viewToken.supply * viewToken.currentPrice * price} before='~$' />
                {/* <span className="text-xs text-base-content/60">{token?.symbol}</span> */}
              </div>
            </div>
            <div className="flex justify-between">
              <span>Current Price</span>
              <div className="flex items-end space-x-1">
                <NumberView number={viewToken.currentPrice * price} before='~$' />
              </div>
              {/* <div className="flex items-end space-x-1">
                <span>1</span><span className="text-xs text-base-content/60">{token?.symbol}</span><span>=</span><NumberView number={viewToken.currentPrice} /><span className="text-xs text-base-content/60">{tokenLaunchToken?.symbol}</span>
              </div> */}
            </div>
          </div>
          {/* swap */}
          <Swap token={token} />
        </div>
        {/* chart  */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="space-x-2 tabs tabs-boxed items-center p-2">
              <button type="button"
                className={clsx('tab tab-sm', chartType === ChartType.Volume && 'bg-neutral')}
                onClick={() => {
                  setChartType(ChartType.Volume)
                }}>
                Volume
              </button>
              <span>|</span>
              <button type="button"
                className={clsx('tab tab-sm', chartType === ChartType.Curve && 'bg-neutral')}
                onClick={() => {
                  setChartType(ChartType.Curve)
                }}>
                Curve
              </button>
            </div>
            <div className={clsx('dropdown transition-transform duration-500 mr-10',
              chartType === ChartType.Volume
                ? ''
                : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
            )}>
              <button type="button" className="btn btn-xs btn-outline">
                <span>
                  {interval > 0 ? `${interval} Day` : 'All'}
                </span>
                <DownArrowIcon className="w-4 h-4" />
              </button>
              <ul className="p-2 shadow menu menu-xs dropdown-content bg-base-200 rounded-box z-50">
                <li><button type="button" className={clsx(interval === 1 ? 'active' : '')}
                  onClick={() => {
                    setInterval(1)
                    setIntervalType('hour')
                  }}>1 Day</button></li>
                <li><button type="button" className={clsx(interval === 7 ? 'active' : '')}
                  onClick={() => {
                    setInterval(7)
                    setIntervalType('hour')
                  }}>7 Day</button></li>
                <li><button type="button" className={clsx(interval === 30 ? 'active' : '')}
                  onClick={() => {
                    setInterval(30)
                    setIntervalType('day')
                  }}>30 Day</button></li>
                <li><button type="button" className={clsx(interval === 0 ? 'active' : '')}
                  onClick={() => {
                    setInterval(0)
                    setIntervalType('day')
                  }}>All</button></li>
              </ul>
            </div>
          </div>
          <div className="w-full py-4 overflow-x-hidden h-72">
            <VolumeChart className={clsx(
              'transition-transform duration-500',
              chartType === ChartType.Volume
                ? 'h-full w-full translate-x-0 opacity-100'
                : 'h-0 w-0 -translate-x-full overflow-hidden opacity-0'
            )}
              interval={interval}
              intervalType={intervalType}
              token={token}
            />

            <CurveChart className={clsx(
              'transition-transform duration-500',
              chartType === ChartType.Curve
                ? 'h-full w-full translate-x-0 opacity-100'
                : 'h-0 w-0 -translate-x-full overflow-hidden opacity-0'
            )}
              bondingCurveType={token.bondingCurveType}
              params={viewToken.params}
              supplyExpect={viewToken.supply}
            />
          </div>
        </div>
      </div>
      {/* table */}
      <Transactions token={token} />
    </div>
  );
};

export default TheOverview;
