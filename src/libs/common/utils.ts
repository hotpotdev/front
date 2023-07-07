
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
export function ScientificToString(value: any): `${number}` | string {
  if (isNaN(value) || Number(value) === 0 || Infinity === Math.abs(Number(value))) return '0'
  const str = value.toString();
  const index = str.indexOf('e-');
  if (index !== -1) {
    const precision = parseInt(str.slice(index + 2), 10);
    return '0.' + '0'.repeat(precision - 1) + str.slice(0, index);
  }
  const match = str.match(/^-?\d+(?:\.\d+)?/);
  if (match) {
    const numberString = match[0];
    const trailingZeros = numberString.match(/\.(\d*?)0*$/);
    const decimalPlaces = trailingZeros ? trailingZeros[1].length : 0;
    return Number(value).toFixed(decimalPlaces);
  } else {
    return str;
  }
}
