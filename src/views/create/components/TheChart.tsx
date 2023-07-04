import NumberView from '@/components/format-view/number-view';
import { FmtAmount } from '@/libs/common/format';
import clsx from 'clsx';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from 'recharts';
import { useBondingCurveChart } from '../../../libs/sdk/hooks/useBondingCurve';
import { useFormContext } from 'react-hook-form';

import type { Margin } from 'recharts/types/util/types';
import { IFormData } from '../type';
import { ComputeBondingCurve } from '@/libs/sdk/utils/curve';
import { useMemo } from 'react';


type TheChartProps = React.HTMLAttributes<HTMLElement> & {
  margin?: Margin;
}

const TheChart = ({ margin = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 10
}, ...attrs }: TheChartProps) => {
  const { watch } = useFormContext<IFormData>();
  const [bondingCurveType, supplyExpect = 0, priceExpect = 0, initPrice = 0] = watch([
    'bondingCurveType',
    'supplyExpect',
    'priceExpect',
    'initPrice'
  ]);
  const {params} = useMemo(() => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }), [bondingCurveType, initPrice, priceExpect, supplyExpect])
  const { chartData } = useBondingCurveChart({
    type: bondingCurveType,
    params: params,
    count: 300,
    maxX: supplyExpect
  });
  const id = `CreateBondingCurveChart${new Date().getTime()}`
  if (!chartData || chartData.length === 0) return null
  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={margin}
        >
          <XAxis
            allowDataOverflow
            dataKey={'supply'}
            padding={{ left: 3 }}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickMargin={10}
            tickFormatter={(value) => FmtAmount(value)}
          />
          <YAxis
            allowDataOverflow
            dataKey={'price'}
            tickLine={false}
            axisLine={{ strokeWidth: 1 }}
            tickFormatter={(value) => FmtAmount(value)}
          />
          <Tooltip
            content={props => {
              return (
                <div className="rounded bg-base-200 p-4 shadow">
                  <div className="space-x-1 flex">
                    <span>Supply:</span>
                    <NumberView number={props.label} />
                  </div>
                  <div className="space-x-1">
                    <span>Price:</span>
                    <span>
                      {FmtAmount(
                        ((props.payload ?? []).length > 0 ? props.payload! : [{ value: 0 }])[0].value,
                        6
                      )}
                    </span>
                  </div>
                </div>
              );
            }}
          />
          {/* <Line
            key={`BondingCurveChart`}
            type="monotone"
            dataKey={'price'}
            stroke={'#7950DD'}
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6 }}
          /> */}
          <defs>
            <linearGradient id={id} gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="rgba(121,80,221,0.8)" />
              <stop offset="50%" stopColor="rgba(121,80,221,0.5)" />
              <stop offset="100%" stopColor="rgba(121,80,221,0.1)" />
            </linearGradient>
          </defs>
          <Area key={`BondingCurveChart`} type="monotone" dataKey={'price'} strokeWidth={2} stroke="#7950DD" fill={`url(#${id})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TheChart;
