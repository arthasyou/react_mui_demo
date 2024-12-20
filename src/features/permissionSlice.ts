import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PermissionGroups = Record<string, string[]>;

// 定义权限状态类型
export interface PermissionState {
  roles: string[]; // 当前用户的角色
  permissionGroups: PermissionGroups; // 每个功能对应的权限配置（Key: 功能标识, Value: 可访问该功能的角色数组）
}

// 初始状态
const initialState: PermissionState = {
  // 当前用户角色
  roles: ["root"],
  // 每个功能的权限配置
  permissionGroups: {
    home: ["admin", "user"],
    about: ["admin"],
    login: ["admin", "user"],
    Inbox: ["admin", "user"],
    Starred: ["admin"],
    Archived: ["user"],
    "Sent mail": ["admin", "user"],
  },
};

// 创建权限 Slice
const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    // 更新当前用户角色
    setRoles(state, action: PayloadAction<string[]>) {
      state.roles = action.payload; // 更新角色
    },

    // 更新功能权限组配置
    setPermissionGroups(
      state,
      action: PayloadAction<Record<string, string[]>>
    ) {
      state.permissionGroups = action.payload; // 更新权限组配置
    },

    // 添加或更新单个功能的权限
    updatePermissionGroup(
      state,
      action: PayloadAction<{ feature: string; roles: string[] }>
    ) {
      const { feature, roles } = action.payload;
      state.permissionGroups[feature] = roles; // 添加或更新指定功能的权限配置
    },

    // 删除某个功能的权限配置
    removePermissionGroup(state, action: PayloadAction<string>) {
      const feature = action.payload;
      delete state.permissionGroups[feature]; // 删除指定功能的权限配置
    },
  },
});

// 导出 actions 和 reducer
export const {
  setRoles,
  setPermissionGroups,
  updatePermissionGroup,
  removePermissionGroup,
} = permissionSlice.actions;
export default permissionSlice.reducer;
