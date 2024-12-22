import { createTheme } from "@mui/material/styles";
import { enUS, zhCN } from "@mui/material/locale";
import type { Localization } from "@mui/material/locale";
import {
  enUS as pickerEnUs,
  zhCN as pickerZhCN,
} from "@mui/x-date-pickers/locales";

import { enUS as dataEnUS, zhCN as dataZhCN } from "@mui/x-data-grid/locales";

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
    locale,
    locale === enUS ? pickerEnUs : pickerZhCN,
    locale === enUS ? dataEnUS : dataZhCN
  );

// 导出 Material-UI 的语言包
export const locales = {
  en: enUS,
  zh: zhCN,
};
