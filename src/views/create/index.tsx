import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TheDetails from './components/TheDetails';
import TheToken from './components/TheToken';
import TheSetting from './components/TheSetting';
import TheDeploy from './components/TheDeploy';

import { erc20ABI, useAccount, useWalletClient } from 'wagmi';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ConnectWallet from '@/components/connect-wallet';

import { useChainCertToken, useChainPlatform } from '@/hooks/useChainInfo';
import type { IFormData } from './type';
import customToast from '@/utils/customToast';
import { parseAbi, zeroAddress } from 'viem'
import { useMintFirstAmount } from './hooks/useMintFirstAmount';
import { ComputeBondingCurve, EncodeLaunchData } from '@/libs/sdk/utils/curve';
import { ILaunchParam } from '@/libs/sdk/types/curve';
import { getContract, writeContract, waitForTransaction } from 'wagmi/actions'
import { UpLoadString, UploadFile } from '@/utils/ipfs';
import { IHotpot_Metadata } from '@/libs/types/metadata';
import { factoryAbi } from '@/libs/sdk/contracts/Factory';
import { LAYOUT_ID } from '@/conf';
import { useRouter } from 'next/router';
import useLocale from '@/hooks/useLocale';

export enum CreateAction {
  Details,
  Token,
  Setting,
  Deploy
}

type CreateViewProps = React.HTMLAttributes<HTMLElement> & {

}

