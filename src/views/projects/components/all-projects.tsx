import clsx from 'clsx';
import ChainAvatar from '@/components/avatar/chain-avatar';
import AddressView from '@/components/format-view/address-view';
import NumberView from '@/components/format-view/number-view';
import { useAllCounterWhere, useAllChainTokens, useAllChainCryptocomparePrice, useAllChainTokenWhere } from '@/hooks/useChainInfo';
import { useMemo, useState } from 'react';
import { FormatToken } from '@/libs/sdk/utils/format';
import { NetToChainId } from '@/utils';
import Pagination from '@/components/pagination';
import { SUPPORT_CHAIN } from '@/conf';
import { ICounter } from '@/libs/sdk/hooks/useCounter';
import { format } from 'date-fns';
import { FmtFirstToUpper } from '@/libs/common/format';
import { useRouter } from 'next/router';
import useLocale from '@/hooks/useLocale';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'ahooks';
import { OrderDirection, TokenEntity_OrderBy } from '@/libs/sdk/types/graphql';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

type AllProjectProps = React.HTMLAttributes<HTMLElement> & {

}

const AllProject = ({ ...attrs }: AllProjectProps) => {

  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc)
  const [orderBy, setOrderBy] = useState<TokenEntity_OrderBy>(TokenEntity_OrderBy.LockValue)
  const taggerDirection = () => {
    setOrderDirection(orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)
  }

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
  const nextSkip = useMemo(() => current * pageSize, [current])
  const { data: tokenList, isLoading, refetch, isRefetching } = useAllChainTokens({
    variables: {
      first: pageSize,
      skip,
      orderBy,
      orderDirection,
    }
  })

  const { data: nextTokenList } = useAllChainTokens({
    variables: {
      first: pageSize,
      skip: nextSkip,
      orderBy,
      orderDirection,
    }
  })

  const tokens = useMemo(() => tokenList?.flat() || [], [tokenList])

  const nextTokens = useMemo(() => nextTokenList?.flat() || [], [nextTokenList])

  const total = useMemo(() => Math.floor((skip + tokens.length + nextTokens.length) / pageSize + 1), [tokens.length, nextTokens.length, skip])

  const onChange = async (current: number) => {
    setCurrent(current)
    if (!tokens) await refetch()
  }
  const { push } = useRouter()
  const onClickProject = async (index: number) => {
    await push(`/project?id=${index}`)
  }

  const { watch } = useFormContext();
  const [search = ''] = watch(['search'])
  const isSearch = useMemo(() => search?.length > 0, [search.length])
  const searchAddress = useMemo(() => /^(0x)/.test(search) ? search : '', [search])
  const searchIndex = useMemo(() => isNaN(search) || Boolean(searchAddress) ? undefined : Number(search), [search, searchAddress])
  const searchSymbol = useMemo(() => /^[A-Z]+$/.test(search) ? search : '', [search])
  const address = useDebounce(searchAddress, { wait: 1000 })
  const index = useDebounce(searchIndex, { wait: 1000 })
  const symbol = useDebounce(searchSymbol, { wait: 1000 })
  const name = useDebounce(Boolean(searchSymbol) ? '' : search, { wait: 1000 })
  const { data: searchTokenList, isLoading: isSearchLoading } = useAllChainTokenWhere({
    address,
    index,
    name,
    symbol,
    enabled: isSearch
  })

  const searchTokens = useMemo(() => searchTokenList?.flat() || [], [searchTokenList])

  const viewTokens = useMemo(() => isSearch ? searchTokens : tokens, [isSearch, searchTokens, tokens])


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
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(TokenEntity_OrderBy.Name)
                  taggerDirection()
                }}>
                <span>Project</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>Chain</th>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(TokenEntity_OrderBy.Symbol)
                  taggerDirection()
                }}>
                <span>Ticker</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>
              Total Volume
            </th>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(TokenEntity_OrderBy.LockValue)
                  taggerDirection()
                }}>
                <span>TVL</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>Contract</th>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(TokenEntity_OrderBy.CreateTimestamp)
                  taggerDirection()
                }}>
                <span>Create Time</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            viewTokens?.map((token, index) => {
              const viewToken = FormatToken(token)
              const createTime = format(new Date(viewToken!.createTimestamp), 'MM/dd/yyyy HH:mm:ss')
              const chainId = NetToChainId(token.net)
              const price = chainId ? prices?.[chainId] || 0 : 0
              const tradeVolumeAmount = Number(counters.find(item => item.type.toLowerCase() === `${token.addr}|TradeVolume`.toLowerCase())?.count ?? 0n)
              const tradeVolume = Number(tradeVolumeAmount) * viewToken.currentPrice * price
              const lockValue = viewToken.lockValue * price
              return (
                <tr key={`token-list-item-${viewToken?.index}`}
                  className="hover:bg-base-200 cursor-pointer"
                  onClick={() => onClickProject(viewToken.index)}
                >
                  <td>{viewToken?.name}</td>
                  <td>
                    <div className="flex items-end space-x-1">
                      <ChainAvatar chainId={chainId} />
                      <span className="text-xs text-base-content/60">{FmtFirstToUpper(token.net)}</span>
                    </div>
                  </td>
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
        (isSearch ? isSearchLoading : isLoading || isRefetching) ? <Loading /> : (isSearch ? searchTokens.length === 0 : tokens?.length === 0) && <Empty />
      }
      <div className="w-full overflow-hidden justify-end flex py-6">
        <Pagination total={total} onChange={onChange} />
      </div>
    </div>
  );
};

export default AllProject;
