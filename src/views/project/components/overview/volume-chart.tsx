import { GRAPHQL_API } from '@/conf';
import { usePriceDaysWhereToken, usePriceHoursWhereToken } from '@/libs/sdk/hooks/usePrice';
import { IToken } from '@/libs/sdk/hooks/useToken';

import { FormatPriceBy } from '@/libs/sdk/utils/format';
import { NetToChainId } from '@/utils';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Area, AreaChart, Brush, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartSkeleton from './chart-skeleton';

import { FmtAmount } from '@/libs/common/format';
import { format } from 'date-fns';


type VolumeChartProps = {
  token: IToken,
  intervalType: 'hour' | 'day'
  interval: number,
} & React.HTMLAttributes<HTMLElement>;


export type ItemType = {
  minPrice: number
  maxPrice: number
  openPrice: number
  closePrice: number
  timestamp: number
  tokenTvl: number
}

const VolumeChart = ({ token, intervalType, interval, ...attrs }: VolumeChartProps) => {

  const tokenChainId = useMemo(() => NetToChainId(token.net), [token.net])
  const tokenEndpoint = useMemo(() => tokenChainId ? GRAPHQL_API[tokenChainId] : undefined, [tokenChainId])
  const lastTimestamp = useMemo(() => Math.floor(new Date().getTime() / 1e3), []);
  const fastTimestamp = useMemo(() => {
    return interval === 0 ? 0 : lastTimestamp - interval * 24 * 60 * 60;
  }, [interval, lastTimestamp])
  const { data: dayList, isLoading: isDayLoading } = usePriceDaysWhereToken({
    endpoint: tokenEndpoint,
    address: token?.addr as `0x${string}`,
    fastTimestamp: fastTimestamp,
    enabled: intervalType === 'day',
  })
  const { data: hourList, isLoading: isHourLoading } = usePriceHoursWhereToken({
    endpoint: tokenEndpoint,
    address: token?.addr as `0x${string}`,
    fastTimestamp: fastTimestamp,
    enabled: intervalType === 'hour',
  })

  const data = useMemo(() => intervalType === 'hour' ? hourList?.map(FormatPriceBy) : dayList?.map(FormatPriceBy), [dayList, hourList, intervalType]);
  const step = useMemo(() => intervalType === 'hour' ? 1 * 60 * 60 * 1e3 : 24 * 60 * 60 * 1e3, [intervalType])

  const dataFormatted = useMemo(() => {
    let result: ItemType[] = []
    const dataTime = data?.[data?.length - 1]?.timestamp;
    const fastIntTime = intervalType === 'hour' ? (fastTimestamp - fastTimestamp % 3600) * 1e3 : new Date(fastTimestamp*1e3).setHours(0,0,0,0)
    const lastIntTime = (intervalType === 'hour' ? (lastTimestamp - lastTimestamp % 3600) : lastTimestamp) * 1e3
    const fast = dataTime && fastIntTime == 0 ? Math.max(dataTime, fastIntTime) : fastIntTime;
    const last = lastIntTime;
    let next = fast;
    let item = null;
    let items = [];
    for (let i = fast; i <= last; i += step) {
      next = i + step;
      item = data?.find(data => data.timestamp === i)
      items = data?.filter(data => data.timestamp > i && data.timestamp < next) || []
      let obj: ItemType = {
        minPrice: 0,
        maxPrice: 0,
        openPrice: 0,
        closePrice: 0,
        timestamp: i,
        tokenTvl: 0,
      }
      if (item) obj = item;
      if (items && items.length > 0) {
        obj.timestamp = Math.min(items.sort(item => item.timestamp - item.timestamp)[0].timestamp,i)
        items.forEach(item => {
          obj.minPrice += item.minPrice
          obj.maxPrice += item.maxPrice
          obj.openPrice += item.openPrice
          obj.closePrice += item.closePrice
          obj.tokenTvl += item.tokenTvl
        })
      }
      result.push(obj)
    }
    return result;
  }, [data, fastTimestamp, intervalType, lastTimestamp, step]);

  const id = `ProjectBondingCurveChart${new Date().getTime()}`
  if (isDayLoading || isHourLoading || dataFormatted.length === 0) return <ChartSkeleton />
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataFormatted}
          margin={{
            top: 10,
            right: 60,
            left: 10,
            bottom: 10
          }}
        >
          <XAxis
            allowDataOverflow
            dataKey={'timestamp'}
            padding={{ left: 3 }}
            fontSize={12}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickMargin={10}
            tickFormatter={(value) => format(new Date(value), 'MM.dd')}
          />
          <YAxis
            orientation='right'
            allowDataOverflow
            dataKey={'minPrice'}
            fontSize={12}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickFormatter={(value) => FmtAmount(value)}
          />
          <Tooltip
            content={props => {
              const payload = props.payload?.[0]
              const item: ItemType | undefined = payload?.payload;
              return (
                <div className="rounded bg-base-200 p-4 shadow text-xs">
                  <div className="space-x-1">
                    <span>Time:</span>
                    <span>
                      {format(new Date(item?.timestamp ?? 0), intervalType === 'hour' ? 'MM/dd/yyyy HH:mm:ss' : 'MM/dd/yyyy')}
                    </span>
                  </div>
                  <div className="space-x-1">
                    <span>OpenPrice:</span>
                    <span>{FmtAmount(item?.openPrice)}</span>
                  </div>
                  <div className="space-x-1">
                    <span>Low:</span>
                    <span>{FmtAmount(item?.minPrice)}</span>
                  </div>
                  <div className="space-x-1">
                    <span>High:</span>
                    <span>{FmtAmount(item?.maxPrice)}</span>
                  </div>
                </div>
              );
            }}
          />
          <defs>
            <linearGradient id={id}>
              <stop offset="0%" stopColor="rgba(39,174,96,0.8)" />
              <stop offset="50%" stopColor="rgba(39,174,96,0.5)" />
              <stop offset="100%" stopColor="rgba(39,174,96,0.1)" />
            </linearGradient>
          </defs>
          <Area orientation='right' key={`VolumeCurveChart`} type="monotone" dataKey={'minPrice'} strokeWidth={2} stroke="rgba(39,174,96,0.8)" fill={`url(#${id})`} />
          <Brush
            dataKey={'timestamp'}
            tickFormatter={(value) => format(new Date(value), 'MM/dd/yyyy')}
            height={30}
            y={220}
            stroke='rgba(39,174,96,0.5)'
            travellerWidth={10}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
