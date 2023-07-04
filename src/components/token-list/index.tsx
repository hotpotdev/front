import clsx from 'clsx';
import ChainAvatar from '@/components/avatar/chain-avatar';
import AddressView from '@/components/format-view/address-view';
import NumberView from '@/components/format-view/number-view';
import { useAllCounterWhere, useAllChainTokens,useAllChainCryptocomparePrice } from '@/hooks/useChainInfo';
import { IToken } from '@/libs/sdk/hooks/useToken';
import { useMemo, useState } from 'react';
import { FormatToken } from '@/libs/sdk/utils/format';
import { NetToChainId } from '@/utils';
import Pagination from '@/components/pagination';
import { SUPPORT_CHAIN } from '@/conf';
import { ICounter } from '@/libs/sdk/hooks/useCounter';
import { format } from 'date-fns';

type TokenListProps = React.HTMLAttributes<HTMLElement> & {

}

const TokenList = ({ ...attrs }: TokenListProps) => {
  const types = useMemo(() => new Array(SUPPORT_CHAIN.length).fill('TradeVolume', 0, SUPPORT_CHAIN.length), [])
  const { data: counterList, isLoading: isCounterLoading } = useAllCounterWhere({ types })
  const counters = useMemo(() => {
    let list: ICounter[] = []
    counterList?.forEach(item => {
      list = [...list, ...item]
    })
    return list;
  }, [counterList])
  const { data: prices, isLoading: isPriceLoading } = useAllChainCryptocomparePrice()
  const pageSize = 10;
  const [current, setCurrent] = useState(1)
  const skip = useMemo(() => (current - 1) * pageSize, [current])
  const { data: tokenList, isLoading, refetch, isRefetching } = useAllChainTokens({
    variables: {
      first: pageSize,
      skip,
    }
  })

  const tokens = useMemo(() => {
    let list: IToken[] = []
    tokenList?.forEach(item => {
      list = [...list, ...item]
    })
    return list;
  }, [tokenList])

  const onChange = async (current: number) => {
    setCurrent(current)
    if (!tokens) await refetch()
  }
  const Empty = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-3 pt-10 text-gray-300">
        <p>Empty</p>
      </div>
    );
  };
  const Loading = () => {
    return (
      <div className={clsx('animate-twPulse flex space-x-4 items-center justify-between py-2 pl-4 pr-10', tokens?.length % 2 == 0 ? 'bg-base-100' : 'bg-base-200')}>
        <div className="bg-base-300 h-4 w-1/12"></div>
        <div className="rounded-full bg-base-300 h-10 w-10"></div>
        <div className="bg-base-300 h-4 w-1/12"></div>
        <div className="bg-base-300 h-4 w-1/12"></div>
        <div className="bg-base-300 h-4 w-1/12"></div>
        <div className="bg-base-300 h-4 w-2/12"></div>
        <div className="bg-base-300 h-4 w-2/12"></div>
      </div>
    )
  }
  return (
    <div {...attrs} className={clsx('overflow-x-auto w-full', attrs.className)}>
      <table className="table  <md:table-pin-rows <md:table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>Project</th>
            <th>Chain</th>
            <th>Ticker</th>
            <th>Total Volume</th>
            <th>TVL</th>
            <th>Contract</th>
            <th>Create Time</th>
          </tr>
        </thead>
        <tbody>
          {
            tokens?.map((token, index) => {
              const viewToken = FormatToken(token)
              const createTime = format(new Date(viewToken!.createTimestamp), 'MM/dd/yyyy HH:mm:ss')
              const chainId = NetToChainId(token.net)
              const price = chainId ? prices?.[chainId] || 0 : 0
              const tradeVolumeAmount = Number(counters.find(item => item.type.toLowerCase() === `${token.addr}|TradeVolume`.toLowerCase())?.count ?? 0n)
              const tradeVolume = Number(tradeVolumeAmount) * viewToken.currentPrice * price
              const lockValue = viewToken.lockValue * price
              return (
                <tr key={`token-list-item-${viewToken?.index}`}
                  className="hover:bg-base-200">
                  <td>{viewToken?.name}</td>
                  <td> <ChainAvatar chainId={chainId} /> </td>
                  <td>{viewToken?.symbol}</td>
                  <td><NumberView before={'$'} number={tradeVolume} isLoading={isCounterLoading || isPriceLoading} /></td>
                  <td><NumberView before={'$'} number={lockValue} isLoading={isPriceLoading} /></td>
                  <td><AddressView address={viewToken?.addr} showCopy={true} showShare={true} /></td>
                  <td>{createTime}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        isLoading || isRefetching ? <Loading /> : tokens?.length === 0 && <Empty />
      }
      <div className="w-full overflow-hidden justify-end flex py-6">
        <Pagination total={Math.floor((skip + tokens.length) / pageSize + 1)} onChange={onChange} />
      </div>
    </div>
  );
};

export default TokenList;
