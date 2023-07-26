
/**
 * Rbohash 随机头像
 * @param str
 * @param {string} set set1
 * @returns
 */

export function RbohashAvatarUrl(str: string, set = 'set1') {
  return `https://robohash.org/${str}?set=${set}`
}

/**
 * 去重
 * @param arr
 * @param uniId
 * @returns
 */
export function UniqueFunc(arr: Array<any>, uniId: any) {
  const res = new Map()
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1)) as any
}

/**
 * 是否子路径
 * @param sub
 * @param path
 * @param skiproot
 * @returns
 */
export const IsSubpath = (sub: string, path: string, skiproot: boolean = true): boolean => {
  if (sub === path || sub === '/' || (path === '/' && skiproot)) {
    return sub === path
  }
  return sub.startsWith(path)
}


/**
 * Converts a scientific notation number to a string, preserving its original precision.
 * @param {any} value - The scientific notation number to convert.
 * @returns {string} The number as a string.
 */
export function ScientificToString(value: any): `${number}` {
  if (isNaN(value) || Number(value) === 0 || Infinity === Math.abs(Number(value))) return '0'
  const str = value.toString().replaceAll(',', '')
  const index = str.indexOf('e-');
  if (index !== -1) {
    const precision = parseInt(str.slice(index + 2), 10);
    return '0.' + '0'.repeat(precision - 1) + str.slice(0, index).replace('.', '') as `${number}`;
  }
  const match = str.match(/^-?\d+(?:\.\d+)?/);
  if (match) {
    const numberString = match[0];
    const trailingZeros = numberString.match(/\.(\d*?)0*$/);
    const decimalPlaces = trailingZeros ? trailingZeros[1].length : 0;
    return Number(value).toFixed(decimalPlaces) as `${number}`;
  } else {
    return str;
  }
}


export const InputStringToStringNumber = (str?: string, decimalLen?: number): string => {
  if (str === undefined || str.length == 0) return ''
  const tmp = str.toString().replaceAll(',', '')
    .replace(/[^0-9\.]+/, '')
    .replace(/^\./, '0.')
    .split('.')
    .filter((value) => value !== '')
  const end = str.lastIndexOf('.')
  if (tmp.length <= 1) {
    return tmp.toString() + (end > 0 ? '.' : '')
  }
  const tmp2 = tmp.toString().replace(tmp[0], '').replace(tmp[1], '').replace(/,/g, '')
  return `${tmp[0]}.${tmp[1].substring(0, decimalLen)}${tmp2}`
}


export const InputStringNumberWithCommas = (str?: string, decimalLen?: number) => {
  if (str === undefined || str.length == 0) return ''
  const dotIndex = str.indexOf('.')
  const integerPart = dotIndex === -1 ? str : str.substring(0, dotIndex)
  const decimalPart = dotIndex === -1 ? '' : str.substring(dotIndex, decimalLen ? decimalLen + 2 : undefined)
  return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${decimalPart}`
}

