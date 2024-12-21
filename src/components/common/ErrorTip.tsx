import React from "react";
import { Typography } from "@mui/material";

interface ErrorTipProps {
  message?: string; // 错误信息
  visible?: boolean; // 是否显示错误
}

const ErrorMessage: React.FC<ErrorTipProps> = ({ message, visible }) => {
  if (!visible || !message) return null;

  return (
    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
