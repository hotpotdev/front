import clsx from 'clsx'
import { useMemo, useState } from 'react'

export type PaginationProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  defaultCurrent?: number
  total: number,
  onChange?: (current: number) => Promise<void | boolean | unknown> | void | boolean | unknown
}

const isNext = (flag: boolean | void | undefined | unknown) => {
  return !(typeof flag === 'boolean' && flag === false)
}

const Pagination = ({ defaultCurrent = 1, total, onChange, ...attrs }: PaginationProps) => {
  const [current, setCurrent] = useState(defaultCurrent)
  const [loading, setLoading] = useState<'prev' | 'next' | string>('')
  const isLoading = useMemo(() => loading !== '', [loading])
  const isPrevLoading = useMemo(() => loading === 'prev', [loading])
  const isNextLoading = useMemo(() => loading === 'next', [loading])
  const change = async (page: number) => {
    let err = ''
    try {
      const flag = await onChange?.(page)
      if (isNext(flag)) setCurrent(page)
      else err = 'onChange result' + flag
    } catch (error) {
      err = 'onChange error:' + error
    }
    if (err && process.env.NODE_ENV !== 'production') {
      console.error('Pagination Change Cancel,', err)
    }
    setLoading('')
  }
  const onPrev = () => {
    if (current > 1) {
      setLoading('prev')
      change(current - 1)
    }
  }
  const onNext = () => {
    if (current < total) {
      setLoading('next')
      change(current + 1)
    }
  }

  return (
    <div {...attrs} className={clsx('flex items-center space-x-2', attrs.className)}>
      <button
        title="prev"
        type="button"
        className={clsx('btn-sm btn-circle btn h-8 w-8 hover:btn-primary focus:btn-secondary')}
        disabled={current === 1 || isLoading}
        onClick={onPrev}
      >
        {isPrevLoading ? <span className="loading loading-spinner loading-sm"></span> : '«'}
      </button>
      <button
          type="button"
          className={clsx('btn-sm btn rounded-lg')}
          disabled={isLoading}
        >
          {current}
        </button>
      <button
        title="next"
        type="button"
        className={clsx('btn-sm btn-circle btn h-8 w-8 hover:btn-primary focus:btn-secondary')}
        disabled={isLoading || total === current}
        onClick={onNext}
      >
        {isNextLoading ? <span className="loading loading-spinner loading-sm"></span> : '»'}
      </button>
    </div>
  )
}

export default Pagination
