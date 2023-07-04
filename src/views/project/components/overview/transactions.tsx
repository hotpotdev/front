import AddressView from '@/components/format-view/address-view';
import NumberView from '@/components/format-view/number-view';
import Pagination from '@/components/pagination';
import { CERT_TOKENS, GRAPHQL_API } from '@/conf';
import { ActionDirection, useMintBurnWhereToken } from '@/libs/sdk/hooks/useMintBurn';
import { IToken } from '@/libs/sdk/hooks/useToken';
import { MintBurnEntity_OrderBy, OrderDirection } from '@/libs/sdk/types/graphql';
import { NetToChainId } from '@/utils';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';



type TransactionsProps = React.HTMLAttributes<HTMLElement> & {
  token: IToken
}
const Transactions = ({ token, ...attrs }: TransactionsProps) => {
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc)
  const [orderBy, setOrderBy] = useState<MintBurnEntity_OrderBy>(MintBurnEntity_OrderBy.Timestamp)
  const taggerDirection = () => {
    setOrderDirection(orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)
  }

  const tokenChainId = useMemo(() => NetToChainId(token.net), [token.net])
  const tokenLaunchToken = useMemo(() => tokenChainId ? CERT_TOKENS[tokenChainId].find(item => item.address === token.raisingToken) : undefined, [token.raisingToken, tokenChainId])
  const tokenEndpoint = useMemo(() => tokenChainId ? GRAPHQL_API[tokenChainId] : undefined, [tokenChainId])
  const pageSize = 10;
  const [current, setCurrent] = useState(1)
  const skip = useMemo(() => (current - 1) * pageSize, [current])
  const nextSkip = useMemo(() => current * pageSize, [current])
  const { data: mintBurns = [], isLoading, refetch, isRefetching } = useMintBurnWhereToken({
    endpoint: tokenEndpoint,
    tokenAddress: token?.addr as `0x${string}`,
    variables: {
      first: pageSize,
      skip,
      orderBy,
      orderDirection
    }
  })
  const { data: nextMintBurns = [] } = useMintBurnWhereToken({
    endpoint: tokenEndpoint,
    tokenAddress: token?.addr as `0x${string}`,
    variables: {
      first: pageSize,
      skip: nextSkip,
      orderBy,
      orderDirection
    }
  })

  const total = useMemo(() => Math.floor((skip + mintBurns.length + nextMintBurns.length) / pageSize + 1), [mintBurns.length, nextMintBurns.length, skip])

  const onChange = async (current: number) => {
    setCurrent(current)
    if (!mintBurns) refetch()
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
      <div className={clsx('animate-twPulse flex space-x-4 items-center justify-between py-2 pl-4 pr-10', mintBurns?.length % 2 == 0 ? 'bg-base-100' : 'bg-base-200')}>
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
      <table className="table <md:table-pin-rows <md:table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(MintBurnEntity_OrderBy.Direction)
                  taggerDirection()
                }}>
                <span>Action</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>

              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(MintBurnEntity_OrderBy.NativeAmount)
                  taggerDirection()
                }}>
                <span>Anchor Token</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>

              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(MintBurnEntity_OrderBy.Erc20Amount)
                  taggerDirection()
                }}>
                <span>Token Amount</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
            <th>Tx Hash</th>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(MintBurnEntity_OrderBy.Timestamp)
                  taggerDirection()
                }}>
                <span>Time</span>
                <ArrowsUpDownIcon className="w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            mintBurns?.map((mintBurn, index) => {
              const createTime = format(new Date(Number(mintBurn.timestamp) * 1e3), 'MM/dd/yyyy HH:mm:ss')
              const chainId = NetToChainId(mintBurn.token.net)
              return (
                <tr key={`token-list-item-${mintBurn.id}`}
                  className="hover:bg-base-200 cursor-pointer"
                >
                  <td>
                    {mintBurn.direction === ActionDirection.mint && 'Mint'}
                    {mintBurn.direction === ActionDirection.burn && 'Burn'}
                  </td>
                  <td >
                    <div className="flex items-end space-x-1">
                      <NumberView number={mintBurn.nativeAmount} />
                      <span className="text-xs text-base-content/60">{tokenLaunchToken?.symbol}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-end space-x-1">
                      <NumberView number={mintBurn.erc20Amount} />
                      <span className="text-xs text-base-content/60">{token.symbol}</span>
                    </div>
                  </td>
                  <td><AddressView address={mintBurn.hash} showCopy={true} showShare={true} type={"tx"} /></td>
                  <td>{createTime}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        isLoading || isRefetching ? <Loading /> : mintBurns?.length === 0 && <Empty />
      }
      <div className="w-full overflow-hidden justify-end flex py-6">
        <Pagination total={total} onChange={onChange} />
      </div>
    </div>
  );
};

export default Transactions;
