import NumberView from '@/components/format-view/number-view';
import { FmtAmount } from '@/libs/common/format';
import clsx from 'clsx';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area, Brush } from 'recharts';


import type { Margin } from 'recharts/types/util/types';

import { useBondingCurveChart } from '@/libs/sdk/hooks/useBondingCurve';
import { IBondingCurveType, IExponentialParam, ILinearParam, ISquarerParam } from '@/libs/sdk/types/curve';
import ChartSkeleton from './chart-skeleton';
import { useTranslation } from 'next-export-i18n';



type CurveChartProps = React.HTMLAttributes<HTMLElement> & {
  margin?: Margin;
  bondingCurveType: IBondingCurveType;
  params: ILinearParam | ISquarerParam | IExponentialParam;
  supplyExpect: number,
}

const CurveChart = ({ margin = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 10
}, bondingCurveType, params, supplyExpect, ...attrs }: CurveChartProps) => {
  const { t } = useTranslation()
  const { chartData } = useBondingCurveChart({
    type: bondingCurveType,
    params: params,
    maxX: Math.max(supplyExpect, 21_000_000),
    count: 300,
  });
  const id = `ProjectBondingCurveChart${new Date().getTime()}`
  if (!chartData || chartData.length === 0) return <ChartSkeleton />
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={margin}
        >
          <XAxis
            allowDataOverflow
            dataKey={'supply'}
            fontSize={12}
            padding={{ left: 3 }}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickMargin={10}
            tickFormatter={(value) => FmtAmount(value)}
          />
          <YAxis
            allowDataOverflow
            dataKey={'price'}
            fontSize={12}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickFormatter={(value) => FmtAmount(value)}
          />
          <Tooltip
            content={props => {
              return (
                <div className="rounded bg-base-200 p-4 shadow">
                  <div className="space-x-1 flex items-center">
                    <span>{t('supply')}</span>
                    <span>{FmtAmount(props?.label)}</span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <span>{t('price')}</span>
                    <span>{FmtAmount(props.payload?.[0]?.value, 6)}</span>
                  </div>
                </div>
              );
            }}
          />
          <defs>
            <linearGradient id={id} gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="rgba(121,80,221,0.8)" />
              <stop offset="50%" stopColor="rgba(121,80,221,0.5)" />
              <stop offset="100%" stopColor="rgba(121,80,221,0.1)" />
            </linearGradient>
          </defs>
          <Area key={`BondingCurveChart`} type="monotone" dataKey={'price'} strokeWidth={2} stroke="#7950DD" fill={`url(#${id})`} />
          <Brush
            dataKey={'supply'}
            tickFormatter={(value) => FmtAmount(value)}
            height={30}
            stroke='rgba(121,80,221,0.5)'
            travellerWidth={10}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurveChart;

