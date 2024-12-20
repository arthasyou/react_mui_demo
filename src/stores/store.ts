import { configureStore } from "@reduxjs/toolkit";
import permissionReducer from "@/features/permissionSlice";

// 配置 Redux Store
const store = configureStore({
  reducer: {
    permissions: permissionReducer,
  },
});

// 导出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
