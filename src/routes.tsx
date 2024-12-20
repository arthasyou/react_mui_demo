import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import { permission, Role } from "@/hook/permission";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  allowedRoles?: Role[]; // 可访问该路由的角色
  children?: RouteConfig[]; // 可选的子路由
}

// 定义路由配置
export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
    allowedRoles: permission.home, // 所有角色都能访问
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
    allowedRoles: permission.about,
  },
];
