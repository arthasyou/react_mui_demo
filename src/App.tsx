import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { routes, type RouteConfig } from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { getTheme, locales } from "@/theme"; // 导入动态主题和语言包
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";

// 递归渲染路由函数
const renderRoutes = (routesList: RouteConfig[]): React.ReactNode => {
  return routesList.map((route: RouteConfig, index: number) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)} {/* 递归渲染子路由 */}
    </Route>
  ));
};

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(getTheme(locales.en)); // 初始主题为英文

  // 监听语言变化，动态更新 MUI 的主题
  useEffect(() => {
    const currentLocale = i18n.language === "zhCN" ? locales.zh : locales.en;
    setTheme(getTheme(currentLocale));
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 提供全局样式重置 */}
      <Suspense fallback="Loading...">
        <Navbar />
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
