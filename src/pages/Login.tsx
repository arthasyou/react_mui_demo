import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

import { login } from "@/api/userApi";
import ErrorTip from "@/components/common/ErrorTip";

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!password) {
      setError("请输入密码");
      return;
    }

    try {
      const response = await login({ username, password });
      if (response.code === 0) {
        setError("");
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError("登录失败，请检查用户名和密码");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("登录失败，请稍后再试");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h5">登录</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: "100%",
          }}
        >
          {/* 使用 ErrorMessage 组件 */}
          <ErrorTip message={error} visible={!!error} />

          <TextField
            label="用户名"
            type="text"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />

          <TextField
            label="密码"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            登录
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
