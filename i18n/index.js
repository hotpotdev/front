var en = require("./lang/en.json")
var zhCN = require("./lang/zh-cn.json")

const i18n = {
  translations: {
    en,
    "zh-CN": zhCN,
  },
  defaultLang: "en",
  useBrowserDefault: true,
};

module.exports = i18n;
