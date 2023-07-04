import { DiscordIcon, SettingIcon, TelegramIcon, TwitterIcon, WebsiteIcon } from '@/assets';
import clsx from 'clsx';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react';
import TheOverview from './components/overview';
import LocaleLink from '@/components/locale-link';
import TheVesting from './components/vesting';
import TheGovernance from './components/governance';
import { useProjectStore } from './store/useProjectStore';
import { useRouter } from 'next/router';
import useLocale from '@/hooks/useLocale';
import { useAllChainTokenWhere } from '@/hooks/useChainInfo';
import AddressView from '@/components/format-view/address-view';
import { FmtFirstToUpper } from '@/libs/common/format';
import { useFetchMetadata } from '@/hooks/useMetadata';
import { GenerateGradientSVG, SVG2Base64 } from '@/libs/common/svg';
import { useAccount } from 'wagmi';
import ProjectSkeleton from './components/project-skeleton';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { FormatToken } from '@/libs/sdk/utils/format';

type ProjectViewProps = React.HTMLAttributes<HTMLElement> & {

}

export enum ModuleType {
  Overview,
  Vesting,
  Governance
}

const ProjectView = ({ ...attrs }: ProjectViewProps) => {
  const { query, push } = useRouter()
  const { locale } = useLocale()
  const id = useMemo(() => {
    const id = Number(query['id']);
    return (isNaN(id) || id < 0) ? -1 : id
  }, [query])
  const [showDesc, setShowDesc] = useState(false)
  const [moduleIndex, setModuleIndex] = useState(ModuleType.Overview)
  const setIsSettingModalOpen = useProjectStore(state => state.setIsSettingModalOpen)
  const setToken = useProjectStore(state => state.setToken)

  const { connector, address: account, isConnected } = useAccount()
  const { data, isLoading } = useAllChainTokenWhere({
    index: id,
  })

  const token = useMemo(() => data?.[0]?.[0], [data])  // TODO 多链选择项目问题
  const viewToken = useMemo(() => token ? FormatToken(token) : undefined, [token])
  const { data: metadata, isLoading: isMetadataLoading } = useFetchMetadata(token?.metaUri as `ipfs://${string}` || '') // TODO metadata url
  const tokenLogo = useMemo(() => metadata?.image || (token?.addr ? SVG2Base64(GenerateGradientSVG(token?.addr)) : undefined), [metadata?.image, token?.addr])
  const isAdmin = useMemo(() => account && token?.admin && token.admin.toLowerCase() === account.toLowerCase(), [account, token?.admin])

  const addStableToken = async () => {
    if (token) {
      await connector?.watchAsset?.({
        address: token?.addr,
        image: tokenLogo,
        symbol: token.symbol,
        decimals: 18,
      })
    }
  }


  useEffect(() => {
    if (id < 0 && typeof window !== 'undefined' && !isLoading && !token) push(`/${locale}/404`)
  }, [id, isLoading, locale, push, token])

  if (id < 0 || !token || isLoading || (Boolean(token?.metaUri) && isMetadataLoading)) {
    return <ProjectSkeleton />
  }
  return (
    <main {...attrs} className={clsx('mx-auto w-full max-w-screen-lg lg:my-16 space-y-12', attrs.className)}>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div className="relative rounded-full overflow-hidden w-20 h-20">
            {tokenLogo && <Image priority sizes="100vw" fill alt="logo" src={tokenLogo} className="relative object-cover" />}
          </div>
          <div className="space-y-1">
            <h2 className="font-bold mb-4">{viewToken?.name} ({viewToken?.symbol})</h2>
            <div className="flex items-center space-x-2">
              <span>Project ID: {viewToken?.index}</span>
              <span className="opacity-60">|</span>
              <div>Owned by <AddressView address={viewToken?.admin} showShare={true} /></div>
            </div>
            <div className="flex space-x-2 items-center">
              <span>Address: </span>
              <AddressView address={viewToken?.addr} showShare={true} />
              {
                isConnected && (
                  <button type="button" className="cursor-pointer inline-flex" onClick={() => addStableToken()}>
                    <FolderPlusIcon className="h-5 w-5" />
                  </button>
                )
              }
            </div>
            <div className="space-x-2">
              <span className="badge badge-outline badge-sm"> {viewToken?.tokenType} </span>
              <span className="badge badge-outline badge-sm"> {FmtFirstToUpper(viewToken?.bondingCurveType)} </span>
            </div>
            <div className={clsx('text-base-content/80 w-full max-w-md relative pr-5 whitespace-pre-wrap transition-all duration-500 break-words truncate', showDesc ? 'h-auto' : ' h-5')}>
              {metadata?.description}
              {metadata?.description && metadata?.description.length > 67 && <ChevronDoubleDownIcon onClick={() => {
                setShowDesc(!showDesc)
              }} className={clsx('w-4 h-4 absolute bottom-0 right-0 cursor-pointer opacity-80', showDesc ? 'rotate-180' : '')} />}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 items-start">
          {
            metadata?.website_url && <LocaleLink href={metadata?.website_url}>
              <WebsiteIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </LocaleLink>
          }
          {
            metadata?.twitter_url && <LocaleLink href={metadata?.twitter_url}>
              <TwitterIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </LocaleLink>
          }
          {
            metadata?.discord_url && <LocaleLink href={metadata?.discord_url}>
              <DiscordIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </LocaleLink>
          }
          {
            metadata?.twitter_url && <LocaleLink href={metadata?.twitter_url}>
              <TelegramIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </LocaleLink>
          }
          {
            metadata?.website_url || metadata?.twitter_url || metadata?.discord_url || metadata?.twitter_url && <span className="opacity-60">|</span>
          }
          {
            isAdmin && (
              <button type='button' className="inline-flex cursor-pointer" onClick={() => {
                setToken(token)
                setIsSettingModalOpen(true)
              }}>
                <SettingIcon className="w-5 h-5 stroke-current  transform duration-300 hover:rotate-90 focus:rotate-90" />
              </button>

            )
          }
        </div>
      </div>
      <div className="">
        <div className="tabs">
          <button type="button"
            className={clsx("tab md:tab-lg tab-bordered ", moduleIndex === ModuleType.Overview && 'tab-active')}
            onClick={() => {
              setModuleIndex(ModuleType.Overview)
            }}>Overview </button>
          {/* <button type="button"
            className={clsx("tab md:tab-lg tab-bordered cursor-not-allowed ", moduleIndex === ModuleType.Vesting && 'tab-active')}
            onClick={() => {
              // setModuleIndex(ModuleType.Vesting)
            }}>Vesting </button>
          <button type="button"
            className={clsx("tab md:tab-lg tab-bordered cursor-not-allowed", moduleIndex === ModuleType.Governance && 'tab-active')}
            onClick={() => {
              // setModuleIndex(ModuleType.Governance)
            }}>Governance </button> */}
        </div>
        <div className="w-full md:overflow-x-hidden">
          <TheOverview
            className={clsx(
              'transition-transform duration-500',
              moduleIndex === ModuleType.Overview
                ? 'h-auto w-auto translate-x-0 opacity-100'
                : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
            )}
            token={token}
          />
          <TheVesting className={clsx(
            'transition-transform duration-500',
            moduleIndex === ModuleType.Vesting
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
          <TheGovernance className={clsx(
            'transition-transform duration-500',
            moduleIndex === ModuleType.Governance
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
        </div>
      </div>
    </main>
  );
};

export default ProjectView;
