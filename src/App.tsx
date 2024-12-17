import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "@/components/Navbar";
import { routes, type RouteConfig } from "./routes";

// 递归渲染路由函数
const renderRoutes = (routesList: RouteConfig[]): React.ReactNode => {
  return routesList.map((route: RouteConfig, index: number) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)} {/* 递归渲染子路由 */}
    </Route>
  ));
};

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>{renderRoutes(routes)}</Routes>
    </div>
  );
};

export default App;
