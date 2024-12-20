import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router"; // 使用路由进行跳转
import { routes, type RouteConfig } from "./routes"; // 导入路由配置
import { getTheme, locales } from "@/theme"; // 导入动态主题和语言包
import { useTranslation } from "react-i18next"; // 导入 i18n 国际化功能
import { ThemeProvider, CssBaseline } from "@mui/material"; // 导入 MUI 组件

import Box from "@mui/material/Box";
import AppBar from "./components/Appbar"; // 导入自定义的 AppBar
import Navbar from "./components/nav/Navbar"; // 导入自定义的 Navbar
import { DrawerHeader } from "./components/Header"; // 导入自定义的 DrawerHeader
import Login from "./pages/Login"; // 导入 Login 页面组件
import { userInfo } from "./api/userApi"; // 导入获取用户信息的接口

// 递归渲染路由函数
const renderRoutes = (routesList: RouteConfig[]): React.ReactNode => {
  return routesList.map((route: RouteConfig, index: number) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)} {/* 递归渲染子路由 */}
    </Route>
  ));
};

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
    navigate("/"); // 跳转到主页面，假设主页面是 /dashboard
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* 提供主题 */}
      <Suspense fallback="Loading...">
        {" "}
        {/* 处理懒加载，显示加载中状态 */}
        {isLoggedIn ? ( // 如果已登录，渲染主页面
          <Box sx={{ display: "flex" }}>
            <CssBaseline /> {/* 全局样式重置 */}
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />{" "}
            {/* 渲染 AppBar */}
            <Navbar
              open={open}
              handleDrawerClose={handleDrawerClose}
              currentRole="user"
            />{" "}
            {/* 渲染 Navbar */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader /> {/* 渲染 DrawerHeader */}
              {/* 渲染路由配置 */}
              <Routes>{renderRoutes(routes)}</Routes>
            </Box>
          </Box>
        ) : (
          // 如果未登录，渲染 Login 页面
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
