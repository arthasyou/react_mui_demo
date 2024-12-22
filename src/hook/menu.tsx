import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { names, paths } from "./constants";

// 定义菜单项的类型
export interface MenuItem {
  name: string;
  label: string;
  icon: React.ReactNode;
  url?: string;
  children?: MenuItem[];
}

// 静态菜单定义（基础结构，permission 不赋值）
export const menu: MenuItem[] = [
  {
    name: names.home,
    label: "menu.home",
    icon: <InboxIcon />,
    url: paths.home,
  },
  {
    name: names.management,
    label: "menu.management",
    icon: <MailIcon />,
    children: [
      {
        name: names.permission_management,
        label: "menu.permission_management",
        icon: <MailIcon />,
        url: paths.management.permission,
      },
    ],
  },
];

// 动态生成菜单
export const useMenu = (): MenuItem[] => {
  const roles = useSelector((state: RootState) => state.permissions.roles); // 当前用户角色
  const permissionGroups = useSelector(
    (state: RootState) => state.permissions.permissionGroups
  ); // 权限组

  const filterMenu = (menu: MenuItem[]): MenuItem[] => {
    return (
      menu
        // 过滤掉没有权限的菜单项
        .filter((item) =>
          permissionGroups[item.name]?.some((role) => roles.includes(role))
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
    return menu;
  }
  return filterMenu(menu);
};
