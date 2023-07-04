/**
 * [zh] 获取价格url
 * @param {string} from
 * @param {string} to
 * @param {string} url
 * @returns
 */
export function getPriceUrl(
  from: string,
  to: string,
  url: string
) {
  return url.replaceAll('//','/').replaceAll('{from}', from).replaceAll('{to}', to);
}
