import { FmtAmount } from '@/libs/common/format'
import clsx from 'clsx'
import { useMemo } from 'react'
import NoSSR from '@/components/no-ssr'
import { ScientificToString } from '@/libs/common/utils'

export type NumberViewProps = React.HTMLAttributes<HTMLElement> & {
  number: any
  isLoading?: boolean
  after?: string
  before?: string
}

const NumberView = ({ number, before = '', after = '', isLoading, ...attrs }: NumberViewProps) => {
  const viewNumber = useMemo(() => FmtAmount(number), [number])
  return (
    <NoSSR>
      <div
        {...attrs}
        className={clsx('tooltip tooltip-top flex items-center',
          'before:text-xs before:shadow after:z-50',
          'before:z-50 before:max-w-[14rem] before:overflow-visible before:whitespace-pre-wrap before:break-words before:bg-base-300 before:text-left before:text-[1em] before:font-normal before:text-base-content',
          attrs.className
        )}
        data-tip={isLoading ? '-' : `${before}${isNaN(number) ? '-' : ScientificToString(number)}${after}`}
      >
        <span>{before}</span> {isLoading ? <span className="loading loading-spinner loading-xs"></span> : viewNumber}{' '}
        <span>{after}</span>
      </div>
    </NoSSR>
  )
}

export default NumberView
