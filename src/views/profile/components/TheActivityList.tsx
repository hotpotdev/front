import ChainAvatar from '@/components/avatar/chain-avatar';
import AddressView from '@/components/format-view/address-view';
import NumberView from '@/components/format-view/number-view';
import Pagination from '@/components/pagination';
import { CERT_TOKENS } from '@/conf';
import { useAllChainMintBurnWhereFrom } from '@/hooks/useChainInfo';
import useLocale from '@/hooks/useLocale';
import { FmtFirstToUpper } from '@/libs/common/format';
import { ActionDirection, IMintBurns } from '@/libs/sdk/hooks/useMintBurn';
import { MintBurnEntity_OrderBy, OrderDirection } from '@/libs/sdk/types/graphql';

import { FormatToken } from '@/libs/sdk/utils/format';
import { NetToChainId } from '@/utils';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

type TheActivityListProps = React.HTMLAttributes<HTMLElement> & {

}

const TheActivityList = ({ ...attrs }: TheActivityListProps) => {
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc)
  const [orderBy, setOrderBy] = useState<MintBurnEntity_OrderBy>(MintBurnEntity_OrderBy.Timestamp)
  const taggerDirection = () => {
    setOrderDirection(orderDirection === OrderDirection.Asc ? OrderDirection.Desc : OrderDirection.Asc)
  }
  const { address: from } = useAccount()
  const pageSize = 10;
  const [current, setCurrent] = useState(1)
  const skip = useMemo(() => (current - 1) * pageSize, [current])
  const nextSkip = useMemo(() => current * pageSize, [current])
  const { data: mintBurnList, isLoading, refetch, isRefetching } = useAllChainMintBurnWhereFrom({
    from,
    variables: {
      first: pageSize,
      skip,
      orderBy,
      orderDirection
    }
  })
  const { data: nextMintBurnList } = useAllChainMintBurnWhereFrom({
    from,
    variables: {
      first: pageSize,
      skip: nextSkip,
      orderBy,
      orderDirection
    }
  })
  const mintBurns = useMemo(() => mintBurnList?.flat() || [], [mintBurnList])

  const nextMintBurns = useMemo(() => nextMintBurnList?.flat() || [], [nextMintBurnList])

  const total = useMemo(() => Math.floor((skip + mintBurns.length + nextMintBurns.length) / pageSize + 1), [mintBurns.length, nextMintBurns.length, skip])

  const onChange = async (current: number) => {
    setCurrent(current)
    if (!mintBurns) await refetch()
  }
  const { push } = useRouter()
  const onClickProject = async (index: number) => {
    await push(`/project?id=${index}`)
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
      <table className="table <md:table-pin-rows <md:table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>
              <div className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  setOrderBy(MintBurnEntity_OrderBy.TokenName)
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
              const viewToken = FormatToken(mintBurn.token)
              const createTime = format(new Date(Number(mintBurn.timestamp) * 1e3), 'MM/dd/yyyy HH:mm:ss')
              const chainId = NetToChainId(mintBurn.token.net)
              const launchToken = chainId ? CERT_TOKENS[chainId].find(item => item.address === viewToken.raisingToken) : undefined
              return (
                <tr key={`token-list-item-${mintBurn.id}`}
                  className="hover:bg-base-200 cursor-pointer"
                  onClick={() => onClickProject(viewToken.index)}
                >
                  <td>{viewToken?.name}</td>
                  <td>
                    <div className="flex items-end space-x-1">
                      <ChainAvatar chainId={chainId} />
                      <span className="text-xs text-base-content/60">{FmtFirstToUpper(mintBurn.token.net)}</span>
                    </div>
                  </td>
                  <td>
                    {mintBurn.direction === ActionDirection.mint && 'Mint'}
                    {mintBurn.direction === ActionDirection.burn && 'Burn'}
                  </td>
                  <td >
                    <div className="flex items-end space-x-1">
                      <NumberView number={mintBurn.nativeAmount} />
                      <span className="text-xs text-base-content/60">{launchToken?.symbol}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-end space-x-1">
                      <NumberView number={mintBurn.erc20Amount} />
                      <span className="text-xs text-base-content/60">{viewToken.symbol}</span>
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

export default TheActivityList;
