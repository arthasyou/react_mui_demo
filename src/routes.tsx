import Home from "@/pages/Home";
import About from "@/pages/About";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[]; // 可选的子路由
}

// 定义路由配置
export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
];
