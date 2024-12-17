import { createTheme } from "@mui/material/styles";
import { enUS, zhCN } from "@mui/material/locale";

// 动态生成主题
export const getTheme = (locale: any) =>
  createTheme(
    {
      palette: {
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#dc004e",
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
    locale // 动态语言配置
  );

// 导出 Material-UI 的语言包
export const locales = {
  en: enUS,
  zh: zhCN,
};
