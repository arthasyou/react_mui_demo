// ThemeToggleButton.tsx
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const [theme, setTheme] = useState(getTheme(locales.zh));

export const ThemeToggleButton = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setTheme(getTheme({ mode: newMode })); // 更新外部传入的主题
  };

  return (
    <MuiThemeProvider theme={theme}>
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </MuiThemeProvider>
  );
};
