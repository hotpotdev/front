import { Hash } from "../types/type";
import { ScientificToString } from "./utils";

/**
 * [zh] 首字母大写
 * @param {string} value
 * @returns
 */
export function FmtFirstToUpper(value?: string) {
  return value ? value.trim().toLowerCase().replace(value[0], value[0].toUpperCase()) : '';
}

/**
 * [zh] 全部换大写
 * @param {string} value
 * @returns
 */
export function FmtUppercase(value?: string) {
  return value ? value.trim().toString().toUpperCase() : '';
}

/**
 * [zh] 全部换小写
 * @param {string} value
 * @returns
 */
export function FmtLowercase(value?: string) {
  return value ? value.trim().toString().toLowerCase() : '';
}
/**
 * [zh] 格式化显示地址
 * @param {string | Hash} address
 * @param {number} [before=6]
 * @param {number} [after=6]
 * @returns
 */
export function FmtAddress(address?: string | Hash, before = 6, after = 6) {
  if (!address) return ''
  const addr = address.trim().toLowerCase();
  return `${addr.substring(0, before)}${addr ? '...' : ''}${addr.substring(addr.length - after)}`;
}

/**
 * using a currency library here in case we want to add more in future
 * [zh] 格式化数字
 * @param {any} value - number
 * @param {number} [digits=3] -
 * @param {function} [roundingFunction=Math.round] -
 * @param {boolean} [average=true] -
 * @returns {string}
 */
export function FmtAmount(value: any, digits = 3, roundingFunction = Math.round, prefix = '') {
  let num = Number(value)
  let after = ''
  if (digits < 0) throw new Error('digits needs to be greater than 0')
  if (isNaN(num)) return `${prefix}-`
  if (num === 0) return `${prefix}0`
  if (num < 0) prefix += '-'
  num = Math.abs(num)
  if (num >= Math.pow(10, 12)) {
    num = num / Math.pow(10, 12)
    after = 'T'
  } else if (num >= Math.pow(10, 9)) {
    num = num / Math.pow(10, 9)
    after = 'B'
  } else if (num >= Math.pow(10, 6)) {
    num = num / Math.pow(10, 6)
    after = 'M'
  } else if (num >= Math.pow(10, 4)) {
    num = num / Math.pow(10, 3)
    after = 'K'
  }
  const str = ScientificToString(num)
  const maxCropNum = Math.pow(10, digits)
  const minCropNum = Math.pow(10, -digits)
  const dotIndex = str.indexOf('.')
  const integerNum = dotIndex === -1 ? num : Number(str.substring(0, dotIndex))
  let decimalPart = dotIndex === -1 ? '0' : str.substring(dotIndex + 1)
  let zeroStr = '';
  if (decimalPart && num < minCropNum) {
    const zeroLen = decimalPart.replace(/[1-9][0-9]*$/g, '').length
    decimalPart = decimalPart.replace(/00*/g, '')
    zeroStr = zeroLen && zeroLen > 0 ? `0{${zeroLen}}` : '';
    return `${integerNum}.${zeroStr}${decimalPart.substring(0, digits)}`
  }
  const decimalNum = Number(`${integerNum}.${decimalPart.substring(0, digits + 1)}`)
  const roundedNum = roundingFunction(decimalNum * maxCropNum) / maxCropNum
  return `${prefix}${roundedNum.toFixed(digits)}${after}`
}



