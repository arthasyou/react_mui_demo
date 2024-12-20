import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router"; // 修正导入 BrowserRouter 的路径
import { Provider } from "react-redux"; // 引入 Redux Provider
import store from "@/stores/store"; // 引入 Redux Store

import "@/i18n/i18n"; // 引入 i18n 配置文件
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* 包裹 Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
