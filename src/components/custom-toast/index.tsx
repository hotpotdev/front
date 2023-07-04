import type { Toast, ToasterProps } from 'react-hot-toast'
import { toast, Toaster, ToastBar } from 'react-hot-toast'
import clsx from 'clsx'
import { ErrorCircleIcon, InfoCircleIcon, LoadingCircleIcon, SuccessCircleIcon, WarningCircleIcon } from '@/assets'

export type Options =
  | Partial<Pick<Toast, 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>>
  | undefined

export const info: Options = {
  icon: <InfoCircleIcon />,
  iconTheme: {
    primary: 'hsl(var(--inu))',
    secondary: 'hsl(var(--inc))',
  },
}

export const success: Options = {
  icon: <SuccessCircleIcon />,
  iconTheme: {
    primary: 'hsl(var(--su))',
    secondary: 'hsl(var(--suc))',
  },
}

export const warning: Options = {
  icon: <WarningCircleIcon />,
  iconTheme: {
    primary: 'hsl(var(--wa))',
    secondary: 'hsl(var(--wac))',
  },
}

export const error: Options = {
  icon: <ErrorCircleIcon />,
  iconTheme: {
    primary: 'hsl(var(--er))',
    secondary: 'hsl(var(--erc))',
  },
}

export const loading: Options = {
  icon: <LoadingCircleIcon className="h-5 w-5 animate-spin" />,
  iconTheme: {
    primary: 'hsl(var(--p))',
    secondary: 'hsl(var(--pc))',
  },
}

export const toastOptions: ToasterProps['toastOptions'] = {
  style: { color: 'hsl(var(--bc))', background: 'hsl(var(--b2))', padding: '0.75rem 1rem', top: '6rem' },
  success,
  error,
  loading,
}

const CustomToaster = ({ ...attrs }: ToasterProps) => (
  <Toaster {...attrs} toastOptions={toastOptions}>
    {(t) => (
      <ToastBar toast={t} style={t.style}>
        {({ icon, message }) => {
          return (
            <div className={clsx('flex', t.className)}>
              <div className="mt-[6px]">{icon}</div>
              <div className="max-w-[308px] flex-1 break-words text-sm">{message}</div>
              <div className="flex items-center">
                {t.type !== 'loading' && (
                  <button
                    type="button"
                    title="close dismiss"
                    className="btn-xs btn-circle btn border-transparent bg-transparent duration-200 hover:-rotate-90"
                    onClick={() => t && toast.dismiss(t.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )
        }}
      </ToastBar>
    )}
  </Toaster>
)

export default CustomToaster


