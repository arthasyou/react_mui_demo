import React, { Suspense, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router";
import { renderRoutes, useDynamicRouter } from "./routes";
import { getTheme, locales } from "@/theme";
import { useTranslation } from "react-i18next";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Box from "@mui/material/Box";
import AppBar from "./components/Appbar";
import Navbar from "./components/nav/Navbar";
import { DrawerHeader } from "./components/Header";
import Login from "./pages/Login";
import { userInfo } from "./api/userApi";

const currentRole = "root";

// 递归渲染路由函数

const App: React.FC = () => {
  const { i18n } = useTranslation(); // 获取国际化功能
  const [theme, setTheme] = useState(getTheme(locales.en)); // 初始主题为英文
  const [open, setOpen] = React.useState(false); // 控制侧边栏的打开状态
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 用于控制是否登录
  const navigate = useNavigate(); // 使用 useNavigate 来进行跳转

  // 打开侧边栏
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // 关闭侧边栏
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // 监听语言变化，动态更新 MUI 的主题
  useEffect(() => {
    // 根据当前语言更新主题
    const currentLocale = i18n.language === "zhCN" ? locales.zh : locales.en;
    setTheme(getTheme(currentLocale));

    // 检查用户是否登录
    const checkLoginStatus = async () => {
      try {
        const userInfoResponse = await userInfo(); // 调用获取用户信息接口
        if (userInfoResponse.code === 0) {
          // 假设返回的 code 表示成功
          setIsLoggedIn(true); // 如果成功，表示已登录
        } else {
          setIsLoggedIn(false); // 如果失败，表示未登录
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsLoggedIn(false); // 捕获错误，表示未登录
      }
    };

    checkLoginStatus(); // 执行登录状态检查
  }, [i18n.language]); // 依赖 i18n.language，当语言变化时更新主题

  // 登录成功后的回调
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const routes = useDynamicRouter();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback="Loading...">
        {isLoggedIn ? (
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Navbar open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Routes>{renderRoutes(routes, currentRole)}</Routes>
            </Box>
          </Box>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
