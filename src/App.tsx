import React, { Suspense, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppBar from "./components/Appbar";
import Navbar from "./components/nav/Navbar";
import { DrawerHeader } from "./components/Header";
import Login from "./pages/Login";
import { userInfo } from "./api/userApi";
import { getTheme, locales } from "@/theme";
import { renderRoutes, useDynamicRouter } from "./hook/routes";

// 自定义 Hook: 处理登录状态
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await userInfo();
      setIsLoggedIn(response.code === 0);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return { isLoggedIn, setIsLoggedIn };
};

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getTheme(locales.zh));
  const [open, setOpen] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const currentLocale = i18n.language === "zhCN" ? locales.zh : locales.en;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    setTheme(getTheme(currentLocale));
  }, [currentLocale]);

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
              <Routes>{renderRoutes(routes)}</Routes>
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
