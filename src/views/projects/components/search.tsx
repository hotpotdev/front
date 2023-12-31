import { SearchIcon } from '@/assets'
import { XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx'
import { useTranslation } from 'next-export-i18n';
import { useFormContext } from 'react-hook-form';

type SearchProps = React.HTMLAttributes<HTMLElement> & {}
const Search = ({ ...attrs }: SearchProps) => {
  const { t } = useTranslation()
  const { register, resetField, watch } = useFormContext();
  const [search] = watch(['search'])
  return (
    <label {...attrs} className={clsx('relative block', attrs.className)}>
      <SearchIcon className="absolute left-2 top-2 h-8 w-8 !fill-current opacity-90 rounded-full" />
      <input {...register('search')} placeholder={t('search-place')} type="text" className="input-bordered input w-full pl-12 rounded-lg" />
      {
        search?.length > 0 && <button className="absolute right-2 top-3 text-base-content/30 rounded-full" onClick={() => {
          resetField('search')
        }}>
          <XCircleIcon className="w-6 h-6" />
        </button>
      }
    </label>
  )
}

export default Search
