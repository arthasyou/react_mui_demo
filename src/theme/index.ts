import { createTheme } from "@mui/material/styles";
import { enUS, zhCN } from "@mui/material/locale";
import type { Localization } from "@mui/material/locale";

// 动态生成主题
export const getTheme = (locale: Localization) =>
  createTheme(
    {
      colorSchemes: { light: true, dark: true },
      cssVariables: {
        colorSchemeSelector: "class",
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiAlert: {
          styleOverrides: {
            root: {
              variants: [
                {
                  props: { severity: "info" },
                  style: {
                    backgroundColor: "#60a5fa",
                  },
                },
              ],
            },
          },
        },
      },
    },
    locale // 动态语言配置
  );

// 导出 Material-UI 的语言包
export const locales = {
  en: enUS,
  zh: zhCN,
};
