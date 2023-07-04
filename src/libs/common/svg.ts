
export const SVG_COLORS: string[][] = [
  ['#F4D03F', '#16A085'],
  ['#A9C9FF', '#FFBBEC'],
  ['#74EBD5', '#9FACE6'],
  ['#FAACA8', '#DDD6F3'],
  ['#FAD961', '#F76B1C'],
  ['#FEE140', '#FA709A'],
  ['#FF3CAC', '#784BA0', '#2B86C5'],
  ['#FBDA61', '#FF5ACD'],
  ['#FF9A8B', '#D48A88', '#FF99AC'],
  ['#FA8BFF', '#2BD2FF', '#2BFF88'],
  ['#3EECAC', '#EE74E1'],
  ['#21D4FD', '#B721FF'],
  ['#FFE53B', '#FF2525'],
  ['#52ACFF', '#FFE32C'],
  ['#08AEEA', '#2AF598'],
  ['#FFDEE9', '#B5FFFC'],
  ['#8BC6EC', '#959E52'],
  ['#85FFBD', '#FFFB1D'],
  ['#FBAB7E', '#F7CE68'],
  ['#00DBDE', '#FC00FF'],
  ['#6284FF', '#FF0000'],
  ['#D9AFD9', '#67D9E1'],
  ['#8EC5FC', '#E0C3FC'],
  ['#0093E9', '#80D0C7'],
  ['#4158D0', '#C850C0', '#FFCC70']
]

const getOffset = (index: number, len: number) => {
  const indexLen = len - 1;
  if (index === 0) return 0
  if (index === indexLen) return 100
  return (100 / indexLen) * index
}

export const GenerateGradientSVG = (hash: string, width: number = 50, height: number = 50, hiddenSvg: boolean = false) => {
  const id = `GradientSVG${new Date().getTime()}`
  const size = hash.split('').map((l: string) => l.charCodeAt(0)).reduce((a: number, b: number) => a + b)
  const colors = SVG_COLORS[size % SVG_COLORS.length]
  const rotate = size % 360
  const opacity = (size % 70 + 30) / 100
  const len = colors.length;
  const stopsElement = colors.map((item, index) => `<stop offset="${getOffset(index, len)}%" stop-color="${item}" stop-opacity="${opacity}" />`).join(' ');
  const str = `<linearGradient id="${id}" >${stopsElement}</linearGradient><rect width="${width}" height="${height}" fill="url(#${id})"/>`
  return hiddenSvg ? str : `<svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" viewBox="0 0 ${width} ${height}">${str}</svg>`
}

export const SVG2File = (svgStr: string,
  filename: string = Date.now().toString(),
  type = 'image/svg+xml'
) => {
  return new File([svgStr], `${filename}.svg`, { type })
}

export const SVG2Base64 = (svgStr: string) => {
  return 'data:image/svg+xml;base64,' + window.btoa(svgStr)
}
