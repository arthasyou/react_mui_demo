import { CssBaseline, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next"; // 引入 useTranslation 钩子
import "@/i18n/i18n"; // 引入 i18n 配置文件

const Welcome = () => {
  const { t, i18n } = useTranslation(); // 获取 t 函数和 i18n 实例

  // 切换语言的函数
  const handleChangeLanguage = (lang: "en" | "zhCN") => {
    i18n.changeLanguage(lang); // 切换语言
  };

  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <CssBaseline />
      <Typography variant="h4">{t("welcome")}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {t("description")}
      </Typography>

      {/* 语言切换按钮 */}
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="outlined"
          onClick={() => handleChangeLanguage("en")}
          sx={{ marginRight: 2 }}
        >
          English
        </Button>
        <Button variant="outlined" onClick={() => handleChangeLanguage("zhCN")}>
          中文
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
