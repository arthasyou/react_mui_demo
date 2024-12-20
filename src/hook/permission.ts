// 权限角色类型
export type Role = "root" | "admin" | "user";

export type PermissionConfig = {
  [key: string]: Role[];
};

export const permission: PermissionConfig = {
  home: ["root", "admin", "user"],
  login: ["root", "admin", "user"], // Login页面所有角色都可以访问
  about: ["admin", "admin"], // About页面只有 admin 和 user 可以访问
};
