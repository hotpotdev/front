import clsx from 'clsx'
import { useProjectStore } from '../../store/useProjectStore'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import AddressView from '@/components/format-view/address-view'
import { useState, useMemo } from 'react'
import { FormatToken } from '@/libs/sdk/utils/format'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { tokenAbi } from '@/libs/sdk/contracts/Token'
import customToast from '@/utils/customToast'
import { useForm } from 'react-hook-form'
import useChain from '@/hooks/useChain'
import { useTranslation } from 'next-export-i18n'

type SettingModalProps = React.HTMLAttributes<HTMLElement> & {}

const SettingModal = ({ ...attrs }: SettingModalProps) => {
  const { t } = useTranslation()
  const isSettingModalOpen = useProjectStore((state) => state.isSettingModalOpen)
  const setIsSettingModalOpen = useProjectStore((state) => state.setIsSettingModalOpen)
  const token = useProjectStore((state) => state.token)
  const viewToken = useMemo(() => (token ? FormatToken(token) : undefined), [token])

  const { watch, register } = useForm<{
    treasury?: `0x${string}`,
    admin?: `0x${string}`,
    mintTax: number,
    burnTax: number
  }>({
    defaultValues: {
      treasury: token?.treasury,
      admin: token?.admin,
      mintTax: (viewToken?.mintTax ?? 0) * 1e2,
      burnTax: (viewToken?.burnTax ?? 0) * 1e2
    }
  })

  const [newAdmin, newTreasury, newMintTax, newBurnTax] = watch(['admin', 'treasury', 'mintTax', 'burnTax'])
  const newMintTaxRate = useMemo(()=> BigInt(Math.floor(newMintTax * 1e2)),[newMintTax])
  const newBurnTaxRate = useMemo(()=> BigInt(Math.floor(newBurnTax * 1e2)),[newBurnTax])

  const [editAdmin, setEditAdmin] = useState(false)
  const [editTreasury, setEditTreasury] = useState(false)
  const [editRate, setEditRate] = useState(false)

  const { chain }  = useChain()
  const { config: setProjectTreasuryConf } = usePrepareContractWrite({
    chainId: chain.id,
    address: token?.addr as `0x${string}` | undefined,
    enabled: Boolean(token?.addr),
    abi: tokenAbi,
    functionName: 'setProjectTreasury',
    args: [newTreasury],
  })
  const { isLoading: isLoadingTreasury, writeAsync: writeTreasury } = useContractWrite(setProjectTreasuryConf)

  const { config: setProjectTaxRateConf } = usePrepareContractWrite({
    chainId: chain.id,
    address: token?.addr as `0x${string}` | undefined,
    enabled: Boolean(token?.addr),
    abi: tokenAbi,
    functionName: 'setProjectTaxRate',
    args: [newMintTaxRate, newBurnTaxRate],
  })
  const { isLoading: isLoadingTaxRate, writeAsync: writeTaxRate } = useContractWrite(setProjectTaxRateConf)

  const { config: setProjectAdminConf } = usePrepareContractWrite({
    chainId: chain.id,
    address: token?.addr as `0x${string}` | undefined,
    enabled: Boolean(token?.addr),
    abi: tokenAbi,
    functionName: 'setProjectAdmin',
    args: [newAdmin],
  })
  const { isLoading: isLoadingAdmin, writeAsync: writeAdmin } = useContractWrite(setProjectAdminConf)

  const ConfirmTreasury = async () => {
    if (token && newTreasury && token?.treasury.toUpperCase() != newTreasury.toUpperCase() && writeTreasury) {
      try {
        await customToast.promise(writeTreasury(), {
          loading: `${t('treasury-changing')}...`,
          success: () => {
            return <b>{t('treasury-changing-success')}</b>
          },
          error: (e) => {
            return <b>{t('treasury-changing-error')} {e?.shortMessage}.</b>
          },
        })
      } catch (error) {
        console.error(error)
      }
      setEditTreasury(false)
    } else {
      setEditTreasury(false)
    }
  }

  const ConfirmRate = async () => {
    if ((token?.mintTax != newMintTaxRate || token?.burnTax != newBurnTaxRate) && writeTaxRate) {
      try {
        await customToast.promise(writeTaxRate(), {
          loading: t('taxrate-changing-loading'),
          success: () => {
            return <b>{t('taxrate-changing-success')}</b>
          },
          error: (e) => {
            return <b>{t('taxrate-changing-error')} {e?.shortMessage}.</b>
          },
        })
      } catch (error) {
        console.error(error)
      }
      setEditRate(false)
    } else {
      setEditRate(false)
    }
  }

  const ConfirmAdmin = async () => {
    if (token?.admin.toUpperCase() != newAdmin?.toUpperCase() && writeAdmin) {
      try {
        await customToast.promise(writeAdmin(), {
          loading: t('owner-changing-loading'),
          success: () => {
            return <b>{t('owner-change-success')}</b>
          },
          error: (e) => {
            return <b>{t('owner-change-error')} {e?.shortMessage}.</b>
          },
        })
      } catch (error) {
        console.error(error)
      }
      setEditAdmin(false)
    } else {
      setEditAdmin(false)
    }
    // await hotpotContract.setProjectAdmin(newAdmin);
  }

  return (
    <aside
      {...attrs}
      className={clsx(
        'z-[999] transition-all duration-500',
        attrs.className,
        isSettingModalOpen ? 'fixed bottom-0 left-0 right-0 top-0 h-full w-full' : 'hidden h-0 w-0'
      )}
    >
      <div
        className="absolute flex h-full w-full items-center justify-center bg-base-content/30"
      // onClick={() => setIsSettingModalOpen(false)}
      >
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-base-200 px-6 py-7" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center space-x-2">
            <button type="button" className="cursor-pointer" onClick={() => setIsSettingModalOpen(false)}>
              <ArrowLeftIcon className="h-5 w-5  text-xl duration-300 hover:-translate-x-1" />
            </button>
            <dl>
              <dt className="font-bold">{t('manage')}</dt>
              <dd className="text-xs text-opacity-90">
                <AddressView address={token?.addr} showShare={true} />
              </dd>
            </dl>
          </div>
          {/* editTreasury */}
          <div className={clsx('collapse overflow-visible px-2', editTreasury ? ' collapse-open' : 'collapse-close')}>
            <div className="collapse-title flex min-h-0 items-end justify-between p-0">
              <dl className="space-y-2">
                <dt className="text-accent">{t('treasury-address-input')}</dt>
                <dd className="font-bold">
                  <AddressView address={token?.treasury} showShare={true}  />
                </dd>
              </dl>
              {editTreasury ? (
                <button
                  type="button"
                  className="btn-sm btn btn-outline flex items-center normal-case"
                  onClick={() => ConfirmTreasury()}
                  disabled={isLoadingTreasury}
                >
                  {isLoadingTreasury && <span className="loading loading-spinner loading-xs"></span>}
                  {t('confirm')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-sm btn btn-outline flex items-center normal-case"
                  onClick={() => setEditTreasury(true)}
                >
                  {t('modify')}
                </button>
              )}
            </div>
            <div className="collapse-content p-0">
              <div className="flex items-center justify-between space-x-2 py-2">
                {editTreasury && (
                  <>
                    <input
                      {...register('treasury', {
                      })}
                      type="text"
                      placeholder="0x..."
                      className={clsx('input input-sm w-full')}
                    />
                    <button
                      type="button"
                      onClick={() => setEditTreasury(false)}
                      className="btn-neutral btn-xs btn-circle btn"
                    >
                      x
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Rate */}
          <div className={clsx('collapse overflow-visible  px-2', editRate ? ' collapse-open' : 'collapse-close')}>
            <div className="collapse-title flex min-h-0 items-end justify-between p-0">
              <dl className="space-y-2">
                <dt className="text-accent">{t('tax-rate')}</dt>
                <dd className="font-bold">
                  {t('mint')} {(viewToken?.mintTax ?? 0) * 1e2} % | {t('burn')} {(viewToken?.burnTax ?? 0) * 1e2} %
                </dd>
              </dl>
              {editRate ? (
                <button
                  type="button"
                  className="btn-outline btn-sm btn flex items-center normal-case"
                  onClick={() => ConfirmRate()}
                  disabled={isLoadingTaxRate}
                >
                  {isLoadingTaxRate && <span className="loading loading-spinner loading-xs"></span>}
                  {t('confirm')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-outline btn-sm btn flex items-center normal-case"
                  onClick={() => setEditRate(true)}
                >
                  {t('modify')}
                </button>
              )}
            </div>
            <div className="collapse-content p-0">
              <div className="flex items-center justify-between space-x-2 py-2">
                {editRate && (
                  <>
                    <div className="relative w-full">
                      <label className="flex items-center space-x-2">
                        <span className="text-[10px]">{t('mint')}</span>
                        <input
                          type="number"
                          step={0.01}
                          min={0}
                          max={20}
                          {...register('mintTax', {
                          })}
                          placeholder="0.01"
                          className={clsx(
                            'h-8 w-full rounded-md border-gray-300 pr-8 text-right text-sm shadow-sm focus:border-secondary-content md:text-base'
                          )}
                        />
                      </label>
                      <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-r border-l border-l-[#CBD5E0] bg-base-200 px-2">
                        %
                      </div>
                    </div>
                    <div className="relative w-full">
                      <label className="flex items-center space-x-2">
                        <span className="text-[10px]">{t('burn')}</span>
                        <input
                          type="number"
                          step={0.01}
                          min={0}
                          max={20}
                          {...register('burnTax', {
                          })}
                          placeholder="0.01"
                          className={clsx(
                            'h-8 w-full rounded-md border-gray-300 pr-8 text-right text-sm shadow-sm focus:border-secondary-content md:text-base'
                          )}
                        />
                      </label>
                      <div className="absolute inset-y-0 bottom-[1px] right-[1px] top-[1px] flex items-center justify-center rounded-r border-l border-l-[#CBD5E0] bg-base-200 px-2">
                        %
                      </div>
                    </div>
                    <button type="button" onClick={() => setEditRate(false)} className="btn-neutral btn-xs btn-circle btn">
                      x
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Transfer Ownership */}
          <div className={clsx('collapse overflow-visible px-2', editAdmin ? 'collapse-open ' : 'collapse-close')}>
            <div className="collapse-title flex min-h-0 items-end justify-between p-0">
              <dl className="space-y-2">
                <dt className="text-accent">{t('transfer-ownership')}</dt>
                <dd className="font-bold">
                  <AddressView address={token?.admin} showShare={true} />
                </dd>
              </dl>
              {editAdmin ? (
                <button
                  type="button"
                  className="btn-outline btn-sm btn flex items-center normal-case"
                  onClick={() => ConfirmAdmin()}
                  disabled={isLoadingAdmin}
                >
                  {isLoadingAdmin && <span className="loading loading-spinner loading-xs"></span>}
                  {t('confirm')}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-outline btn-sm btn flex items-center normal-case"
                  onClick={() => setEditAdmin(true)}
                >
                  {t('modify')}
                </button>
              )}
            </div>
            <div className="collapse-content p-0">
              <div className="flex items-center justify-between space-x-2 py-2">
                {editAdmin && (
                  <>
                    <input
                      {...register('admin')}
                      type="text"
                      placeholder="0x..."
                      className={clsx('input input-sm w-full')}
                    />
                    <button type="button" onClick={() => setEditAdmin(false)} className="btn-neutral btn-xs btn-circle btn">
                      x
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SettingModal