const CreateView = ({ ...attrs }: CreateViewProps) => {
  const router = useRouter()
  const { locale } = useLocale()
  const { isConnected, address: account } = useAccount();
  const chanCertToken = useChainCertToken()
  const [stepIndex, setStepIndex] = useState<CreateAction>(CreateAction.Details)
  const steps = ['Details', 'Token', 'Setting', 'Deploy']
  const methods = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      name: '',
      symbol: '',
      description: '',
      // logoFile: ,
      websiteUrl: '',
      twitterUrl: '',
      discordUrl: '',
      telegramUrl: '',
      ownerAddress: account,

      tokenType: 'ERC20',
      isSbt: false,
      bondingCurveType: 'linear',
      supplyExpect: 21000000,
      priceExpect: 1,
      raisingToken: chanCertToken,
      initPrice: 0.001,

      treasuryAddress: account,
      mintTaxRate: 0,
      burnTaxRate: 0,
      mintAmount: 0,

      isAccept: false
    }
  });

  const { setValue, formState: { errors }, trigger, watch } = methods;
  const [logoFile, treasuryAddress, ownerAddress, raisingToken, isAccept] = watch(['logoFile', 'treasuryAddress', 'ownerAddress', 'raisingToken', 'isAccept'])

  const isDisabled = useMemo(() => {
    switch (stepIndex) {
      case CreateAction.Details: return Boolean(errors.name || errors.symbol || errors.description || errors.logoFile || !logoFile || errors.logoData) // owner
      case CreateAction.Token: return Boolean(errors.supplyExpect || errors.priceExpect || errors.raisingToken || errors.initPrice)
      case CreateAction.Setting: return Boolean(errors.mintAmount || errors.mintTaxRate || errors.burnTaxRate) // treasury
      case CreateAction.Deploy: return Boolean(errors.isAccept || !isAccept)
    }
  }, [stepIndex, errors.name, errors.symbol, errors.description, errors.logoFile, errors.logoData, errors.supplyExpect, errors.priceExpect, errors.raisingToken, errors.initPrice, errors.mintAmount, errors.mintTaxRate, errors.burnTaxRate, errors.isAccept, logoFile, isAccept])

  // 修改管理和国库地址和launch 代币
  useEffect(() => {
    if (account && isConnected) {
      if (stepIndex === CreateAction.Deploy) {
        if (!treasuryAddress) setValue('treasuryAddress', account);
        if (!ownerAddress) setValue('ownerAddress', account);
      }
      if (!raisingToken && chanCertToken) setValue('raisingToken', chanCertToken);
    }
  }, [account, chanCertToken, isConnected, ownerAddress, raisingToken, setValue, stepIndex, treasuryAddress]);



  const changeStep = (index: number) => {
    switch (index) {
      case CreateAction.Details: trigger(['name', 'symbol', 'description', 'logoFile', 'logoData']); break;
      case CreateAction.Token: trigger(['supplyExpect', 'priceExpect', 'raisingToken', 'initPrice']); break;
      case CreateAction.Setting: trigger(['mintAmount', 'mintTaxRate', 'burnTaxRate']); break;
      case CreateAction.Deploy: trigger(['isAccept']); break;
    }
    if (!isDisabled) {
      setStepIndex(index)
    }
    if (typeof window !== 'undefined' && document) {
      const view = document.querySelector(`#${LAYOUT_ID}`)
      if (view) {
        view.scrollTop = 0
      }
    }
  }
  const prevStep = () => {
    setStepIndex(stepIndex - 1)
  }
  const nextStep = () => {
    changeStep(stepIndex + 1)
  }
  const { bondingCurveType, initPrice = 0, priceExpect = 0, supplyExpect = 0, mintTaxRate = 0, mintAmount = 0, ...fromData } = watch()
  const { payAmount } = useMintFirstAmount({
    bondingCurveType,
    supplyExpect,
    priceExpect,
    initPrice,
    mintTaxRate,
    mintAmount
  })
  const { params } = useMemo(() => ComputeBondingCurve({ type: bondingCurveType, supplyExpect, priceExpect, initPrice }), [bondingCurveType, initPrice, priceExpect, supplyExpect])
  const { data: platform } = useChainPlatform()
  const { data: walletClient } = useWalletClient();
  const factoryAddress = useMemo(() => platform?.addr, [platform])

  const [isDeployLoading, setIsDeployLoading] = useState(false)

  const uploadMetadataHandler = async (): Promise<string> => {
    try {
      let imageUrl = '';
      if (fromData.logoFile) {
        const url = await UploadFile(fromData.logoFile);
        if (url) {
          imageUrl = url;
        }
      }
      // desc and image up to ipfs
      const metadataObj: IHotpot_Metadata = {
        name: fromData.name || '',
        image: imageUrl,
        image_data: fromData.logoData,
        description: fromData.description || '',
        website_url: fromData.websiteUrl,
        twitter_url: fromData.twitterUrl,
        discord_url: fromData.discordUrl,
        telegram_url: fromData.telegramUrl,
        attributes: [
          {
            display_type: 'date',
            trait_type: 'birthday',
            value: Math.round(new Date().getTime() / 1000)
          }
        ]
      };
      const metadataUrl = await UpLoadString(JSON.stringify(metadataObj), `${fromData.name}.json`);
      return Promise.resolve(metadataUrl as string || '')
    } catch (error) {
      return Promise.reject('upload metadata to ipfs error!')
    }
  }

  const approveHandler = async () => {
    if (walletClient && factoryAddress && fromData.raisingToken.address) {
      try {
        const result = await writeContract({
          address: fromData.raisingToken.address,
          abi: erc20ABI,
          functionName: 'approve',
          // @ts-ignore
          walletClient,
          args: [factoryAddress as `0x${string}`, payAmount ?? 0n]
        })
        await waitForTransaction({ hash: result.hash })
      } catch (error) {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject({
        shortMessage: 'Is not connect wallet!'
      })
    }
  }

  const launchHandler = async (metadataUrl: string) => {
    if (walletClient && factoryAddress) {
      const factoryContract = getContract({
        address: factoryAddress as `0x${string}`,
        abi: factoryAbi,
        walletClient,
      });
      const { calldata, value } = EncodeLaunchData({
        tokenType: fromData.tokenType,
        bondingCurveType: bondingCurveType,
        name: fromData.name,
        symbol: fromData.symbol,
        metadataUrl: metadataUrl,
        ownerAddress: fromData.ownerAddress || account,
        treasuryAddress: fromData.treasuryAddress || account,
        mintTaxRate: mintTaxRate,
        burnTaxRate: fromData.burnTaxRate,
        isSbt: fromData.isSbt,
        raisingTokenAddress: fromData.raisingToken.address,
        params,
        payAmount: payAmount ?? 0n,
      } as ILaunchParam)
      try {
        const hash = await factoryContract.write.deployToken([calldata, value],{ value: payAmount })
        await waitForTransaction({ hash })
      } catch (error) {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject({
        shortMessage: 'Is not connect wallet!'
      })
    }
  }

  const deployHandler = async () => {
    let isSuccess = true;
    let metadataUrl = '';
    setIsDeployLoading(true)
    try {
      // // 上传 metadata
      await customToast.promise(
        uploadMetadataHandler(),
        {
          loading: 'Upload Metadata...',
          success: (url) => {
            metadataUrl = url;
            return <b>Upload success !</b>
          },
          error: (e) => {
            isSuccess = false;
            return <b>Upload error: {e?.shortMessage}.</b>
          }
        }
      )
      // 授权代币
      if (mintAmount && mintAmount > 0 && isSuccess && fromData.raisingToken.address !== zeroAddress) {
        await customToast.promise(
          approveHandler(),
          {
            loading: 'Check Approve...',
            success: () => {

              return <b>Approve !</b>
            },
            error: (e) => {
              isSuccess = false;
              return <b>Approve error: {e?.shortMessage}.</b>
            }
          }
        )
      }
      // 提交代码
      if (isSuccess) {
        await customToast.promise(
          launchHandler(metadataUrl),
          {
            loading: 'Deploy Project...',
            success: () => {
              isSuccess = true
              return <b>Deploy Success !</b>
            },
            error: (e) => {
              return <b>Deploy error: {e?.shortMessage}.</b>
            }
          }
        )
      }
      if (isSuccess) {
        router.push(`/${locale}/projects`)
      }
    } catch (error) {
      console.error(error)
    }
    setIsDeployLoading(false)
  }

  return (
    <main {...attrs} className={clsx('mx-auto max-w-screen-lg lg:my-16 space-y-12', attrs.className)}>
      <ul className="steps w-full">
        {
          steps.map((item, index) => (
            <li key={`step-${item}`}
              data-content=""
              className={clsx('step after:!w-6 after:!h-6 before:!h-1 cursor-pointer', index <= stepIndex && 'step-primary before:!-ml-[calc(100%-1.5rem)] before:opacity-50', index < stepIndex && 'opacity-50')}
              onClick={() => changeStep(index)}>{item}
            </li>
          ))
        }
      </ul>
      <FormProvider {...methods}>
        <div className="w-full md:px-16 overflow-x-hidden">
          <TheDetails className={clsx(
            'transition-transform duration-500',
            stepIndex === 0
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
          <TheToken className={clsx(
            'transition-transform duration-500',
            stepIndex === 1
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
          <TheSetting className={clsx(
            'transition-transform duration-500',
            stepIndex === 2
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
          <TheDeploy className={clsx(
            'transition-transform duration-500',
            stepIndex === 3
              ? 'h-auto w-auto translate-x-0 opacity-100'
              : 'h-0 w-0 translate-x-full overflow-hidden opacity-0'
          )} />
        </div>
        {/*  */}
        <div className="md:px-16 flex justify-end">
          <div className="space-x-4 md:space-x-8 flex items-center">
            {
              stepIndex >= CreateAction.Token && (
                <button
                  onClick={() => prevStep()}
                  type="button"
                  className={clsx(
                    'btn-primary btn btn-xs h-10 mx-auto inline-flex items-center font-bold normal-case disabled:border-base-100',
                  )}
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Prev</span>
                </button>
              )
            }
            {
              stepIndex <= CreateAction.Setting ?
                (
                  <button
                    onClick={() => nextStep()}
                    disabled={isDisabled}
                    type="button"
                    className={clsx(
                      'btn-primary btn btn-xs h-10 mx-auto inline-flex items-center font-bold normal-case disabled:border-base-100',
                    )}
                  >
                    <span>Next</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                )
                : isConnected ? (
                  <button
                    onClick={() => deployHandler()}
                    disabled={isDisabled || isDeployLoading}
                    type="button"
                    className={clsx(
                      'btn-primary btn btn-xs h-10 mx-auto inline-flex items-center font-bold normal-case disabled:border-base-100',
                    )}
                  >
                    {isDeployLoading && <span className="loading loading-spinner loading-sm"></span>}
                    Deploy
                  </button>
                ) : (
                  <ConnectWallet />
                )
            }
          </div>
        </div>
      </FormProvider>
    </main>
  );
};

export default CreateView;


