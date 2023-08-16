import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import useRandomInfo from '../hooks/useRandom';
import { RandomIcon } from '@/assets';
import UploadImage from '@/components/upload/upload-image';
import { useCallback, useEffect, useRef } from 'react';
import { IFormData } from '../type';
import ConnectWallet from '@/components/connect-wallet';
import { useAccount } from 'wagmi';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-export-i18n';

type TheDetailsProps = React.HTMLAttributes<HTMLElement> & {};
const TheDetails = ({ ...attrs }: TheDetailsProps) => {
  const { t } = useTranslation();
  const {
    setValue,
    register,
    trigger,
    formState: { errors },
    watch,
    resetField
  } = useFormContext<IFormData>();
  const { address: account, isDisconnected } = useAccount();
  const [name, symbol, description, websiteUrl, twitterUrl, discordUrl, telegramUrl, ownerAddress] = watch([
    'name',
    'symbol',
    'description',
    'websiteUrl',
    'twitterUrl',
    'discordUrl',
    'telegramUrl',
    'ownerAddress'
  ]);

  const nameMinLength = 4,
    nameMaxLength = 24,
    symbolMinLength = 2,
    symbolMaxLength = 8;

  // const { random } = useRandomInfo();

  const onChangeImage = useCallback(
    (file?: File, fileData?: string) => {
      setValue('logoFile', file);
      setValue('logoData', fileData);
      resetField('logoFile');
      resetField('logoData');
    },
    [resetField, setValue]
  );

  const ref = useRef(true);
  useEffect(() => {
    if (!ownerAddress && account && ref.current) {
      setValue('ownerAddress', account);
      ref.current = false;
    }
  }, [account, ownerAddress, setValue]);

  useEffect(() => {
    if (isDisconnected) ref.current = true;
  }, [isDisconnected]);

  return (
    <div {...attrs} className={clsx('', attrs.className)}>
      <h3 className="mb-12 text-left text-2xl font-bold">{t('project-details')}</h3>
      <div className="w-full space-y-5 md:space-y-10">
        {/*  */}
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <label htmlFor="project-name" className="flex text-sm font-bold md:text-base">
              {t('project-name')}
              <span>*</span>
            </label>
            <span className="text-sm text-accent" id="project-optional"></span>
          </div>
          <div className="relative">
            <input
              {...register('name', {
                required: { value: true, message: t('please-input-project-name') },
                minLength: { value: nameMinLength, message: `${nameMinLength} ${t('character-least')}` },
                maxLength: { value: nameMaxLength, message: `${nameMaxLength} ${t('character-most')}` },
                pattern: { value: /^[^\u4e00-\u9fa5][\sA-Za-z0-9]+$/g, message: `${t('only')} a-z,A-Z,0-9` }
              })}
              id="project-name"
              type="text"
              className={clsx('input input-bordered w-full', errors.name && 'input-error')}
              placeholder={`${nameMinLength}-${nameMaxLength} ${t('characters')}`}
            />

            <div className="absolute inset-y-0 top-1 bottom-1 right-1 flex items-center justify-center pr-4 space-x-1 bg-base-100 rounded-r-full">
              {Boolean(name && name.toString().length > 0) && (
                <button
                  className="text-base-content/30"
                  onClick={() => {
                    resetField('name');
                    trigger('name');
                  }}
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              )}
              {/* <button
                type="button"
                onClick={() => random()}
                className="btn btn-outline btn-xs bg-base-100 h-8 opacity-80"
              >
                <RandomIcon className="w-4 h-4 fill-current" />
                <span>Random</span>
              </button> */}
            </div>
          </div>
          <p className="mt-1 text-sm text-error">{errors.name?.message}</p>
          <p className="mt-1 text-sm text-accent">{t('eg-peopledao')}</p>
        </div>
        {/*  */}
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <label htmlFor="project-symbol" className="flex text-sm font-bold md:text-base">
              {t('token-symbol')}
              <span>*</span>
            </label>
            <span className="text-sm text-accent"></span>
          </div>
          <div className="w-full relative">
            <input
              {...register('symbol', {
                required: { value: true, message: t('token-symbol-input-info') },
                minLength: { value: symbolMinLength, message: `${symbolMinLength} ${t('character-least')}` },
                maxLength: { value: symbolMaxLength, message: `${symbolMaxLength} ${t('character-most')}` },
                pattern: { value: /^[A-Z]+$/, message: t('only-upper-characters') },
                onChange({ currentTarget }) {
                  setValue('symbol', currentTarget.value.trim().toString().toUpperCase());
                }
              })}
              id="project-symbol"
              type="text"
              className={clsx('input input-bordered w-full', errors.symbol && 'input-error')}
              placeholder={`2-8 ${t('characters')}`}
            />
            {Boolean(symbol && symbol.toString().length > 0) && (
              <button
                className=" absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                onClick={() => {
                  resetField('symbol');
                  trigger('symbol');
                }}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            )}
            <p className="mt-1 text-sm text-error">{errors.symbol?.message}</p>
            <p className="mt-1 text-sm text-accent">{t('eg-people')}</p>
          </div>
        </div>
        {/*  */}
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <label htmlFor="description" className="flex text-sm font-bold md:text-base">
              {t('description')}
            </label>
            <span></span>
          </div>
          <div className="w-full relative">
            <textarea
              {...register('description', {
                required: false,
                maxLength: { value: 128, message: `128 ${t('maximum-char')}` },
                onChange({ currentTarget }) {
                  setValue('description', currentTarget.value.replace(/[<>]/, '').substring(0, 128));
                }
              })}
              id="description"
              className={clsx('input input-bordered w-full h-32 py-4 pr-10', errors.description && 'input-error')}
              placeholder={t('whats-going-happen')}
            />
            {Boolean(description && description.toString().length > 0) && (
              <button
                className=" absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                onClick={() => {
                  resetField('description');
                  trigger('description');
                }}
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            )}
            <p className="mt-1 text-sm text-error">{errors.description?.message}</p>
            <p className="mt-1 text-sm text-accent">
              {128 - (description?.toString().length ?? 0)} {t('maximum-char')}
            </p>
          </div>
        </div>
        {/*  */}
        <label className="block w-32 space-y-4">
          <div className={clsx('flex text-sm font-bold md:text-base')}>
            <span className="font-bold">{t('logo')}</span>
            <span>*</span>
          </div>
          <div className="w-32">
            <UploadImage
              id="uploadImage"
              className="w-32 h-32"
              required={true}
              showRandom={true}
              onChanged={onChangeImage}
            />
          </div>
        </label>
        {/*  */}
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-bold md:text-base">{t('project-link-optional')}</div>
          <div className="collapse-content space-y-6 md:px-12">
            <div className="flex justify-between md:space-x-8 mt-6">
              <div className="w-full space-y-4">
                <div className="flex justify-between">
                  <label htmlFor="project-website" className="block text-sm font-bold ">
                    {t('website')}
                    <span></span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register('websiteUrl', {
                      required: false,
                      pattern: { value: /^http[s]?:\/\/[a-zA-Z0-9.]+$/g, message: t('please-input-website') }
                    })}
                    id="project-website"
                    type="text"
                    className={clsx('input input-bordered w-full', errors.websiteUrl && 'input-error')}
                    placeholder={`http[s]://xxxxx.xxx`}
                  />
                  {Boolean(websiteUrl && websiteUrl.toString().length > 0) && (
                    <button
                      className="absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                      onClick={() => {
                        resetField('websiteUrl');
                        trigger('websiteUrl');
                      }}
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-error">{errors.websiteUrl?.message}</p>
                <p className="mt-1 text-sm text-accent"></p>
              </div>
              <div className="w-full space-y-4">
                <div className="flex justify-between">
                  <label htmlFor="project-twitter" className="block text-sm font-bold">
                    {t('twitter')}
                    <span></span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register('twitterUrl', {
                      required: false,
                      pattern: { value: /^https:\/\/twitter\.com\/[a-zA-Z0-9.]+$/g, message: t('please-input-twitter') }
                    })}
                    id="project-twitter"
                    type="text"
                    className={clsx('input input-bordered w-full', errors.twitterUrl && 'input-error')}
                    placeholder={`https://twitter.com/xxxx`}
                  />
                  {Boolean(twitterUrl && twitterUrl.toString().length > 0) && (
                    <button
                      className=" absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                      onClick={() => {
                        resetField('twitterUrl');
                        trigger('twitterUrl');
                      }}
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-error">{errors.twitterUrl?.message}</p>
                <p className="mt-1 text-sm text-accent"></p>
              </div>
            </div>
            <div className="flex justify-between md:space-x-8">
              <div className="w-full space-y-4">
                <div className="flex justify-between">
                  <label htmlFor="project-discord" className="block text-sm font-bold ">
                    {t('discord')}
                    <span></span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register('discordUrl', {
                      required: false,
                      pattern: {
                        value: /^https:\/\/discord\.[a-zA-Z0-9.]+\/[a-zA-Z0-9.]+$/g,
                        message: t('please-input-discord')
                      }
                    })}
                    id="project-discord"
                    type="text"
                    className={clsx('input input-bordered w-full', errors.discordUrl && 'input-error')}
                    placeholder="https://discord.xxx/xxxx"
                  />
                  {Boolean(discordUrl && discordUrl.toString().length > 0) && (
                    <button
                      className=" absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                      onClick={() => {
                        resetField('discordUrl');
                        trigger('discordUrl');
                      }}
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-error">{errors.discordUrl?.message}</p>
                <p className="mt-1 text-sm text-accent"></p>
              </div>
              <div className="w-full space-y-4">
                <div className="flex justify-between">
                  <label htmlFor="project-telegram" className="block text-sm font-bold ">
                    {t('telegram')}
                    <span></span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register('telegramUrl', {
                      required: false,
                      pattern: { value: /^https:\/\/t\.me\/[a-zA-Z0-9.]+$/g, message: t('please-input-telegram') }
                    })}
                    id="project-telegram"
                    type="text"
                    className={clsx('input input-bordered w-full', errors.telegramUrl && 'input-error')}
                    placeholder="https://t.me/xxxx"
                  />
                  {Boolean(telegramUrl && telegramUrl.toString().length > 0) && (
                    <button
                      className=" absolute top-3 right-3 text-base-content/30 bg-base-100 rounded-r-full"
                      onClick={() => {
                        resetField('telegramUrl');
                        trigger('telegramUrl');
                      }}
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-error">{errors.telegramUrl?.message}</p>
                <p className="mt-1 text-sm text-accent"></p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div tabIndex={0} className="collapse collapse-arrow border">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-bold md:text-base">{t('project-owner-optional')}</div>
          <div className="collapse-content w-full space-y-4 -6 md:px-12">
            <div className="flex justify-between mt-6">
              <label htmlFor="project-admin" className="block text-sm font-bold">
                {t('project-owner-address')}
              </label>
              <span className="text-sm text-accent"></span>
            </div>
            <div className="w-full relative">
              <input
                {...register('ownerAddress', {
                  required: false,
                  pattern: {
                    value: /^0x[a-fA-F0-9]{40}$/i,
                    message: t('invalid-addr')
                  }
                })}
                id="project-admin"
                className={clsx('input input-bordered w-full', errors.ownerAddress && 'input-error')}
                placeholder="0x00000..."
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 space-x-2">
                {Boolean(ownerAddress && ownerAddress.toString().length > 0) && (
                  <button
                    className="text-base-content/30 bg-base-100 rounded-r-full"
                    onClick={() => {
                      resetField('ownerAddress');
                      trigger('ownerAddress');
                    }}
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                )}
                {isDisconnected ? (
                  <ConnectWallet className="!btn-sm !btn-outline" />
                ) : (
                  ownerAddress?.toLowerCase() != account?.toLowerCase() && (
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setValue('ownerAddress', account);
                      }}
                    >
                      {t('set-my-address')}
                    </button>
                  )
                )}
              </div>
            </div>

            <p className="mt-1 text-sm text-error">{errors.ownerAddress?.message?.toString()}</p>
            <p className="mt-1 text-sm text-accent"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheDetails;
