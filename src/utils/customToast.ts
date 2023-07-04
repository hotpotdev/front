import { Options, info, warning } from "@/components/custom-toast"
import toast, { Renderable, Toast, ValueOrFunction } from "react-hot-toast"

export const customToast = Object.assign(toast, {
  info: (message: ValueOrFunction<Renderable, Toast>, opts?: Options) => toast(message, { ...opts, ...info }),
  warning: (message: ValueOrFunction<Renderable, Toast>, opts?: Options) => toast(message, { ...opts, ...warning }),
})

export default customToast
