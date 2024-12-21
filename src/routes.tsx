import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";

import { RootState } from "./stores/store";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import Welcome from "./pages/Welcome";

export interface RouteConfig {
  name: string;
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[]; // 可选的子路由
}

// 定义路由配置
export const routes: RouteConfig[] = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "welcome",
    path: "/welcome",
    element: <Welcome />,
  },
  {
    name: "about",
    path: "/about",
    element: <About />,
  },
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
];

export const renderRoutes = (routesList: RouteConfig[]): React.ReactNode => {
  return routesList.map((route: RouteConfig, index: number) => {
    return (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};

// 动态生成菜单
export const useDynamicRouter = (): RouteConfig[] => {
  const roles = useSelector((state: RootState) => state.permissions.roles); // 当前用户角色
  const permissionGroups = useSelector(
    (state: RootState) => state.permissions.permissionGroups
  ); // 权限组

  const filterMenu = (menu: RouteConfig[]): RouteConfig[] => {
    return (
      menu
        // 过滤掉没有权限的菜单项
        .filter((item) =>
          permissionGroups[item.name].some((role) => roles.includes(role))
        )
        .map((item) => {
          // 递归处理子菜单
          const filteredChildren = item.children
            ? filterMenu(item.children)
            : null;

          // 如果没有子菜单且没有权限，则不返回 `children` 字段
          if (filteredChildren?.length) {
            return { ...item, children: filteredChildren };
          }

          // 如果没有子菜单或者子菜单被过滤为空，则不返回 `children` 字段
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { children, ...rest } = item;
          return rest;
        })
    );
  };

  if (roles.includes("root")) {
    return routes;
  }

  return filterMenu(routes); // 返回用户有权限访问的菜单
};
