import { DiscordIcon, MetamaskIcon, SettingIcon, TelegramIcon, TwitterIcon, WebsiteIcon } from '@/assets';
import clsx from 'clsx';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import TheOverview from './components/overview';
import Link from 'next/link';
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
import { FormatToken } from '@/libs/sdk/utils/format';
import { useCoingeckoPrice } from '@/hooks/useCoingecko';
import { NetToChainId } from '@/utils';
import { CHAIN_PRICE_SYMBOL } from '@/conf';
import NumberView from '@/components/format-view/number-view';
import { useTranslation } from 'next-export-i18n';

type ProjectViewProps = React.HTMLAttributes<HTMLElement> & {};

export enum ModuleType {
  Overview,
  Vesting,
  Governance
}

const ProjectView = ({ ...attrs }: ProjectViewProps) => {
  const { t } = useTranslation();
  const { query, push } = useRouter();
  const { locale } = useLocale();
  const id = useMemo(() => {
    const id = Number(query['id']);
    return isNaN(id) || id < 0 ? -1 : id;
  }, [query]);
  const [showDesc, setShowDesc] = useState(false);
  const [moduleIndex, setModuleIndex] = useState(ModuleType.Overview);
  const setIsSettingModalOpen = useProjectStore(state => state.setIsSettingModalOpen);
  const setToken = useProjectStore(state => state.setToken);

  const { connector, address: account, isConnected } = useAccount();
  const { data, isLoading } = useAllChainTokenWhere({
    index: id
  });

  const token = useMemo(() => data?.[0]?.[0], [data]); // TODO 多链选择项目问题
  const viewToken = useMemo(() => (token ? FormatToken(token) : undefined), [token]);
  const tokenChainId = useMemo(() => (token ? NetToChainId(token?.net) : undefined), [token]);
  const { data: metadata, isLoading: isMetadataLoading } = useFetchMetadata(
    (token?.metaUri as `ipfs://${string}`) || ''
  ); // TODO metadata url
  const tokenLogo = useMemo(
    () => metadata?.image || (token?.addr ? SVG2Base64(GenerateGradientSVG(token?.addr)) : undefined),
    [metadata?.image, token?.addr]
  );
  const isAdmin = useMemo(
    () => account && token?.admin && token.admin.toLowerCase() === account.toLowerCase(),
    [account, token?.admin]
  );

  const tokenLaunchPriceSymbol = useMemo(
    () => (tokenChainId ? CHAIN_PRICE_SYMBOL[tokenChainId] : undefined),
    [tokenChainId]
  );

  const { data: price = 1 } = useCoingeckoPrice({
    from: tokenLaunchPriceSymbol?.coingecko
  });

  const addStableToken = async () => {
    if (token) {
      await connector?.watchAsset?.({
        address: token?.addr,
        image: tokenLogo,
        symbol: token.symbol,
        decimals: 18
      });
    }
  };

  useEffect(() => {
    if (id < 0 && typeof window !== 'undefined' && !isLoading && !token) {
      push(`/404?lang=${locale}`);
    }
  }, [id, isLoading, locale, push, token]);

  if (id < 0 || !token || isLoading || (Boolean(token?.metaUri) && isMetadataLoading)) {
    return <ProjectSkeleton />;
  }
  return (
    <main {...attrs} className={clsx('mx-auto w-full max-w-screen-lg lg:my-16', attrs.className)}>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-2 items-center">
            <div className="relative rounded-full overflow-hidden w-20 h-20">
              {tokenLogo && (
                <Image priority sizes="100vw" fill alt="logo" src={tokenLogo} className="relative object-cover" />
              )}
            </div>
            {/* <span className="badge badge-outline badge-success"> {viewToken?.currentPrice !== undefined && <NumberView before='~$' number={viewToken?.currentPrice * price} />} </span> */}
          </div>
          <div className="space-y-1">
            <h2 className="font-bold mb-4">
              {viewToken?.name} ({viewToken?.symbol})
            </h2>
            <div className="flex items-center space-x-2">
              <span>
                {t('project-id')}: {viewToken?.index}
              </span>
              <span className="opacity-60">|</span>
              <div>
                {t('owned-by')} <AddressView address={viewToken?.admin} showShare={true} />
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <span>{t('address')}: </span>
              <AddressView address={viewToken?.addr} showShare={true} />
              {isConnected && <MetamaskIcon className="w-4 h-4 cursor-pointer" onClick={() => addStableToken()} />}
            </div>
            <div className="space-x-2">
              <span className="badge badge-outline badge-sm"> {viewToken?.tokenType} </span>
              <span className="badge badge-outline badge-sm"> {FmtFirstToUpper(viewToken?.bondingCurveType)} </span>
            </div>
            {metadata?.description && (
              <div
                className={clsx(
                  'text-base-content/60 w-full max-w-md relative pr-5 whitespace-pre-wrap transition-all duration-500 break-words truncate',
                  showDesc ? 'h-auto' : ' h-5'
                )}
              >
                {metadata?.description}
                {metadata?.description && metadata?.description.length > 67 && (
                  <ChevronDoubleDownIcon
                    onClick={() => {
                      setShowDesc(!showDesc);
                    }}
                    className={clsx(
                      'w-4 h-4 absolute bottom-0 right-0 cursor-pointer opacity-80',
                      showDesc ? 'rotate-180' : ''
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2 items-start">
          {metadata?.website_url !== undefined && (
            <Link href={metadata?.website_url}>
              <WebsiteIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </Link>
          )}
          {metadata?.twitter_url !== undefined && (
            <Link href={metadata?.twitter_url}>
              <TwitterIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </Link>
          )}
          {metadata?.discord_url !== undefined && (
            <Link href={metadata?.discord_url}>
              <DiscordIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </Link>
          )}
          {metadata?.twitter_url !== undefined && (
            <Link href={metadata?.twitter_url}>
              <TelegramIcon className="w-5 h-5 fill-current cursor-pointer hover:fill-primary" />
            </Link>
          )}
          {metadata?.website_url !== undefined ||
            metadata?.twitter_url !== undefined ||
            metadata?.discord_url !== undefined ||
            (metadata?.twitter_url !== undefined && <span className="opacity-60">|</span>)}
          {isAdmin && (
            <button
              type="button"
              className="inline-flex cursor-pointer"
              onClick={() => {
                setToken(token);
                setIsSettingModalOpen(true);
              }}
            >
              <SettingIcon className="w-5 h-5 stroke-current  transform duration-300 hover:rotate-90 focus:rotate-90" />
            </button>
          )}
        </div>
      </div>
      <div className="tabs w-full border-b-2 border-neutral/10 mt-4">
        <button
          type="button"
          className={clsx('tab md:tab-lg tab-bordered ', moduleIndex === ModuleType.Overview && 'tab-active')}
          onClick={() => {
            setModuleIndex(ModuleType.Overview);
          }}
        >
          {t('overview')}{' '}
        </button>
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
      <div className="w-full md:overflow-x-hidden py-6">
        <TheOverview
          className={clsx(
            'transition-transform duration-500',
            moduleIndex === ModuleType.Overview
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )}
          token={token}
        />
        <TheVesting
          className={clsx(
            'transition-transform duration-500',
            moduleIndex === ModuleType.Vesting
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 !p-0 translate-x-full overflow-hidden opacity-0'
          )}
        />
        <TheGovernance
          className={clsx(
            'transition-transform duration-500',
            moduleIndex === ModuleType.Governance
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 !p-0 translate-x-full overflow-hidden opacity-0'
          )}
        />
      </div>
    </main>
  );
};

export default ProjectView;
