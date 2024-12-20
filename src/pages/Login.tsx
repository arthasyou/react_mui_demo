import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { login } from "@/api/userApi"; // 引入 login API

interface LoginPageProps {
  onLoginSuccess?: () => void; // 父组件传入的回调函数
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState(""); // 用户名
  const [password, setPassword] = useState(""); // 密码
  const [error, setError] = useState(""); // 错误信息

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // 登录逻辑：这里简单的验证密码是否为空
    if (!password) {
      setError("请输入密码");
      return;
    }

    try {
      // 调用登录 API
      const response = await login({ username, password });
      if (response.code === 0) {
        // 登录成功，触发父组件的回调函数
        setError(""); // 清除错误信息
        if (onLoginSuccess) {
          onLoginSuccess();
        }
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
          {/* 显示错误信息 */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

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
