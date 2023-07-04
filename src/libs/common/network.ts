/**
 * [zh] 获取图片
 * @param {string} url
 * @returns {Promise<HTMLImageElement | string>}
 */
export async function FetchImage(url: string, param = false): Promise<HTMLImageElement | string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(url);
    img.src = url + param ? '?no-cache-now=' + new Date().getTime() : '';
  });
}

/**
 * [zh] 获取ping值 ms
 * @param {string} url
 * @returns {number} ms [numer time or -1 timeout]
 */
export async function GetPingTimeMs(url: string, timout = 5 * 1000): Promise<number> {
  return new Promise((resovle) => {
    const timer = setTimeout(() => resovle(-1), timout);
    const startTime = new Date().getTime();
    FetchImage(url)
      .finally(() => clearTimeout(timer))
      .then(() => resovle(new Date().getTime() - startTime))
      .catch(() => resovle(new Date().getTime()- startTime));
  });
}
