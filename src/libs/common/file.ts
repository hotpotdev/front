/**
 * [zh] 获取 web3 头像 snspshot
 * @param {string} address
 * @param {string} [type='avatar'] - address
 * @param {string}  [stamp_url='https://stamp.fyi/{type}/{address}'] - type 类型  address 地址
 * @returns {string}
 */
export function GetStampUlr(address: string, type = 'avatar', stamp_url = 'https://stamp.fyi/{type}/{address}'): string {
  return stamp_url.replaceAll('{type}', type).replaceAll('{address}', address);
}

/**
 *  Compression or  Convert Image
 *  [zh] 压缩
 * @param {HTMLImageElement} img
 * @param {number} quality
 * @param {string} type
 * @param {HTMLCanvasElement} canvas
 * @returns
 */
export function CompOrConvertImage(
  img: HTMLImageElement,
  quality = 1,
  type = 'image/webp',
  canvas: HTMLCanvasElement = document.createElement('canvas')
) {
  return new Promise((resolve, rejects) => {
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) throw new Error('get conetxt error !');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL(type, quality));
    };
    img.onerror = rejects;
  });
}

/**
 * 图片添加水印
 * @param {object} option [src, text, size, xInterval, yInterval, rotate, color, clear, type, quality, bg, canvas]
 * @returns
 */
export async function AddWatermark(option: { [key: string]: any }) {
  return new Promise((resolve, reject) => {
    const { src, text, size, xInterval, yInterval, rotate, color, clear, type, width, height, quality, bg, canvas } =
      Object.assign(
        {
          text: '' + new Date().getTime(), // 文本
          rotate: -45, // 旋转角度
          size: 26, // 字体大小
          xInterval: 60, // x 间隔
          yInterval: 60, // y 间隔
          color: 'rgba(255,255,255,0.8)', // 文字颜色
          clear: true, // 清除画布
          width: 500, // 宽度
          height: 500, // 高度
          type: 'image/webp', // 导出图片类型
          quality: 1, // 图片质量 0.1 - 1
          bg: new Image(), // 背景图片对象
          canvas: document.createElement('canvas'), // canvas 对象
        },
        option
      );
    // set image src
    if (src) bg.src = src;
    bg.setAttribute('crossOrigin', 'anonymous');
    // 加载完成开始绘制
    bg.onload = function () {
      //准备canvas环境
      canvas.width = width || bg.width;
      canvas.height = height || bg.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) throw new Error('get conetxt error !');
      // 清除画布
      if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 绘制图片
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      // 绘制水印
      const rotateP = (rotate * Math.PI) / 180;
      const costheta = Math.cos(rotateP);
      const sintheta = Math.sin(rotateP);
      ctx.font = size + 'px system';
      ctx.fillStyle = color;
      const textXInterval = ((text.toString().length * size) / 2 + xInterval) * costheta;
      const textYInterval = (size / 2 + yInterval) * costheta;
      const xEnd = width;
      const yEnd = height * costheta - width * sintheta;
      // x = x*con + y*sin
      // y = y*cos - x*sin
      ctx.rotate(rotateP);
      for (let x = 1; x < xEnd; x += textXInterval) {
        // 水印横向间隔
        for (let y = size + 1; y <= yEnd; y += textYInterval) {
          // 水印纵向间隔
          ctx.fillText(text, x * costheta + y * sintheta, y * costheta - x * sintheta);
        }
      }
      ctx.rotate(-rotateP); // 恢复
      // 导出
      resolve(canvas.toDataURL(type, quality));
    };
    // 出错
    bg.onerror = reject;
  });
}

/**
 * Utf8ArrayToStr
 * [zh] utf8 转 string
 * @param {Uint8Array} array
 * @returns
 */
export function Utf8ArrayToString(array: any) {
  let dataString = '';
  for (let i = 0; i < array.length; i++) {
    dataString += String.fromCharCode(array[i]);
  }
  return dataString;
}

/**
 * stream to string
 * [zh] stream 转 string
 * @param {stream} stream
 * @returns
 */
export async function StreamToString(stream: AsyncIterable<Uint8Array>) {
  let data = '';
  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += Utf8ArrayToString(chunk);
  }
  return data;
}

/**
 * file to Base64 string
 * @param {File} file
 * @returns Base64
 */
export function FileToBase64(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
      resolve(e.target.result);
    };
  });
}

/**
 * file to Base64 string
 * @param {File} file
 * @returns Base64
 */
export function BlobToBase64(file: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
      resolve(e.target.result);
    };
  });
}

/**
 * [zh] dataurl 为传进来的base64格式的图片地址， return 返回的为file格式
 * @param dataurl
 * @param filename
 * @returns
 */
export function Base64ImgToFile(dataurl: string, filename = 'img') {
  const arr = dataurl.split(',');
  const matharr = arr[0].match(/:(.*?);/);
  if (!matharr) {
    throw new Error('dataUrl is error!');
  }
  const mime = matharr[1];
  const suffix = mime.split('/')[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

/**
 * [zh] str 图片
 * @param {string} str
 * @param {string} color
 * @param {string} bg
 * @param {number} width
 * @param {number} height
 * @returns {Base64} base64 encoded PNG
 */
export function TextToImg(text: string, color = '#ff3366', bg = '#fff', width = 120, height = 120) {
  let content: string = text;
  let fsize = 60;
  if (text.length > 2) {
    switch (text.length) {
      case 2:
        fsize = 45;
        break;
      case 3:
        fsize = 30;
        break;
      case 4:
        fsize = 25;
        break;
      default:
        content = text.substring(0, 2);
        fsize = 45;
        break;
    }
  }
  const fontSize = 60;
  const fontWeight = 'bold';
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (context) {
    if (bg) {
      context.fillStyle = bg;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.fillStyle = color;
    context.font = fontWeight + ' ' + fsize + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(content, fontSize, fontSize);
  }
  return canvas.toDataURL('image/png');
}
