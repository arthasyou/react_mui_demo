import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { logout } from "@/api/userApi"; // 导入 logout API

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function UserInfo() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // 打开菜单
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // 关闭菜单
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 处理注销功能
  const handleLogout = async () => {
    try {
      await logout(); // 调用注销 API
      // 注销成功后执行的操作，例如跳转到登录页
      window.location.href = "/login"; // 假设你有一个登录页面
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={
              setting === "Logout"
                ? () => {
                    handleLogout(); // 如果点击的是 Logout，则调用注销函数
                    handleCloseUserMenu();
                  }
                : handleCloseUserMenu
            }
          >
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserInfo;
