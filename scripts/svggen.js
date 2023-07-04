const fs = require('fs');
const path = require('path');

const EXT = '.svg';
const DIR = '../src/assets/svg';
const OUTPUT_FILE = '../src/assets/index.ts';

const capitalizeWords = (str) => {
  return str.replace(EXT, '').replace(/(^|-|\s)\w/g, (match) => match.toUpperCase()).replace(/\s|-|_/g, '') + 'Icon';
}

const svgs = fs.readdirSync(path.join(__dirname, DIR)).filter((file) => {
  return file.endsWith(EXT);
});

const importStr = svgs.map(file => {
  const url = `${DIR}/${file}`.replace(/\.+\/src/, '@').replace(/\/\//, '')
  return `import ${capitalizeWords(file)} from "${url}";\nimport ${capitalizeWords(file)}Url from "${url}?url";`}
).join('\n')

const exportStr = `export {\n\t${svgs.map(capitalizeWords).join(",\n\t")},\n\t${svgs.map(capitalizeWords).join("Url,\n\t")}Url\n};\n`

fs.writeFileSync(path.join(__dirname, OUTPUT_FILE), `${importStr}\n${exportStr}`);
console.log("generate svgr asstes svg success file",OUTPUT_FILE);
