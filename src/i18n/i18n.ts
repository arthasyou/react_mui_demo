import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // 加载翻译文件的后端插件（可选）
  .use(LanguageDetector) // 自动检测用户语言（可选）
  .use(initReactI18next) // React 集成
  .init({
    fallbackLng: "en", // 默认语言
    // lng: "zhCN",
    debug: false, // 开发模式下开启调试

    interpolation: {
      escapeValue: false, // React 已经安全转义
    },

    // 本地加载资源（可选，直接配置资源）
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // 指定翻译文件路径
    },
  });

export default i18n;
