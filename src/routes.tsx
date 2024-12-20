import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import { Role } from "./hook/permission";

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
    allowedRoles: ["root", "admin", "user"], // 所有角色都能访问
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
    allowedRoles: ["root", "admin"], // 只有 root 和 admin 可以访问
  },
];
